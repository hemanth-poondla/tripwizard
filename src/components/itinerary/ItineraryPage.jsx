import React from 'react';
import { useLocation } from 'react-router-dom';
import './ItineraryPage.css';
import DayCardPro from './DayCardPro';
import TripOverview from './TripOverview';
import TotalExpenseSection from './TotalExpenseSection'; // 👈 import the new chart section

export default function ItineraryPage() {
  const location = useLocation();
  const itinerary = location.state;

  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
        No itinerary data available.
      </div>
    );
  }

  return (
    <div className="itinerary-page">
      <h1 className="trip-title">🧭 Trip to {itinerary.destination}</h1>
      <p className="trip-dates">
        {itinerary.startDate} to {itinerary.endDate}
      </p>

      <TripOverview itinerary={itinerary} />

      {itinerary.days.map((day, index) => (
        <DayCardPro key={index} day={day} />
      ))}

      {/* 👇 Replace your manual expenses block with this sexy section */}
      <TotalExpenseSection totalExpenses={itinerary.totalExpenses} />
    </div>
  );
}
