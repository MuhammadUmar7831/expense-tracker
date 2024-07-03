import React, { useEffect } from "react";
import ExpenseTable from "../components/Expense/ExpenseTable";
import EditExpenseModal from "../components/Expense/EditExpenseModal";
import useExpense from "../hooks/useExpense";
import ExpenseTableSkeleton from "../interface/ExpenseTableSkeleton";
import "../styles/expense.css";

const Expense = () => {
  const {
    expenses,
    setExpenses,
    showPopup,
    openPopup,
    closePopup,
    selectedExpense,
    setSelectedExpense,
    handleSubmit,
    fetchData,
    deleteExpense,
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
        <ExpenseTableSkeleton className={"flex flex-col gap-2 w-[90%]"} />
      ) : expenses.length > 0 ? (
        <ExpenseTable
          expenses={expenses}
          openPopup={openPopup}
          setExpenses={setExpenses}
        />
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
