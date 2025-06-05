import React, { useState, useEffect } from 'react';
import './DayCardPro.css';
import ExpenseSplit from './ExpenseSplit';
import { calculateDailyBalances, simplifySettlements } from '../../utils/expenseUtils';
import { truncateTo2Decimals } from '../../utils/numberUtils';

export default function DayCardPro({ day, dayIndex, updateExpenses }) {
  const [blogNote, setBlogNote] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [settlements, setSettlements] = useState([]);

  const members = ["Hemanth", "Mahesh", "Akhil", "Vinay", "Lik", "VVP"];

  useEffect(() => {
    const balances = calculateDailyBalances(expenses || [], members);
    const simplified = simplifySettlements(balances);
    setSettlements(simplified);
  }, [expenses]);

  useEffect(() => {
    updateExpenses(dayIndex, expenses);
  }, [expenses]);

  return (
    <div className="day-card-pro">
      <div className="day-header">
        <h2>Day {day.day}: {day.title}</h2>
        <div className="day-meta">
          <span className="weather">☀️ {day.weather}</span>
          <span className="vibe-tag">#{day.vibe}</span>
        </div>
        <p className="day-date">📅 {day.date}</p>
      </div>

      <div className="day-section">
        <h4>🎯 Activities</h4>
        <ul>
          {day.activities.map((act, i) => <li key={i}>{act}</li>)}
        </ul>
      </div>

      <div className="day-section">
        <h4>💸 Group Expense Split</h4>
        <ExpenseSplit
          members={members}
          expenses={expenses}
          setExpenses={setExpenses}
        />
      </div>

      <div className="day-section">
        <h4>📊 Daily Summary of Expenses</h4>
        {settlements.length === 0 ? (
          <p className="no-dues">✅ No dues left!</p>
        ) : (
          <ul>
            {settlements.map((s, i) => (
              <li key={i}>
                {s.from} ➡️ {s.to}: ₹{parseFloat(s.amount).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="day-section">
        <h4>📝 Blog Notes</h4>
        <textarea
          placeholder="Write your thoughts here..."
          value={blogNote}
          onChange={(e) => setBlogNote(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '10px',
            backgroundColor: '#f5f7fa',
            border: '1px solid #ddd',
            minHeight: '120px',
            marginTop: '10px',
            fontSize: '15px',
            resize: 'vertical'
          }}
        />
      </div>
    </div>
  );
}
