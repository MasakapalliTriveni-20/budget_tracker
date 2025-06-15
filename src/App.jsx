import React, { useState, useEffect } from "react";
import { FaPlus, FaFileExport, FaTrash, FaMoon, FaSun } from "react-icons/fa";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import MonthlySummary from "./pages/MonthlySummary";
import About from "./pages/About";
import Home from "./pages/Home";
import SpendingLog from "./pages/SpendingLog";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Feedback from "./pages/Feedback";

const isAuthenticated = () => localStorage.getItem("loggedIn") === "true";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [dark, setDark] = useState(false);

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = income - expenses;

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!title || !amount || !category) return;
    const newTransaction = {
      id: Date.now(),
      title,
      amount,
      type,
      category,
    };
    setTransactions([...transactions, newTransaction]);
    setTitle("");
    setAmount("");
    setCategory("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const exportCSV = () => {
    const headers = "Title,Amount,Type,Category\n";
    const rows = transactions
      .map((t) => `${t.title},${t.amount},${t.type},${t.category}`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "transactions.csv";
    link.click();
  };

  return (
    <div className={dark ? "wrapper dark" : "wrapper"}>
      {isAuthenticated() && <Navbar isDark={dark} onToggleDark={() => setDark(!dark)} />}
      {isAuthenticated() && (
        <div className="container">
          <div className="summary-cards">
            <div className="card">
              <h2>Total Income</h2>
              <p>${income.toFixed(2)}</p>
            </div>
            <div className="card">
              <h2>Total Expenses</h2>
              <p>${expenses.toFixed(2)}</p>
            </div>
            <div className="card">
              <h2>Balance</h2>
              <p>${balance.toFixed(2)}</p>
            </div>
          </div>
          <div className="transaction-form">
            <h2>Add Transaction</h2>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <button onClick={addTransaction}>
              <FaPlus /> Add Transaction
            </button>
            <button onClick={exportCSV}>
              <FaFileExport /> Export CSV
            </button>
          </div>
          <div className="transaction-list">
            <h2>Transaction History</h2>
            <ul>
              {transactions.map((t) => (
                <li key={t.id}>
                  <span>{t.title}</span>
                  <span>${t.amount}</span>
                  <span>{t.type}</span>
                  <span>{t.category}</span>
                  <button onClick={() => deleteTransaction(t.id)}>
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/spending-log"
          element={
            isAuthenticated() ? <SpendingLog /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/monthly-summary"
          element={
            isAuthenticated() ? <MonthlySummary /> : <Navigate to="/login" />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </div>
  );
}

export default App;
