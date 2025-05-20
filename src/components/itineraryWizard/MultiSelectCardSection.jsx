import React, { useEffect } from 'react';
import './SectionStyles.css';

export default function MultiSelectCardSection({
  title,
  subtitle,
  options,
  selected,
  setSelected,
  singleSelect = false,
  sectionKey
}) {
  useEffect(() => {
    const saved = localStorage.getItem(sectionKey);
    if (saved) {
      setSelected(JSON.parse(saved));
    }
  }, [sectionKey, setSelected]);

  useEffect(() => {
    localStorage.setItem(sectionKey, JSON.stringify(selected));
  }, [selected, sectionKey]);

  const toggleOption = (val) => {
    if (singleSelect) {
      setSelected([val]);
    } else {
      setSelected((prev) =>
        prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
      );
    }
  };

  return (
    <div className="section-block">
      <h2>{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
      <div className="card-grid">
        {options.map((opt) => (
          <div
            key={opt.value}
            className={`card ${selected.includes(opt.value) ? "selected" : ""}`}
            onClick={() => toggleOption(opt.value)}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  );
}
