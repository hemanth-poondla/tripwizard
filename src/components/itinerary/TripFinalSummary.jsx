
import React from "react";

export default function TripFinalSummary({ settlements }) {
  if (!settlements || settlements.length === 0) {
    return (
      <div className="text-center mt-6 p-4 text-green-400 text-lg font-medium">
        🎉 No dues left! Everyone’s settled up.
      </div>
    );
  }

  return (
    <div className="mt-10 bg-[#1e1e1e] p-6 rounded-lg shadow text-white">
      <h3 className="text-xl font-semibold mb-4 text-center text-purple-400">
        Final Trip Settlement Summary 💰
      </h3>
      <ul className="space-y-2">
        {settlements.map((txn, i) => (
          <li key={i} className="bg-[#2a2a2a] p-3 rounded-md shadow-sm">
            {txn.from} ➡️ {txn.to} : ₹{txn.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
