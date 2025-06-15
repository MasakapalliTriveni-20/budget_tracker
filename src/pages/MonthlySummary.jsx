import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useBudget } from '../context/useBudget';

export default function MonthlySummary() {
  const { state } = useBudget();
  const [month, setMonth] = useState('');
  const months = Array.from(new Set(state.transactions.map(t => t.date ? t.date.slice(0, 7) : ''))).filter(Boolean);
  const filtered = state.transactions.filter(t => month ? t.date && t.date.startsWith(month) : true);
  const income = filtered.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const expense = filtered.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;
  const pieData = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: expense },
  ];
  const pieColors = ['#4CAF50', '#F44336'];

  return (
    <div className="container">
      <Navbar />
      <h2>Monthly Summary</h2>
      <div style={{ margin: '20px 0' }}>
        <select value={month} onChange={e => setMonth(e.target.value)}>
          <option value="">All Months</option>
          {months.map(m => (
            <option key={m} value={m}>
              {new Date(m + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
            </option>
          ))}
        </select>
      </div>
      <div style={{ display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <PieChart width={220} height={220}>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {pieData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={pieColors[idx]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div>
          <h3>{month ? new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' }) : 'All Time'}</h3>
          <p>Income: ₹{income}</p>
          <p>Expenses: ₹{expense}</p>
          <p>Balance: ₹{balance}</p>
        </div>
      </div>
    </div>
  );
}
