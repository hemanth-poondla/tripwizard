
import React, { useState } from 'react';
import './DayCardPro.css';

export default function DayCardPro({ day }) {
  const [blogNote, setBlogNote] = useState("");

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
        <h4>💸 Expenses</h4>
        <ul>
          {Object.entries(day.expenses).map(([type, amount]) => (
            <li key={type}>{type}: ₹{amount}</li>
          ))}
        </ul>
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
