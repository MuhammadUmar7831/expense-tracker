import React from "react";
import { useNavigate } from "react-router-dom";

const BudgetCard = ({ budget, openDialog }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (budget) {
      navigate("/BudgetDetail", { state: { budget } });
    } else {
      openDialog();
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
    <div className="budget-card-link" onClick={handleCardClick}>
      <div className="budget-card">
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
    </div>
  );
};

export default BudgetCard;
