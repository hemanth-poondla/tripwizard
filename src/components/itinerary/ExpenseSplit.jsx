import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import useConfirmDialog from "../../hooks/useConfirmDialog";
import "./ExpenseSplit.css";

export default function ExpenseSplit({ members, expenses, setExpenses }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const { ConfirmDialogComponent, openDialog } = useConfirmDialog();

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
      }
    });
  };

  return (
    <div className="expense-split-ui">
      <button onClick={addExpense} className="add-expense-btn">
        ➕ Add Expense
      </button>

      <AnimatePresence>
        {expenses.map((exp, idx) => (
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

                <div className="split-inputs">
                  {Array.isArray(exp.split) &&
                    exp.split.map((entry, memberIdx) => (
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
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
      <ConfirmDialogComponent />
    </div>
  );
}
