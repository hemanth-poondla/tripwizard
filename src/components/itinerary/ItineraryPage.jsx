import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ItineraryPage.css';
import DayCardPro from './DayCardPro';
import TripOverview from './TripOverview';
import TotalExpenseSection from './TotalExpenseSection';
import { calculateDailyBalances, simplifySettlements } from '../../utils/expenseUtils';

export default function ItineraryPage() {
  const location = useLocation();
  const itinerary = location.state;

  const [showFinalPayoffs, setShowFinalPayoffs] = useState(false);
  const [finalSettlements, setFinalSettlements] = useState([]);

  if (!itinerary || !itinerary.days || itinerary.days.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'white' }}>
        No itinerary data available.
      </div>
    );
  }

  const updateDayExpenses = (index, expenses) => {
    itinerary.days[index].expenses = expenses;
  };

  const handleFinalPayoffs = () => {
    const allExpenses = [];
    itinerary.days.forEach(day => {
      if (Array.isArray(day.expenses)) {
        allExpenses.push(...day.expenses);
      }
    });

    const members = ["Hemanth", "Mahesh", "Akhil", "Vinay", "Lik", "VVP"];
    const balances = calculateDailyBalances(allExpenses, members);
    const settlements = simplifySettlements(balances);
    setFinalSettlements(settlements);
    setShowFinalPayoffs(true);
  };

  return (
    <div className="itinerary-page">
      <h1 className="trip-title">🧭 Trip to {itinerary.destination}</h1>
      <p className="trip-dates">
        {itinerary.startDate} to {itinerary.endDate}
      </p>

      <TripOverview itinerary={itinerary} />

      {itinerary.days.map((day, index) => (
        <DayCardPro
          key={index}
          day={day}
          dayIndex={index}
          updateExpenses={updateDayExpenses}
        />
      ))}

      <TotalExpenseSection totalExpenses={itinerary.totalExpenses} />

      <div className="final-trip-expense-summary">
        <button className="calculate-btn" onClick={handleFinalPayoffs}>💰 Final Trip Settlement</button>
        {showFinalPayoffs && (
          <div className="final-settlement-block">
            <h4>Final Payoffs</h4>
            {finalSettlements.length === 0 ? (
              <p className="no-dues">✅ No dues left!</p>
            ) : (
              <ul>
                {finalSettlements.map((s, i) => (
                  <li key={i}>{s.from} ➡️ {s.to}: ₹{s.amount}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}