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

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = income - expenses;

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
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route
          path="/dashboard"
          element={
            <>
              <Navbar isDark={dark} onToggleDark={() => setDark(!dark)} />
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
            </>
          }
        />
        <Route
          path="/spending-log"
          element={
            <>
              <Navbar isDark={dark} onToggleDark={() => setDark(!dark)} />
              <SpendingLog />
            </>
          }
        />
        <Route
          path="/monthly-summary"
          element={
            <>
              <Navbar isDark={dark} onToggleDark={() => setDark(!dark)} />
              <MonthlySummary />
            </>
          }
        />
        <Route path="/about" element={<><Navbar isDark={dark} onToggleDark={() => setDark(!dark)} /><About /></>} />
        <Route path="/profile" element={<><Navbar isDark={dark} onToggleDark={() => setDark(!dark)} /><Profile /></>} />
        <Route path="/settings" element={<><Navbar isDark={dark} onToggleDark={() => setDark(!dark)} /><Settings /></>} />
        <Route path="/help" element={<><Navbar isDark={dark} onToggleDark={() => setDark(!dark)} /><Help /></>} />
        <Route path="/feedback" element={<><Navbar isDark={dark} onToggleDark={() => setDark(!dark)} /><Feedback /></>} />
      </Routes>
    </div>
  );
}

export default App;
