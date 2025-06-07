import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import "./WizardMetaStyles.css";
import { isFutureDate } from "../../utils/dateValidator";

export default function WizardMetaSection({ onMetaChange }) {
  const [origin, setOrigin] = useState("");
  const [tripType, setTripType] = useState("");
  const [continent, setContinent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [surpriseMe, setSurpriseMe] = useState(false);
  const [inviteLink] = useState("https://tripwizard.app/invite/XYZ123");

  const handleSubmit = () => {
    onMetaChange({
      origin,
      tripType,
      continent: surpriseMe ? null : continent,
      startDate,
      endDate,
      peopleCount,
      surpriseMe,
    });
  };

  const canContinue =
    origin && tripType && startDate && endDate && peopleCount > 0;
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="wizard-meta-bg">
      <div className="wizard-meta-card">
        <h2 className="wizard-meta-title">🌍 Let's Set Up Your Trip</h2>

        <label>Your origin (country or city)</label>
        <input
          type="text"
          className="wizard-meta-input"
          placeholder="e.g., Mumbai, India"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />

        <label>National or International?</label>
        <div className="wizard-pill-group">
          {["national", "international"].map((type) => (
            <div
              key={type}
              className={`wizard-pill ${tripType === type ? "selected" : ""}`}
              onClick={() => setTripType(type)}
            >
              {type === "national" ? "🇮🇳 National" : "✈️ International"}
            </div>
          ))}
        </div>

        <label className="wizard-toggle">
          <input
            type="checkbox"
            checked={surpriseMe}
            onChange={() => setSurpriseMe(!surpriseMe)}
          />
          🎲 Surprise me!
        </label>

        {!surpriseMe && (
          <>
            <label>Select a continent</label>
            <div className="wizard-pill-group">
              {[
                "asia",
                "europe",
                "africa",
                "north-america",
                "south-america",
                "australia",
              ].map((c) => (
                <div
                  key={c}
                  className={`wizard-pill ${continent === c ? "selected" : ""}`}
                  onClick={() => setContinent(c)}
                >
                  {c.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </div>
              ))}
            </div>
          </>
        )}

        <label>Start Date</label>
        <input
          type="date"
          className="wizard-meta-input"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={today}
        />

        <label>End Date</label>
        <input
          type="date"
          className="wizard-meta-input"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate || today}
        />

        <label>No. of people</label>
        <input
          type="number"
          className="wizard-meta-input"
          value={peopleCount}
          onChange={(e) => setPeopleCount(Number(e.target.value))}
          min="1"
          max="20"
        />

        <label>Invite your gang</label>
        <div className="wizard-invite-box">
          <input
            type="text"
            className="wizard-meta-input"
            readOnly
            value={inviteLink}
          />
          <Button
            className="wizard-copy-btn"
            onClick={() => navigator.clipboard.writeText(inviteLink)}
          >
            📋
          </Button>
        </div>

        <Button
          className={`wizard-meta-btn ${!canContinue ? "disabled" : ""}`}
          disabled={!canContinue}
          onClick={handleSubmit}
        >
          ✅ Continue
        </Button>
      </div>
    </div>
  );
}
