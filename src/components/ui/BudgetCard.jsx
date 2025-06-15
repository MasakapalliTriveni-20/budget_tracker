import React from "react";

const BudgetCard = ({ title, amount }) => (
  <div className="budget-card">
    <h3>{title}</h3>
    <p>{amount}</p>
  </div>
);

export default BudgetCard;
