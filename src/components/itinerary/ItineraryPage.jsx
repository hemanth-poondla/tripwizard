import React from 'react';
import DayCard from './DayCard';
import './ItineraryPage.css';

export default function ItineraryPage({ itinerary }) {
  if (!itinerary || !itinerary.days) return <div>No itinerary data available.</div>;

  return (
    <div className="itinerary-page">
      <h1 className="trip-title">🧭 Trip to {itinerary.destination}</h1>
      <p className="trip-dates">{itinerary.startDate} to {itinerary.endDate}</p>

      {itinerary.days.map((day, index) => (
        <DayCard key={index} day={day} />
      ))}

      <div className="total-expenses">
        <h2>Total Expenses</h2>
        <pre>{JSON.stringify(itinerary.totalExpenses, null, 2)}</pre>
      </div>
    </div>
  );
}