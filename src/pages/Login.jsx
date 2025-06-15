import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple demo: accept any non-empty email/password
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    // Simulate login and redirect
    localStorage.setItem('user', JSON.stringify({ email, avatar: `https://ui-avatars.com/api/?name=${email}` }));
    navigate('/dashboard');
  };

  return (
    <div className="container" style={{ maxWidth: 400, margin: '60px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Login to Smart Budgeter</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ padding: 12, borderRadius: 8, border: '1px solid #ddd' }}
        />
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        <button type="submit" style={{ background: '#6366f1', color: '#fff', padding: 12, borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer' }}>Login</button>
      </form>
    </div>
  );
}
