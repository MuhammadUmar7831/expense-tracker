import Budget from "../models/Budget.Model.js";
import Expense from "../models/Expense.Model.js";

export const overview = async (req, res, next) => {
  try {
    const userId = req.userId;

    const budgets = await Budget.find({ user: userId });
    const totalBudgetAmount = budgets.reduce(
      (sum, budget) => sum + budget.amount,
      0
    );

    let totalSpendingAmount = 0;
    for (const budget of budgets) {
      const expenses = await Expense.aggregate([
        { $match: { budget: budget._id } },
        { $group: { _id: "$budget", totalSpending: { $sum: "$amount" } } },
      ]);
      if (expenses.length > 0) {
        totalSpendingAmount += expenses[0].totalSpending;
      }
    }

    res.status(200).send({
      success: true,
      netBudgetAmount: totalBudgetAmount,
      netSpendingAmount: totalSpendingAmount,
      netBudgets: budgets.length,
      message: "overview of expense sent",
    });
  } catch (error) {
    next(error);
  }
};

export const barchart = async (req, res, next) => {
  try {
    const userId = req.userId;

    const budgets = await Budget.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    const budgetData = [];
    for (const budget of budgets) {
      const expenses = await Expense.aggregate([
        { $match: { budget: budget._id } },
        { $group: { _id: "$budget", totalSpending: { $sum: "$amount" } } },
      ]);

      const totalSpending = expenses.length > 0 ? expenses[0].totalSpending : 0;

      budgetData.push({
        budgetId: budget._id,
        budgetName: budget.name,
        budgetAmount: budget.amount,
        totalSpending: totalSpending,
      });
    }

    res.status(200).send({
      success: true,
      budgetData,
      message: "barchart of expense sent",
    });
  } catch (error) {
    next(error);
  }
};
