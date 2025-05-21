import React, { useState, useEffect } from 'react';
import MultiSelectCardSection from './MultiSelectCardSection';
import {
  groupOptions,
  travelVibeOptions,
  budgetOptions,
  foodOptions,
  languageOptions
} from './optionsData';
import './SectionStyles.css';

export default function Wizard() {
  const [groupType, setGroupType] = useState([]);
  const [vibes, setVibes] = useState([]);
  const [budget, setBudget] = useState([]);
  const [food, setFood] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [theme, setTheme] = useState("default");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (vibes.includes("adventure")) setTheme("adventure");
    else if (vibes.includes("beach")) setTheme("beach");
    else if (vibes.includes("nightlife")) setTheme("party");
    else if (vibes.includes("culture")) setTheme("culture");
    else setTheme("default");
  }, [vibes]);

  const generatePrompt = () => {
    return `Plan a trip for a group type: ${groupType.join(", ")}, who enjoy ${vibes.join(", ")} with a budget of ${budget.join(", ")} per person. 
They prefer food styles like ${food.join(", ")} and speak ${languages.join(", ")}.`;
  };

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      alert(generatePrompt());
      setLoading(false);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className={`wizard-page ${theme}`}>
      <MultiSelectCardSection title="Who's coming with you?" options={groupOptions} selected={groupType} setSelected={setGroupType} sectionKey="groupType" />
      <MultiSelectCardSection title="What's your vibe?" options={travelVibeOptions} selected={vibes} setSelected={setVibes} sectionKey="vibes" />
      <MultiSelectCardSection title="Budget?" options={budgetOptions} selected={budget} setSelected={setBudget} sectionKey="budget" singleSelect={true} />
      <MultiSelectCardSection title="Food Preferences?" options={foodOptions} selected={food} setSelected={setFood} sectionKey="food" />
      <MultiSelectCardSection title="Preferred Language?" options={languageOptions} selected={languages} setSelected={setLanguages} sectionKey="languages" />

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <button className="corner-button" onClick={handleGenerate} title="Generate My Trip">🧭</button>
          <button className="corner-button logout" onClick={handleLogout} title="Logout">⏻</button>
        </>
      )}
    </div>
  );
}