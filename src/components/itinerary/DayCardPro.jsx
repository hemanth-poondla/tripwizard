
import React, { useState } from 'react';
import './DayCardPro.css';
import ExpenseSplit from './ExpenseSplit';
import { calculateDailyBalances } from '../../utils/expenseUtils';

export default function DayCardPro({ day }) {
  const [blogNote, setBlogNote] = useState("");
  const [showExpenses, setShowExpenses] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const groupSize = 3; // Replace with itinerary.groupSize in future
  const members = Array.from({ length: groupSize }, (_, i) => `Traveler ${i + 1}`);
  const balances = calculateDailyBalances(expenses, members);

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
        <div className="flex justify-between items-center">
          <h4>💸 Expenses</h4>
          <button
            onClick={() => setShowExpenses(prev => !prev)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            {showExpenses ? "Hide" : "➕ Add Expense"}
          </button>
        </div>
        <ul>
          {Object.entries(day.expenses).map(([type, amount]) => (
            <li key={type}>{type}: ₹{amount}</li>
          ))}
        </ul>

        {showExpenses && (
          <ExpenseSplit members={members} expenses={expenses} setExpenses={setExpenses} />
        )}

        {expenses.length > 0 && (
          <div className="mt-4 bg-white border rounded-lg p-4 shadow">
            <h5 className="font-semibold mb-2">Daily Expense Summary</h5>
            <ul className="space-y-1 text-sm">
              {members.map((member) => (
                <li key={member}>
                  {member}: Paid ₹{balances[member].paid.toFixed(2)}, Owes ₹{balances[member].owes.toFixed(2)}, Balance ₹{balances[member].balance.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {day.groupSplitOptions && day.groupSplitOptions.length > 0 && (
        <div className="day-section">
          <h4>🧑‍🤝‍🧑 Group Split Options</h4>
          <ul>
            {day.groupSplitOptions.map((opt, i) => <li key={i}>{opt}</li>)}
          </ul>
        </div>
      )}

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
