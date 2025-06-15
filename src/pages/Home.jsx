import React from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="container">
      <Navbar />
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <h2>Welcome to Budget Tracker!</h2>
        <p>Track your income, expenses, and visualize your financial health.</p>
        <p>Use the navigation bar to access your dashboard, monthly summary, or learn more about this app.</p>
      </div>
    </div>
  );
}
