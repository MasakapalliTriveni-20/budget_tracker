import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useBudget } from "../../context/useBudget";
import "./dashboard.css";

const getSummary = (transactions) => {
  const income = transactions
    .filter((txn) => txn.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const balance = income - expense;
  return { income, expense, balance };
};

function Dashboard() {
  const { state, dispatch } = useBudget();
  const { income, expense, balance } = getSummary(state.transactions);
  const overBudget = expense > (state.settings?.budgetLimit ?? 0);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortOption, setSortOption] = useState("latest");
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    category: "",
    date: ""
  });
  const [monthFilter, setMonthFilter] = useState("");
  const [description, setDescription] = useState("");
  const [isDark, setIsDark] = useState(state.settings.theme === 'dark');

  // Simulated user info
  const user = {
    email: 'user@email.com',
    avatar: 'https://ui-avatars.com/api/?name=User',
    name: 'User',
  };

  // Theme toggle handler (syncs with context/settings)
  const handleThemeToggle = (e) => {
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { ...state.settings, theme: e.target.checked ? "dark" : "light" },
    });
    document.body.classList.toggle("dark-mode", e.target.checked);
  };

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
    dispatch({
      type: "UPDATE_SETTINGS",
      payload: { ...state.settings, theme: !isDark ? "dark" : "light" },
    });
    document.body.classList.toggle("dark-mode", !isDark);
  };

  React.useEffect(() => {
    document.body.classList.toggle("dark-mode", state.settings.theme === "dark");
  }, [state.settings.theme]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount || !formData.category) return;
    const newTransaction = {
      id: Date.now(),
      ...formData,
      description,
      amount: parseFloat(formData.amount),
      date: formData.date || new Date().toLocaleDateString(),
    };
    dispatch({ type: "ADD_TRANSACTION", payload: newTransaction });
    setFormData({ title: "", amount: "", type: "income", category: "", date: "" });
    setDescription("");
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TRANSACTION", payload: id });
  };

  const handleExport = () => {
    if (!state.transactions || state.transactions.length === 0) {
      alert("No transactions to export.");
      return;
    }
    const csvHeaders = ["Title", "Amount", "Type", "Category", "Date"];
    const rows = state.transactions.map((txn) => [
      txn.title || "",
      txn.amount || 0,
      txn.type || "",
      txn.category || "",
      txn.date || "",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [csvHeaders, ...rows]
        .map((e) => e.map(String).map((v) => `"${v}"`).join(","))
        .join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate monthly summary
  const today = new Date();
  const todayStr = today.toLocaleDateString('en-GB');
  const monthStr = today.toISOString().slice(0, 7);
  const monthlyTxns = state.transactions.filter(t => t.date && t.date.startsWith(monthStr));
  const monthlyIncome = monthlyTxns.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0);
  const monthlyExpense = monthlyTxns.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0);
  const netAvailable = monthlyIncome - monthlyExpense;
  const budgetLimit = state.settings?.budgetLimit || 20000;
  const percentSpent = Math.min(100, Math.round((monthlyExpense / budgetLimit) * 100));

  // Top categories
  const categoryTotals = {};
  monthlyTxns.forEach(t => {
    if (!categoryTotals[t.category]) categoryTotals[t.category] = 0;
    categoryTotals[t.category] += t.amount;
  });
  const topCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  // Filtered and sorted transactions
  const filteredTxns = state.transactions
    .filter((txn) => (filterType === "all" ? true : txn.type === filterType))
    .filter((txn) => txn.title.toLowerCase().includes(searchText.toLowerCase()))
    .filter((txn) =>
      monthFilter
        ? txn.date && txn.date.startsWith(monthFilter)
        : true
    )
    .sort((a, b) => {
      if (sortOption === "latest") return new Date(b.date) - new Date(a.date);
      if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortOption === "high") return b.amount - a.amount;
      if (sortOption === "low") return a.amount - b.amount;
      return 0;
    });

  // Pie chart data
  const pieData = [
    { name: "Income", value: income },
    { name: "Expenses", value: expense },
  ];
  const pieColors = ["#4CAF50", "#F44336"];

  // Get unique months from transactions for filter dropdown
  const months = Array.from(
    new Set(state.transactions.map((t) => (t.date ? t.date.slice(0, 7) : "")))
  ).filter(Boolean);

  return (
    <div className="container">
      <div style={{ margin: '24px 0', textAlign: 'center' }}>
        <h2>Hi, {user.name}! Today is {todayStr}</h2>
      </div>
      <div className="summary-cards">
        <div className="card">
          <h3>Monthly Earnings</h3>
          <p>₹{monthlyIncome.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Monthly Outflows</h3>
          <p>₹{monthlyExpense.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Net Available</h3>
          <p>₹{netAvailable.toFixed(2)}</p>
        </div>
      </div>
      <div style={{ margin: '32px 0' }}>
        <h4>Budget Progress</h4>
        <div style={{ background: '#eee', borderRadius: 8, height: 24, width: '100%', marginBottom: 8 }}>
          <div style={{ width: `${percentSpent}%`, background: '#4CAF50', height: '100%', borderRadius: 8, transition: 'width 0.4s' }} />
        </div>
        <div>Status: {percentSpent}% of ₹{budgetLimit} spent</div>
      </div>
      <div style={{ margin: '32px 0' }}>
        <h4>Top Categories (Monthly)</h4>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {topCategories.map(([cat, amt]) => (
            <li key={cat}>{cat}: ₹{amt.toFixed(2)}</li>
          ))}
        </ul>
      </div>
      {/* Add Transaction Form */}
      <form id="transactionForm" onSubmit={handleSubmit} className="space-y-4">
        <select name="type" value={formData.type} onChange={handleChange} className="input" required>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input"
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
        <input
          type="text"
          name="description"
          placeholder="Note (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="input"
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="input"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Entry</button>
      </form>
      {/* Export & Filter Controls */}
      <div style={{ margin: '32px 0', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button className="export" onClick={handleExport}>Export CSV</button>
        <input type="date" onChange={e => setMonthFilter(e.target.value.slice(0, 7))} />
        <select onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Utilities">Utilities</option>
          <option value="Travel">Travel</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Transaction Table */}
      <table style={{ width: "100%", marginTop: 24, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f1f1f1" }}>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTxns.map((txn, idx) => (
            <tr key={txn.id} style={{ borderBottom: "1px solid #eee" }}>
              <td>{txn.title}</td>
              <td>{state.settings.currency}{txn.amount}</td>
              <td>{txn.type}</td>
              <td>{txn.category}</td>
              <td>{txn.date}</td>
              <td>
                <button onClick={() => handleDelete(txn.id)} style={{ color: "#d63031", border: "none", background: "none", cursor: "pointer" }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
