import React from 'react';
import { useLocation } from 'react-router-dom';
import './ItineraryPage.css';
import DayCardPro from './DayCardPro';
import TripOverview from './TripOverview';

export default function ItineraryPage() {
  const location = useLocation();
  const itinerary = location.state;

  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>No itinerary data available.</div>;
  }

  return (
    <div className="itinerary-page">
      <h1 className="trip-title">🧭 Trip to {itinerary.destination}</h1>
      <p className="trip-dates">
        {itinerary.startDate} to {itinerary.endDate}
      </p>

      <TripOverview itinerary={itinerary} /> {/* 🔥 NEW BLOCK */}
      {itinerary.days.map((day, index) => (
        <DayCardPro key={index} day={day} />
      ))}
      
      <div className="total-expenses">
        <h2>Total Expenses</h2>
        <ul>
          {Object.entries(itinerary.totalExpenses || {}).map(
            ([type, amount]) => (
              <li key={type}>
                {type}: ₹{amount}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}