import React from "react";
import { Link } from "react-router-dom";

const BudgetCard = ({ budget, openDialog }) => {
  const handleCardClick = () => {
    if (budget) {
      
      // window.location.href = `/expenses/${budget.id}`; 
      window.location.href = `./pages/MyExpenses`; 
    } else {
      openDialog(); // Open the dialog to create a new budget
    }
  };

  if (!budget) {
    return (
      <div className="budget-card-create-new" onClick={openDialog}>
        + <br /> Create New Budget
      </div>
    );
  }

  const { name, amount, spent } = budget;
  const remaining = amount - spent;
  const spentPercentage = (spent / amount) * 100;
  const remainingPercentage = (remaining / amount) * 100;

  return (
    <Link to={`/expenses/${budget.id}`} className="budget-card-link">
      <div className="budget-card" onClick={handleCardClick}>
        <div className="budget-info">
          <div className="budget-name-items">
            <div className="budget-name">{name}</div>
            <div className="item-number">0 Items</div>
          </div>
          <div className="budget-amount">${amount}</div>
        </div>
        <div className="single-bar-container">
          <div className="single-bar-labels">
            <span>Spent: ${spent}</span>
            <span>Remaining: ${remaining}</span>
          </div>
          <div className="single-bar">
            <div className="spent" style={{ width: `${spentPercentage}%` }}></div>
            <div className="remaining" style={{ width: `${remainingPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BudgetCard;
