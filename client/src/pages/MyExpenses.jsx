// MyExpenses.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ExpenseList from "../components/ExpenseList"; // Assuming this component lists expenses
import ExpenseForm from "../components/ExpenseForm"; // Assuming this component handles adding/editing expenses
import "../styles/MyExpenses.css"; // Import the CSS file
const MyExpenses = () => {
  const { budgetId } = useParams(); // Get budgetId from URL params
  const {name}=useParams();
  const [expenses, setExpenses] = useState([
    // Example initial list of expenses
    // { id: 1, description: "Rent", amount: 1000 },
    // { id: 2, description: "Utilities", amount: 300 },
    // { id: 3, description: "Groceries", amount: 200 },
  ]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const editExpense = (editedExpense) => {
    setExpenses(expenses.map(expense => (expense.id === editedExpense.id ? editedExpense : expense)));
  };

  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter(expense => expense.id !== expenseId));
  };

  return (
    <div className="my-expenses">
      <h2>Expenses for Budget: {budgetId}</h2>
      <ExpenseForm budgetId={budgetId} addExpense={addExpense} /> {/* Component to add new expense */}
      <ExpenseList expenses={expenses} editExpense={editExpense} deleteExpense={deleteExpense} /> {/* Component to list expenses */}
    </div>
  );
};

export default MyExpenses;
