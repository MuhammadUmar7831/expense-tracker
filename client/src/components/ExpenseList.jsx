// ExpenseList.jsx
import React from "react";

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  return (
    <div className="expense-list">
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            <div>{expense.description}</div>
            <div>${expense.amount}</div>
            <button onClick={() => editExpense({ ...expense, amount: expense.amount + 100 })}>Edit</button>
            <button onClick={() => deleteExpense(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
