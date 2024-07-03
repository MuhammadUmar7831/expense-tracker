import React, { useEffect, useState } from "react";
import "../styles/expense.css";
import { getUserAllExpenses } from "../api/expense.api";
import { useDispatch } from "react-redux";
import { setError } from "../redux/slices/error.slice";
import ExpenseTable from "../components/Expense/ExpenseTable";
import BeatLoader from "react-spinners/BeatLoader";
import { loadetColor } from "../constants/loaderColor";
import EditExpenseModal from "../components/Expense/EditExpenseModal";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const res = await getUserAllExpenses();
      console.log(res);
      if (!res.success) {
        dispatch(setError(res.message));
      } else {
        setExpenses(res.expenses);
      }
    }
    fetchData();
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleSubmit = () => {
    // Function prototype for submitting changes
    closePopup();
  };

  const openPopup = (expense) => {
    setSelectedExpense(expense);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedExpense(null);
  };

  const formatDate = (dateStr) => {
    const options = { month: "long", year: "numeric", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-center p-2">
      <div className="w-[90%] mt-10">
        <h1 className="text-3xl font-semibold">My Expenses</h1>
        <p className="text-lg mt-2">Latest Expenses</p>
      </div>
      {expenses == false ? (
        <div className="flex justify-center w-full mt-5">
          <BeatLoader color={loadetColor} />
        </div>
      ) : expenses.length > 0 ? (
        <ExpenseTable expenses={expenses} />
      ) : (
        <div className="text-2xl">😔 No Expense Found</div>
      )}
      {showPopup && (
        <EditExpenseModal
          closePopup={closePopup}
          selectedExpense={selectedExpense}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Expense;
