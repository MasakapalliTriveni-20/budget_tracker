import React, { useState } from "react";

const Dashboard = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Income: ${income}</p>
      <p>Total Expenses: ${expenses}</p>
      <p>Remaining Budget: ${income - expenses}</p>
    </div>
  );
};

export default Dashboard;
