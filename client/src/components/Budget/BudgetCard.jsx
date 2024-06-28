import React from "react";

const BudgetCard = ({ budget, openDialog }) => {
  if (!budget) {
    return (
      <div className="budget-card-create-new" onClick={openDialog}>
        + Create New Budget
      </div>
    );
  }

  const { name, amount, spent } = budget;
  const remaining = amount - spent;
  const spentPercentage = (spent / amount) * 100;
  const remainingPercentage = (remaining / amount) * 100;

  return (
    <div className="budget-card">
      <div className="budget-info">
        <div className="budget-name">{name}</div>
        <div className="budget-amount">${amount}</div>
        <div className="item-number">0 Items</div>
      </div>
      <div className="single-bar">
        <div className="spent" style={{ width: `${spentPercentage}%` }}>
          <span className="bar-label">Spent: ${spent}</span>
        </div>
        <div className="remaining" style={{ width: `${remainingPercentage}%` }}>
          <span className="bar-label">Remaining: ${remaining}</span>
        </div>
      </div>
    </div>
  );
};
export default BudgetCard;
