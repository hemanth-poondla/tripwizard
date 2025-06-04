import React, { useState } from "react";
import "./ExpenseSplit.css";

export default function ExpenseSplit({ members, expenses, setExpenses }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

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
        split: members.map(name => ({ name, amount: "" })),
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

  const removeExpense = (idx) => {
    const updated = expenses.filter((_, i) => i !== idx);
    setExpenses(updated);
  };

  return (
    <div className="expense-split-ui">
      <button onClick={addExpense} className="add-expense-btn">
        ➕ Add Expense
      </button>

      {expenses.map((exp, idx) => (
        <div key={idx} className="expense-entry-card">
          <div className="expense-summary-header" onClick={() => toggleExpand(idx)}>
            <strong>{exp.description || "Untitled Expense"}</strong>
            <span>💰 {exp.total || 0} | 👤 {exp.paidBy}</span>
            <span className="toggle-arrow">{expandedIndex === idx ? "▲" : "▼"}</span>
          </div>

          {expandedIndex === idx && (
            <>
              <div className="expense-details">
                <input
                  type="text"
                  value={exp.description}
                  onChange={(e) => updateExpense(idx, "description", e.target.value)}
                  placeholder="What is this expense about?"
                  className="description-input"
                />

                <div className="expense-header">
                  <span className="expense-label">Paid By:</span>
                  <select
                    value={exp.paidBy}
                    onChange={(e) => updateExpense(idx, "paidBy", e.target.value)}
                    className="dropdown-dark"
                  >
                    {members.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>

                  <span className="expense-label ml-4">Total:</span>
                  <input
                    type="number"
                    value={exp.total}
                    onChange={(e) => updateExpense(idx, "total", e.target.value)}
                    className="total-input"
                    placeholder="₹0"
                  />

                  <button className="remove-btn" onClick={() => removeExpense(idx)}>
                    ❌
                  </button>
                </div>

                <div className="split-inputs">
                  {Array.isArray(exp.split) && exp.split.map((entry, memberIdx) => (
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
            </>
          )}
        </div>
      ))}
    </div>
  );
}
