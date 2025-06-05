import React, { useState } from "react";
import { Trash2, CheckSquare, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import useConfirmDialog from "../../hooks/useConfirmDialog";
import { calculateEqualSplit } from "../../utils/splitUtils";
import "./ExpenseSplit.css";

export default function ExpenseSplit({ members, expenses, setExpenses }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { ConfirmDialogComponent, openDialog } = useConfirmDialog();
  const [equalSplit, setEqualSplit] = useState({});

  const toggleExpand = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const addExpense = () => {
    if (!Array.isArray(members) || members.length === 0) {
      alert("No members defined for expense split!");
      return;
    }

    setExpenses([
      ...expenses,
      {
        description: "",
        paidBy: members[0],
        split: members.map((name) => ({ name, amount: "" })),
        total: ""
      }
    ]);
  };

  const updateExpense = (idx, key, value) => {
    const updated = [...expenses];
    updated[idx][key] = value;

    if (key === "total" && equalSplit[idx]) {
      const total = parseFloat(value) || 0;
      updated[idx].split = calculateEqualSplit(total, members);
    }

    setExpenses(updated);
  };

  const updateSplit = (idx, memberIdx, value) => {
    const updated = [...expenses];
    updated[idx].split[memberIdx].amount = value;
    setExpenses(updated);
  };

  const confirmAndRemoveExpense = (idx) => {
    const name = expenses[idx].description || "this expense";
    openDialog({
      title: "Delete Expense?",
      message: `Are you sure you want to delete "${name}"?`,
      confirmText: "Yes, Delete",
      cancelText: "Cancel",
      onConfirm: () => {
        const updated = expenses.filter((_, i) => i !== idx);
        setExpenses(updated);
        setEqualSplit((prev) => {
          const clone = { ...prev };
          delete clone[idx];
          return clone;
        });
      }
    });
  };

  const handleEqualSplitToggle = (idx) => {
    const updated = [...expenses];
    const isChecked = !equalSplit[idx];
    const total = parseFloat(updated[idx].total) || 0;

    if (isChecked && total > 0) {
      updated[idx].split = calculateEqualSplit(total, members);
    }

    setExpenses(updated);
    setEqualSplit((prev) => ({ ...prev, [idx]: isChecked }));
  };

  const calculateSplitTotal = (split) =>
    split.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

  return (
    <div className="expense-split-ui">
      <button onClick={addExpense} className="add-expense-btn">
        ➕ Add Expense
      </button>

      <AnimatePresence>
        {expenses.map((exp, idx) => {
          const splitTotal = calculateSplitTotal(exp.split);
          const total = parseFloat(exp.total) || 0;
          const showWarning = total > 0 && Math.abs(splitTotal - total) > 0.009;

          return (
            <motion.div
              key={idx}
              className="expense-entry-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="expense-summary-header" onClick={() => toggleExpand(idx)}>
                <strong>{exp.description || "Untitled Expense"}</strong>
                <span>💰 {exp.total || 0} | 👤 {exp.paidBy}</span>
                <span className="toggle-arrow">{expandedIndex === idx ? "▲" : "▼"}</span>
                <button
                  className="delete-header-btn"
                  title="Delete this expense"
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmAndRemoveExpense(idx);
                  }}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {expandedIndex === idx && (
                <div className="expense-details">
                  <input
                    type="text"
                    value={exp.description}
                    onChange={(e) => updateExpense(idx, "description", e.target.value)}
                    placeholder="What is this expense about?"
                    className="description-input"
                  />

                  <div className="expense-header">
                    <div className="field-group">
                      <label className="expense-label">Paid By:</label>
                      <select
                        value={exp.paidBy}
                        onChange={(e) => updateExpense(idx, "paidBy", e.target.value)}
                        className="dropdown-dark"
                      >
                        {members.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div className="field-group">
                      <label className="expense-label">Total:</label>
                      <input
                        type="number"
                        value={exp.total}
                        onChange={(e) => updateExpense(idx, "total", e.target.value)}
                        className="total-input"
                        placeholder="₹0"
                      />
                    </div>
                  </div>

                  <div
                    className={`equal-split-row ${equalSplit[idx] ? "active" : ""}`}
                    onClick={() => handleEqualSplitToggle(idx)}
                  >
                    <span className="checkbox-icon">
                      {equalSplit[idx] ? <CheckSquare size={18} /> : <Square size={18} />}
                    </span>
                    Split equally among all
                  </div>

                  <div className="split-inputs">
                    {exp.split.map((entry, memberIdx) => (
                      <div key={memberIdx} className="split-row">
                        <span className="member-name">{entry.name}</span>
                        <input
                          type="number"
                          value={entry.amount}
                          onChange={(e) => updateSplit(idx, memberIdx, e.target.value)}
                          className="amount-input"
                          placeholder="₹"
                        />
                      </div>
                    ))}
                    {showWarning && (
                      <p className="split-warning">
                        ⚠️ Split total (₹{splitTotal.toFixed(2)}) does not match overall total (₹{total.toFixed(2)})
                      </p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      <ConfirmDialogComponent />
    </div>
  );
}
