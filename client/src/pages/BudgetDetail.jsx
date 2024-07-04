import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import BudgetCard from "../components/Budget/BudgetCard";
import BudgetDialog from "../components/Budget/BudgetDialog";
import "../styles/budgetDetail.css";
import { getBudgetByIdApi } from "../api/budget.api";
import { useDispatch } from "react-redux";
import { setError } from "../redux/slices/error.slice";
import AddExpenseModal from "../components/Budget/AddExpenseModal";
import EditBudgetModal from "../components/Budget/EditBudgetModal";

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
  const [editBudgetName, setEditBudgetName] = useState(
    budget ? budget.name : ""
  );
  const [editBudgetAmount, setEditBudgetAmount] = useState(
    budget ? budget.amount : ""
  );
  const dispatch = useDispatch();

  const getBudgetById = async () => {
    const res = await getBudgetByIdApi(budgetId);
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setBudget(res.budget);
    }
  };
  useEffect(() => {
    getBudgetById();
  }, []);

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
        ? {
            ...expense,
            name: editExpenseName,
            amount: parseFloat(editExpenseAmount),
          }
        : expense
    );
    setExpenses(updatedExpenses);

    const totalSpent = updatedExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setBudget({ ...budget, spent: totalSpent });

    setEditExpenseId(null);
    setEditExpenseName("");
    setEditExpenseAmount("");
  };

  // Function to delete expense
  const deleteExpense = (expenseId) => {
    const updatedExpenses = expenses.filter(
      (expense) => expense.id !== expenseId
    );
    setExpenses(updatedExpenses);

    const totalSpent = updatedExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );
    setBudget({ ...budget, spent: totalSpent });
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
      <h2 className="text-2xl font-bold">Budget Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-6">
        {/* <div className="bg-white rounded-lg shadow-md p-4">
          <div className="mb-4">
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
        </div> */}
        <div className="flex flex-col">
          {budget && (
            <BudgetCard
              budget={budget}
              link={false}
              className={"w-full md:w-full lg:w-full h-fit"}
            />
          )}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setIsEditingBudget(true)}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg mr-4 hover:bg-gray-800"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" /> Edit
            </button>
            <button
              onClick={handleDeleteBudget}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
            >
              <FontAwesomeIcon icon={faTrashAlt} className="mr-2" /> Delete
            </button>
          </div>
        </div>

        <AddExpenseModal />
      </div>

      {budget !== null && isEditingBudget ? (
        <EditBudgetModal
          budget={budget}
          onClose={() => setIsEditingBudget(false)}
        />
      ) : (
        <></>
      )}
      {/* <div className="mt-8">
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
                  <td className="border px-4 py-2">
                    ${expense.amount.toFixed(2)}
                  </td>
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
      </div> */}
    </div>
  );
};

export default BudgetDetail;
