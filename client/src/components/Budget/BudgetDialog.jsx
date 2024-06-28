import React, { useState } from "react";

const BudgetDialog = ({ onClose, onSaveBudget }) => {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Function to handle creation of budget
  const handleCreateBudget = () => {
    // Validate inputs
    if (budgetName.trim() === "" || budgetAmount.trim() === "") {
      alert("Please enter both budget name and amount.");
      return;
    }

    const amount = parseFloat(budgetAmount);

    // Save budget data
    onSaveBudget({ name: budgetName, amount, spent: 0 });

    // Reset fields after creating budget
    setBudgetName("");
    setBudgetAmount("");

    // Close the dialog
    onClose();
  };

  // Function to validate inputs and enable/disable button
  const validateInputs = () => {
    setIsButtonEnabled(budgetName.trim() !== "" && budgetAmount.trim() !== "");
  };

  // Effect to validate inputs whenever inputs change
  React.useEffect(() => {
    validateInputs();
  }, [budgetName, budgetAmount]);

  return (
    <div className="budget-dialog">
      <h3>Create New Budget</h3>
      <label>
        Budget Name:
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
          placeholder="Enter budget name"
        />
      </label>
      <label>
        Budget Amount:
        <input
          type="number"
          value={budgetAmount}
          onChange={(e) => setBudgetAmount(e.target.value)}
          placeholder="Enter budget amount"
        />
      </label>
      <button
        onClick={handleCreateBudget}
        disabled={!isButtonEnabled}
        className={isButtonEnabled ? "" : "disabled"}
      >
        Create Budget
      </button>
    </div>
  );
};

export default BudgetDialog;
