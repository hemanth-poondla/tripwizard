
import React, { useState } from 'react';
import './SectionStyles.css';

export default function WizardMetaSection({ onMetaChange }) {
  const [origin, setOrigin] = useState('');
  const [tripType, setTripType] = useState('');
  const [continent, setContinent] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [surpriseMe, setSurpriseMe] = useState(false);
  const [inviteLink] = useState('https://tripwizard.app/invite/XYZ123');

  const handleSubmit = () => {
    onMetaChange({
      origin,
      tripType,
      continent: surpriseMe ? null : continent,
      startDate,
      endDate,
      peopleCount,
      surpriseMe
    });
  };

  const canContinue = origin && tripType && startDate && endDate && peopleCount > 0;

  return (
    <div className="wizard-meta-wrapper">
      <h2 className="wizard-meta-title">🌍 Trip Setup</h2>

      <label>Your origin (country or city)</label>
      <input type="text" className="wizard-input" placeholder="e.g., Mumbai, India" value={origin} onChange={(e) => setOrigin(e.target.value)} />

      <label>Is this a national or international trip?</label>
      <select className="wizard-input" value={tripType} onChange={(e) => setTripType(e.target.value)}>
        <option value="">Select one</option>
        <option value="national">National</option>
        <option value="international">International</option>
      </select>

      <label className="wizard-toggle">
        <input type="checkbox" checked={surpriseMe} onChange={() => setSurpriseMe(!surpriseMe)} />
        🎲 Surprise me!
      </label>

      {!surpriseMe && (
        <>
          <label>Preferred continent to explore</label>
          <select className="wizard-input" value={continent} onChange={(e) => setContinent(e.target.value)}>
            <option value="">Select a continent</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Africa">Africa</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Australia">Australia</option>
            <option value="Antarctica">Antarctica</option>
          </select>
        </>
      )}

      <label>Trip start date</label>
      <input type="date" className="wizard-input" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

      <label>Trip end date</label>
      <input type="date" className="wizard-input" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

      <label>Number of people going</label>
      <input type="number" className="wizard-input" value={peopleCount} onChange={(e) => setPeopleCount(Number(e.target.value))} min="1" max="20" />

      <label>Invite your gang to this trip (coming soon)</label>
      <div className="wizard-invite-box">
        <input type="text" className="wizard-input" readOnly value={inviteLink} />
        <button className="wizard-copy-btn" onClick={() => navigator.clipboard.writeText(inviteLink)}>📋 Copy</button>
      </div>

      <button
        className={`wizard-submit-btn ${!canContinue ? 'disabled' : ''}`}
        disabled={!canContinue}
        onClick={handleSubmit}
      >
        ✅ Continue
      </button>
    </div>
  );
}
