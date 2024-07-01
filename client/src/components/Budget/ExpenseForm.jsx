// ExpenseForm.jsx
import React, { useState } from "react";

const ExpenseForm = ({ budgetId, addExpense }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Math.floor(Math.random() * 1000), // Generate a random ID (replace with UUID or server-generated ID in real app)
      description,
      amount: parseFloat(amount),
      budgetId: parseInt(budgetId),
    };
    addExpense(newExpense);
    setDescription("");
    setAmount("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
