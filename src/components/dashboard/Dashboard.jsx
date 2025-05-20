import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const nameFromEmail = user?.email?.split("@")[0] || "Traveller";
  const name = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Hey {name} 👋</h1>
      <p className="dashboard-sub">Welcome back to your adventure zone 🧭</p>

      <div className="options-grid">
        <div className="option-card" onClick={() => navigate("/wizard")}>
          <h2>✈️ Build Itinerary</h2>
          <p>Start from scratch and get a perfect personalized plan.</p>
        </div>
        <div className="option-card coming-soon">
          <h2>👥 Group Chat (Soon)</h2>
          <p>Create a group with friends & decide together.</p>
        </div>
        <div className="option-card coming-soon">
          <h2>📄 Upload Draft (Soon)</h2>
          <p>Already have a plan? We’ll perfect it for you.</p>
        </div>
      </div>
    </div>
  );
}
