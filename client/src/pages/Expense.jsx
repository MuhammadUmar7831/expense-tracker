import React, { useEffect } from "react";
import ExpenseTable from "../components/Expense/ExpenseTable";
import BeatLoader from "react-spinners/BeatLoader";
import { loaderColor } from "../constants/loaderColor";
import EditExpenseModal from "../components/Expense/EditExpenseModal";
import useExpense from "../hooks/useExpense";
import "../styles/expense.css";

const Expense = () => {
  const {
    expenses,
    showPopup,
    openPopup,
    closePopup,
    selectedExpense,
    setSelectedExpense,
    handleSubmit,
    fetchData,
  } = useExpense();

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-5 items-center justify-center p-2">
      <div className="w-[90%] mt-10">
        <h1 className="text-3xl font-semibold">My Expenses</h1>
        <p className="text-lg mt-2">Latest Expenses</p>
      </div>
      {expenses == false ? (
        <div className="flex justify-center w-full mt-5">
          <BeatLoader color={loaderColor} />
        </div>
      ) : expenses.length > 0 ? (
        <ExpenseTable expenses={expenses} openPopup={openPopup} />
      ) : (
        <div className="text-2xl">😔 No Expense Found</div>
      )}
      {showPopup && (
        <EditExpenseModal
          closePopup={closePopup}
          selectedExpense={selectedExpense}
          handleSubmit={handleSubmit}
          setSelectedExpense={setSelectedExpense}
        />
      )}
    </div>
  );
};

export default Expense;
