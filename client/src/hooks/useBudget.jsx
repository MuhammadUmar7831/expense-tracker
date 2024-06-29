import { useState } from 'react';

const useBudget = () => {
  const [budgets, setBudgets] = useState([]);

  // Function to add a new budget
  const addBudget = (newBudget) => {
    setBudgets([...budgets, newBudget]);
  };

  // Function to delete a budget by id
  const deleteBudget = (budgetId) => {
    const updatedBudgets = budgets.filter(budget => budget.id !== budgetId);
    setBudgets(updatedBudgets);
  };

  // Function to update a budget
  const updateBudget = (updatedBudget) => {
    const updatedBudgets = budgets.map(budget =>
      budget.id === updatedBudget.id ? updatedBudget : budget
    );
    setBudgets(updatedBudgets);
  };

  return {
    budgets,
    addBudget,
    deleteBudget,
    updateBudget
  };
};

export default useBudget;
