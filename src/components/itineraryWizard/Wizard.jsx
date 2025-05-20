import React, { useState } from "react";
import "./Wizard.css";

const questions = [
  { key: "name", text: "Hey traveller! What’s your name?" },
  { key: "destination", text: "Where do you want to go?" },
  { key: "duration", text: "How many days is your trip?" },
  { key: "interests", text: "What are you most interested in? (adventure, food, culture...)" },
  { key: "people", text: "How many people are going with you?" },
  { key: "budget", text: "What’s your budget range per person (in INR)?" },
  { key: "special", text: "Any special requests or requirements?" },
  { key: "language", text: "Which language do you prefer your itinerary in?" }
];

export default function Wizard() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [input, setInput] = useState("");

  const handleNext = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const updatedAnswers = { ...answers, [questions[current].key]: input.trim() };
    setAnswers(updatedAnswers);
    setInput("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      // Final step reached
      console.log("User prompt generated:", updatedAnswers);
    }
  };

  const renderPrompt = () => {
    return (
      <div className="summary-box">
        <h3>Your Travel Blueprint 🧳</h3>
        <pre>{JSON.stringify(answers, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="wizard-page">
      <div className="chatbox">
        <div className="chat-bubble bot">{questions[current]?.text}</div>

        {current < questions.length ? (
          <form onSubmit={handleNext} className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your answer..."
              autoFocus
            />
            <button type="submit">➡️</button>
          </form>
        ) : (
          renderPrompt()
        )}
      </div>
    </div>
  );
}
