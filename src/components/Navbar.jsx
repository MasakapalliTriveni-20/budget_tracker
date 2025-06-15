import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ onExport, onToggleDark, isDark, user, onSignOut }) {
  const today = new Date().toISOString().slice(0, 10);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentUser, setCurrentUser] = useState(user);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Try to get user from localStorage if not passed as prop
    if (!user) {
      const stored = localStorage.getItem('user');
      if (stored) setCurrentUser(JSON.parse(stored));
    }
  }, [user]);

  const displayName = currentUser?.name || currentUser?.email || "User";

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    if (onSignOut) onSignOut();
    navigate('/login');
  };

  return (
    <nav className="navbar smart-navbar" style={{ background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 50%, #f472b6 100%)', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.10)', padding: '0.75rem 2rem', margin: '1rem 0' }}>
      <div className="navbar-links" style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
        <Link to="/dashboard" className="navbar-link" style={{ color: '#fff', background: '#6366f1', padding: '6px 18px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Dashboard</Link>
        <Link to="/spending-log" className="navbar-link" style={{ color: '#fff', background: '#f59e42', padding: '6px 18px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Transactions</Link>
        <button className="navbar-link" style={{ color: '#fff', background: '#10b981', padding: '6px 18px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }} onClick={() => setShowCalendar(v => !v)}>
          Filter
        </button>
        <Link to="/about" className="navbar-link" style={{ color: '#fff', background: '#f43f5e', padding: '6px 18px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>About</Link>
        <div className="navbar-link" style={{ position: 'relative' }}>
          <button
            style={{ color: '#fff', background: '#0ea5e9', padding: '6px 18px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }}
            onClick={() => setShowMore((v) => !v)}
          >
            More ▾
          </button>
          {showMore && (
            <div style={{ position: 'absolute', top: '110%', left: 0, background: '#fff', color: '#222', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', minWidth: 160, zIndex: 10 }}>
              <Link to="/profile" style={{ display: 'block', padding: '10px 18px', textDecoration: 'none', color: '#0ea5e9', borderBottom: '1px solid #eee' }} onClick={() => setShowMore(false)}>Profile</Link>
              <Link to="/settings" style={{ display: 'block', padding: '10px 18px', textDecoration: 'none', color: '#0ea5e9', borderBottom: '1px solid #eee' }} onClick={() => setShowMore(false)}>Settings</Link>
              <Link to="/help" style={{ display: 'block', padding: '10px 18px', textDecoration: 'none', color: '#0ea5e9', borderBottom: '1px solid #eee' }} onClick={() => setShowMore(false)}>Help</Link>
              <Link to="/feedback" style={{ display: 'block', padding: '10px 18px', textDecoration: 'none', color: '#0ea5e9' }} onClick={() => setShowMore(false)}>Feedback</Link>
            </div>
          )}
        </div>
        <button className="navbar-link" style={{ color: '#fff', background: isDark ? '#facc15' : '#334155', padding: '6px 18px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }} onClick={onToggleDark}>
          {isDark ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
        {currentUser ? (
          <span className="navbar-user" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={currentUser.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(displayName)} alt="avatar" className="navbar-avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
            <span style={{ color: '#fff', fontWeight: 500 }}>{displayName}</span>
            <button className="navbar-link" style={{ color: '#fff', background: '#ef4444', padding: '6px 12px', borderRadius: 8, fontWeight: 600, border: 'none', cursor: 'pointer' }} onClick={handleSignOut}>Sign Out</button>
          </span>
        ) : (
          <>
            <Link to="/login" className="navbar-link" style={{ color: '#fff', background: '#6366f1', padding: '6px 18px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Login</Link>
            <Link to="/register" className="navbar-link" style={{ color: '#fff', background: '#22c55e', padding: '6px 18px', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>Register</Link>
          </>
        )}
        {/* Calendar filter popover */}
        {showCalendar && (
          <input
            type="date"
            value={selectedDate}
            onChange={e => {
              setSelectedDate(e.target.value);
              setShowCalendar(false);
            }}
            style={{ marginLeft: 8, background: '#fff', color: '#222', borderRadius: 6, border: '1px solid #ddd', padding: '4px 8px' }}
            max={today}
          />
        )}
      </div>
    </nav>
  );
}
