import mongoose from "mongoose";
import Budget from "../models/Budget.Model.js";
import errorHandler from "../errors/error.js";
import Expense from "../models/Expense.Model.js";

export const getBudget = async (req, res, next) => {
  try {
    const userId = req.userId;
    const budgets = await Budget.find({ user: userId });
    res.status(200).send({ success: true, message: "Budgets sent", budgets });
  } catch (error) {
    next(error);
  }
};

export const addBudget = async (req, res, next) => {
  try {
    const { name, amount, emoji } = req.body;
    const user = req.userId;
    const budget = await Budget.create({ name, amount, emoji, user });
    res.status(201).send({ success: true, message: "Budget created", budget });
  } catch (error) {
    next(error);
  }
};

export const updateBudget = async (req, res, next) => {
  try {
    const { name, amount, emoji, budgetId } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(budgetId)) {
      return next(errorHandler(400, "Invalid Budget Id"));
    }
    const budgetToUpdate = await Budget.findById(budgetId);
    if (!budgetToUpdate) {
      return next(errorHandler(404, "Budget not found"));
    }
    if (budgetToUpdate.user.toString() !== userId) {
      return next(
        errorHandler(400, "Forbidden! You can not update this budget")
      );
    }

    const budgetToUpdateExpenses = await Expense.find({
      budget: budgetToUpdate._id,
    }).select("amount");
    const totalSpendingAmount = budgetToUpdateExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    if (budgetToUpdate.amount < totalSpendingAmount) {
      return next(
        errorHandler(
          400,
          `Budget amount can not be less than spendings $${totalSpendingAmount}`
        )
      );
    }

    const updatedBudget = await Budget.findByIdAndUpdate(
      budgetToUpdate,
      {
        name,
        amount,
        emoji,
        user: userId,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Budget updated",
      budget: updatedBudget,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBudget = async (req, res, next) => {
  try {
    const { budgetId } = req.body;
    const userId = req.userId;
    if (!mongoose.Types.ObjectId.isValid(budgetId)) {
      return next(errorHandler(400, "Invalid Budget Id"));
    }
    const budgetToDelete = await Budget.findById(budgetId);
    if (!budgetToDelete) {
      return next(errorHandler(404, "Budget not found"));
    }
    if (budgetToDelete.user.toString() !== userId) {
      return next(
        errorHandler(400, "Forbidden! You can not update this budget")
      );
    }
    await Budget.deleteOne({ _id: budgetId });
    await Expense.deleteMany({ budget: budgetId });
    res.status(200).send({
      sucess: true,
      message: "Budget deleted"
    });
  } catch (error) {
    next(error);
  }
};
