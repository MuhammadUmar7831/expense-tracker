import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import BudgetCard from "../components/Budget/BudgetCard";
import "../styles/budgetDetail.css";

const BudgetDetail = () => {
  const { budgetId } = useParams();

  // Sample budget data for the specific budget
  const [budget, setBudget] = useState({
    id: budgetId,
    name: "Sample Budget",
    amount: 2000,
    spent: 1500,
  });

  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const addExpense = () => {
    if (name && amount) {
      const newExpense = {
        id: expenses.length + 1,
        name: name,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(), // Add current date
      };
      setExpenses([...expenses, newExpense]);
      setName("");
      setAmount("");
    }
  };

  const editExpense = (editedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === editedExpense.id ? editedExpense : expense
      )
    );
  };

  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  const handleEditBudget = () => {
    // Implement logic to edit the budget details
    // For demonstration, opening a prompt to enter new budget details
    const newBudgetName = prompt("Enter new budget name", budget.name);
    const newBudgetAmount = parseFloat(prompt("Enter new budget amount", budget.amount));

    if (newBudgetName && !isNaN(newBudgetAmount)) {
      const editedBudget = {
        ...budget,
        name: newBudgetName,
        amount: newBudgetAmount,
      };
      setBudget(editedBudget);
      console.log("Budget edited successfully:", editedBudget);
    } else {
      // Handle invalid input or cancel action
      console.log("Edit cancelled or invalid input");
    }
  };

  const handleDeleteBudget = () => {
    // Implement logic to delete the budget
    console.log("Budget deleted successfully:", budget);
    setBudget(null); // For example, set budget to null or an empty object
    setExpenses([]); // Clear expenses array when deleting budget
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addExpense();
  };

  return (
    <div className="p-10">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleEditBudget}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4 hover:bg-blue-600"
        >
          <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit Budget
        </button>
        <button
          onClick={handleDeleteBudget}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Delete Budget
        </button>
      </div>

      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Budget Details</h3>
          <div className="mb-4">
            <BudgetCard budget={budget} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Add Expense</h3>
          <div className="border p-5 rounded-lg">
            <h2 className="font-bold text-lg">Add Expense</h2>
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Expense Name</h2>
              <input
                type="text"
                placeholder="e.g, Home Decor"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border w-full px-3 py-2 rounded-lg"
              />
            </div>
            <div className="mt-2">
              <h2 className="text-black font-medium my-1">Expense Amount</h2>
              <input
                type="number"
                placeholder="e.g, 1000$"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border w-full px-3 py-2 rounded-lg"
              />
            </div>
            <button
              disabled={!(name && amount)}
              onClick={handleSubmit}
              className="mt-3 w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add new Expense
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Latest Expenses</h3>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="border px-4 py-2">{expense.name}</td>
                <td className="border px-4 py-2">{expense.amount}</td>
                <td className="border px-4 py-2">{expense.date}</td>
                <td className="border px-4 py-2">
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer"
                    onClick={() => editExpense(expense)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => deleteExpense(expense.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetDetail;
