
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function TotalExpenseSection({ totalExpenses }) {
  if (!totalExpenses || Object.keys(totalExpenses).length === 0) return null;

  const pieData = Object.entries(totalExpenses).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value
  }));

  return (
    <div className="section" style={{ marginTop: '60px', padding: '20px' }}>
      <h2 style={{ marginBottom: '20px' }}>🧾 Total Trip Expenses</h2>

      <ul style={{ listStyleType: 'none', paddingLeft: 0, fontSize: '16px' }}>
        {pieData.map(({ name, value }) => (
          <li key={name} style={{ marginBottom: '8px' }}>
            <strong>{name}:</strong> ₹{value}
          </li>
        ))}
      </ul>

      <div style={{ width: '100%', height: 300, marginTop: '30px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
