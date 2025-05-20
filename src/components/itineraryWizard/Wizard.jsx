import React, { useState } from 'react';
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

  return (
    <div className="wizard-page dark">
      <MultiSelectCardSection title="Who's coming with you?" options={groupOptions} selected={groupType} setSelected={setGroupType} />
      <MultiSelectCardSection title="What's your vibe?" options={travelVibeOptions} selected={vibes} setSelected={setVibes} />
      <MultiSelectCardSection title="Budget feels like?" options={budgetOptions} selected={budget} setSelected={setBudget} />
      <MultiSelectCardSection title="Food preferences?" options={foodOptions} selected={food} setSelected={setFood} />
      <MultiSelectCardSection title="Preferred Languages?" options={languageOptions} selected={languages} setSelected={setLanguages} />

      <button className="btn-cta" onClick={() => {
        console.log({
          groupType, vibes, budget, food, languages
        });
      }}>Continue ➡️</button>
    </div>
  );
}