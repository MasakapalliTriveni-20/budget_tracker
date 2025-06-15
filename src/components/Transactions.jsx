import React, { useState, useEffect } from "react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    description: "",
    amount: 0,
    category: "",
  });

  useEffect(() => {
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(savedTransactions);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({ description: "", amount: 0, category: "" });
  };

  return (
    <div>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.description} - ${transaction.amount} (
            {transaction.category})
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Description"
        value={newTransaction.description}
        onChange={(e) =>
          setNewTransaction({
            ...newTransaction,
            description: e.target.value,
          })
        }
      />
      <input
        type="number"
        placeholder="Amount"
        value={newTransaction.amount}
        onChange={(e) =>
          setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })
        }
      />
      <input
        type="text"
        placeholder="Category"
        value={newTransaction.category}
        onChange={(e) =>
          setNewTransaction({ ...newTransaction, category: e.target.value })
        }
      />
      <button onClick={addTransaction}>Add Transaction</button>
    </div>
  );
};

export default Transactions;
