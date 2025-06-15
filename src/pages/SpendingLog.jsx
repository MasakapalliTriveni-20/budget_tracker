import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
import { useBudget } from '../context/useBudget';

export default function SpendingLog() {
  const { state, dispatch } = useBudget();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const filtered = state.transactions
    .filter(t => (typeFilter === 'all' ? true : t.type === typeFilter))
    .filter(t => (categoryFilter === 'all' ? true : t.category === categoryFilter))
    .filter(t => (dateFilter ? t.date === dateFilter : true))
    .filter(t => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = id => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(state.transactions.map(t => t.category))).filter(Boolean);

  return (
    <div className="container">
      {/* <Navbar /> */}
      <h2 style={{ margin: '24px 0', textAlign: 'center' }}>Spending Log</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, minWidth: 180 }}
        />
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
        />
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f1f1f1' }}>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>No transactions found.</td></tr>
          ) : (
            filtered.map(txn => (
              <tr key={txn.id} style={{ borderBottom: '1px solid #eee' }}>
                <td>{txn.title}</td>
                <td>{state.settings.currency}{txn.amount}</td>
                <td>{txn.type}</td>
                <td>{txn.category}</td>
                <td>{txn.date}</td>
                <td>
                  <button onClick={() => handleDelete(txn.id)} style={{ color: '#d63031', border: 'none', background: 'none', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
