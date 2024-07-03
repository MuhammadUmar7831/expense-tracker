import React, { useEffect, useState } from "react";
import BudgetDialog from "../components/Budget/BudgetDialog";
import BudgetCard from "../components/Budget/BudgetCard";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loading.slice";
import { setError } from "../redux/slices/error.slice";
import { getUserAllBudgetsApi } from "../api/budget.api";
import BeatLoader from "react-spinners/BeatLoader";
import { loaderColor } from "../constants/loaderColor";
import "../styles/budget.css";

const Budget = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);
  const disptach = useDispatch();
  const getAllBudgets = async () => {
    // disptach(setLoading(true));
    const res = await getUserAllBudgetsApi();
    if (!res.success) {
      disptach(setError(res.message));
    } else {
      setBudgets(res.budgets);
    }
    // disptach(setLoading(false));
  };

  useEffect(() => {
    getAllBudgets();
  }, []);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const saveBudget = (budget) => {
    setBudgets([...budgets, budget]);
  };

  return (
    <>
      <div className="px-4 mt-10">
        <h1 className="text-3xl font-semibold">My Budgets</h1>
        {budgets == false ? (
          <div className="flex justify-center w-full mt-5">
            <BeatLoader color={loaderColor} />
          </div>
        ) : (
          <div className="flex gap-[6px] flex-wrap w-full mt-5">
            <div className="flex flex-col justify-center items-center w-full md:w-[48%] lg:w-[33%] bg-gray-100 border border-dashed p-4 rounded-md mb-2 text-xl font-semibold cursor-pointer">
              <span>+</span>
              <span>Create New Budget</span>
            </div>
            {budgets.map((budget, index) => (
              <BudgetCard key={index} budget={budget} />
            ))}
          </div>
        )}
      </div>

      {isDialogOpen && (
        <>
          <div className="overlay" onClick={closeDialog}></div>
          <BudgetDialog onClose={closeDialog} onSaveBudget={saveBudget} />
        </>
      )}
    </>
  );
};

export default Budget;
