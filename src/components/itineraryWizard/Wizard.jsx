import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import MultiSelectCardSection from './MultiSelectCardSection';
import {
  groupOptions,
  travelVibeOptions,
  budgetOptions,
  foodOptions,
  languageOptions
} from './optionsData';
import './SectionStyles.css';
import { ThemeContext } from '../../context/ThemeContext';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import WizardMetaSection from './WizardMetaSection';

export default function Wizard() {
  const [metaData, setMetaData] = useState(null);
  const [groupType, setGroupType] = useState([]);
  const [vibes, setVibes] = useState([]);
  const [budget, setBudget] = useState([]);
  const [food, setFood] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { theme, updateTheme } = useContext(ThemeContext);
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (vibes.length > 0) {
      updateTheme(vibes[0]);
    }
  }, [vibes, updateTheme]);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const docRef = doc(db, "userSelections", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setGroupType(data.groupType || []);
        setVibes(data.vibes || []);
        setBudget(data.budget || []);
        setFood(data.food || []);
        setLanguages(data.languages || []);
      }
    };
    fetchData();
  }, [user]);

  const saveSelections = async () => {
  if (!user || !user.uid) {
    console.warn("🛑 No user authenticated. Skipping Firestore save.");
    return;
  }

  try {
    const docRef = doc(db, "userSelections", user.uid);
    await setDoc(docRef, {
      groupType,
      vibes,
      budget,
      food,
      languages,
      updatedAt: new Date()
    });
  } catch (err) {
    console.error("❌ Firestore write failed:", err);
  }
};


  const generatePrompt = () => {
    return `Plan a trip for a group type: ${groupType.join(", ")}, who enjoy ${vibes.join(", ")} with a budget of ${budget.join(", ")} per person. 
They prefer food styles like ${food.join(", ")} and speak ${languages.join(", ")}.`;
  };

  const handleGenerate = async () => {
    console.log("🔥 CURRENT USER:", user);
    setLoading(true);
    await saveSelections();

    try {
      const res = await fetch("https://tripwizard-backend-render.onrender.com/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: generatePrompt() })
      });

      const data = await res.json();
      console.log("🎯 Generated Itinerary:", data);
      navigate("/itinerary", { state: data }); // Navigate with data
    } catch (err) {
      console.error("🚨 Error calling itinerary API:", err);
      alert("Something went wrong while generating itinerary.");
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (!metaData) {
    return <WizardMetaSection onMetaChange={setMetaData} />;
  }

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