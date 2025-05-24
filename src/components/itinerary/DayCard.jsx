import React from 'react';
import './DayCard.css';

export default function DayCard({ day }) {
  return (
    <div className="day-card">
      <h2>Day {day.day}: {day.title}</h2>
      <p className="day-date">📅 {day.date}</p>

      <div className="section">
        <h4>Activities 🎯</h4>
        <ul>
          {day.activities.map((activity, i) => <li key={i}>{activity}</li>)}
        </ul>
      </div>

      <div className="section">
        <h4>Expenses 💸</h4>
        <ul>
          {Object.entries(day.expenses).map(([key, value]) => (
            <li key={key}>{key}: ₹{value}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h4>Group Split Options 🧑‍🤝‍🧑</h4>
        <ul>
          {day.groupSplitOptions.map((opt, i) => <li key={i}>{opt}</li>)}
        </ul>
      </div>

      <div className="section">
        <h4>Blog Notes 📝</h4>
        <p>{day.blogNotes}</p>
      </div>
    </div>
  );
}