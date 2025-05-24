import React from 'react';
import './DayCardPro.css';

export default function DayCardPro({ day }) {
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

      <div className="day-section">
        <h4>🧑‍🤝‍🧑 Group Split Options</h4>
        <ul>
          {day.groupSplitOptions.map((opt, i) => <li key={i}>{opt}</li>)}
        </ul>
      </div>

      <div className="day-section">
        <h4>📝 Blog Notes</h4>
        <p>{day.blogNotes}</p>
      </div>
    </div>
  );
}