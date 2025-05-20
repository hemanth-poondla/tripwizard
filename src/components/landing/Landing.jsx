import React from 'react';
import './Landing.css';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="landing">
      <div className="overlay">
        <nav className="navbar">
          <div className="logo">TripWizard</div>
          <div className="nav-links">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <Link to="/login">Login</Link>
          </div>
        </nav>

        <div className="hero">
          <h1 className="hero-title">Design Your Dream Trip</h1>
          <p className="hero-sub">Luxury itineraries, smart planning, unforgettable experiences.</p>
          <Link to="/register">
            <button className="btn-cta">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
