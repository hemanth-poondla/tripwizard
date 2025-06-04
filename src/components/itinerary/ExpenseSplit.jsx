
import React from "react";

const ExpenseSplit = ({ members, expenses, setExpenses }) => {
  const addNewExpense = () => {
    const newExpense = {
      title: "",
      totalAmount: "",
      paidBy: "",
      amounts: members.reduce((acc, member) => ({ ...acc, [member]: 0 }), {}),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const updateExpense = (index, field, value) => {
    const updated = [...expenses];
    updated[index][field] = value;
    setExpenses(updated);
  };

  const updateAmount = (index, member, value) => {
    const updated = [...expenses];
    updated[index].amounts[member] = parseFloat(value) || 0;
    setExpenses(updated);
  };

  return (
    <div className="bg-gray-100 rounded-xl p-6 mt-6 shadow-lg border">
      <h3 className="text-xl font-bold mb-6 text-blue-900">💸 Group Expenses</h3>

      {expenses.map((expense, index) => (
        <div key={index} className="mb-8 p-5 border rounded-lg bg-white shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Expense Title"
              className="border p-3 rounded w-full"
              value={expense.title}
              onChange={(e) => updateExpense(index, "title", e.target.value)}
            />
            <input
              type="number"
              placeholder="Total Amount"
              className="border p-3 rounded w-full"
              value={expense.totalAmount}
              onChange={(e) => updateExpense(index, "totalAmount", e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-gray-700">Who Paid:</label>
            <select
              value={expense.paidBy}
              onChange={(e) => updateExpense(index, "paidBy", e.target.value)}
              className="border p-3 rounded w-full"
            >
              <option value="">Select</option>
              {members.map((member) => (
                <option key={member} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-2 text-gray-700">Split Among:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {members.map((member) => (
                <div
                  key={member}
                  className="flex justify-between items-center border p-2 rounded-lg bg-gray-50"
                >
                  <span>{member}</span>
                  <input
                    type="number"
                    value={expense.amounts[member]}
                    onChange={(e) => updateAmount(index, member, e.target.value)}
                    className="border p-2 rounded w-24 text-right"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="text-right">
        <button
          onClick={addNewExpense}
          className="bg-blue-700 text-white font-medium px-5 py-2 rounded hover:bg-blue-800 transition"
        >
          ➕ Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseSplit;
