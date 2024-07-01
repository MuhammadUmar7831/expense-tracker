import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import BudgetCard from "../components/Budget/BudgetCard";
import BudgetDialog from "../components/Budget/BudgetDialog";
import "../styles/budgetDetail.css";

const BudgetDetail = () => {
  const { budgetId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const passedBudget = location.state?.budget;

  // State for budget and expenses
  const [budget, setBudget] = useState(passedBudget || null);
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [editExpenseId, setEditExpenseId] = useState(null);
  const [editExpenseName, setEditExpenseName] = useState("");
  const [editExpenseAmount, setEditExpenseAmount] = useState("");
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [editBudgetName, setEditBudgetName] = useState(budget ? budget.name : "");
  const [editBudgetAmount, setEditBudgetAmount] = useState(budget ? budget.amount : "");

  useEffect(() => {
    if (!budget) {
      // If budget is not passed, open the dialog to create a new budget
      openDialog();
    }
  }, [budget]);

  // Function to handle creation of budget from BudgetDialog
  const handleSaveBudget = (newBudget) => {
    setBudget(newBudget); // Set the new budget data
    setEditBudgetName(newBudget.name);
    setEditBudgetAmount(newBudget.amount);
  };

  // Function to open BudgetDialog
  const openDialog = () => {
    // Open dialog logic here if needed
    // For example, you can manage a state to control the dialog visibility
  };

  // Function to add expense
  const addExpense = () => {
    if (name && amount) {
      const newExpense = {
        id: expenses.length + 1,
        name: name,
        amount: parseFloat(amount),
        date: new Date().toLocaleDateString(),
      };

      // Update total spent
      const updatedBudget = {
        ...budget,
        spent: budget.spent + parseFloat(amount),
      };

      setExpenses([...expenses, newExpense]);
      setBudget(updatedBudget);
      setName("");
      setAmount("");
    }
  };

  // Function to edit expense
  const saveEditedExpense = () => {
    const updatedExpenses = expenses.map((expense) =>
      expense.id === editExpenseId
        ? { ...expense, name: editExpenseName, amount: parseFloat(editExpenseAmount) }
        : expense
    );
    setExpenses(updatedExpenses);

    const totalSpent = updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setBudget({ ...budget, spent: totalSpent });

    setEditExpenseId(null);
    setEditExpenseName("");
    setEditExpenseAmount("");
  };

  // Function to delete expense
  const deleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseId);
    setExpenses(updatedExpenses);

    const totalSpent = updatedExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    setBudget({ ...budget, spent: totalSpent });
  };

  // Function to edit budget
  const handleEditBudget = () => {
    setIsEditingBudget(true);
  };

  // Function to save edited budget
  const saveEditedBudget = () => {
    const updatedBudget = {
      ...budget,
      name: editBudgetName,
      amount: parseFloat(editBudgetAmount),
    };

    setBudget(updatedBudget);
    setIsEditingBudget(false);
  };

  // Function to cancel editing budget
  const cancelEditBudget = () => {
    setIsEditingBudget(false);
    setEditBudgetName(budget.name);
    setEditBudgetAmount(budget.amount);
  };

  // Function to delete budget
  const handleDeleteBudget = () => {
    // Implement delete budget logic if needed
    // For example, redirect to the previous page after deleting the budget
    navigate("/");
  };

  // Function to handle form submission for adding expense
  const handleSubmit = (event) => {
    event.preventDefault();
    addExpense();
  };

  return (
    <div className="p-10">
      {/* Render BudgetDialog if budget is not set */}
      {!budget && <BudgetDialog onClose={openDialog} onSaveBudget={handleSaveBudget} />}

      <div className="flex justify-end mb-4">
        {/* Conditionally render Edit and Delete buttons */}
        {budget && (
          <>
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
          </>
        )}
      </div>

      <h2 className="text-2xl font-bold">My Expenses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">Budget Details</h3>
          <div className="mb-4">
            {budget && !isEditingBudget && (
              <BudgetCard budget={budget} />
            )}
            {budget && isEditingBudget && (
              <div className="border p-5 rounded-lg">
                <h2 className="font-bold text-lg">Edit Budget</h2>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <input
                    type="text"
                    value={editBudgetName}
                    onChange={(e) => setEditBudgetName(e.target.value)}
                    className="border w-full px-3 py-2 rounded-lg"
                  />
                </div>
                <div className="mt-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <input
                    type="number"
                    value={editBudgetAmount}
                    onChange={(e) => setEditBudgetAmount(e.target.value)}
                    className="border w-full px-3 py-2 rounded-lg"
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={saveEditedBudget}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-green-600"
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" /> Save
                  </button>
                  <button
                    onClick={cancelEditBudget}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faTimes} className="mr-2" /> Cancel
                  </button>
                </div>
              </div>
            )}
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
            {expenses.map((expense) =>
              editExpenseId === expense.id ? (
                <tr key={expense.id}>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={editExpenseName}
                      onChange={(e) => setEditExpenseName(e.target.value)}
                      className="border w-full px-2 py-1 rounded-lg"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      value={editExpenseAmount}
                      onChange={(e) => setEditExpenseAmount(e.target.value)}
                      className="border w-full px-2 py-1 rounded-lg"
                    />
                  </td>
                  <td className="border px-4 py-2">{expense.date}</td>
                  <td className="border px-4 py-2">
                    <FontAwesomeIcon
                      icon={faSave}
                      className="text-green-500 hover:text-green-700 mr-2 cursor-pointer"
                      onClick={saveEditedExpense}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => setEditExpenseId(null)}
                    />
                  </td>
                </tr>
              ) : (
                <tr key={expense.id}>
                  <td className="border px-4 py-2">{expense.name}</td>
                  <td className="border px-4 py-2">${expense.amount.toFixed(2)}</td>
                  <td className="border px-4 py-2">{expense.date}</td>
                  <td className="border px-4 py-2">
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-blue-500 hover:text-blue-700 mr-2 cursor-pointer"
                      onClick={() => {
                        setEditExpenseId(expense.id);
                        setEditExpenseName(expense.name);
                        setEditExpenseAmount(expense.amount);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      onClick={() => deleteExpense(expense.id)}
                    />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetDetail;
