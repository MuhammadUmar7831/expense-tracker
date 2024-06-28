import React, { useState } from "react";
import "../styles/budget.css";
import BudgetDialog from "../components/Budget/BudgetDialog";
import BudgetCard from "../components/Budget/BudgetCard";

const Budget = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);

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
      <div className="app">
        <div className="main-content">
          <h2>My Budgets</h2>
          <div className="budgets-grid">
            <BudgetCard openDialog={openDialog} />{" "}
            {/* Render the "Create New Budget" card */}
            {budgets.map((budget, index) => (
              <BudgetCard key={index} budget={budget} />
            ))}
          </div>
        </div>
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
