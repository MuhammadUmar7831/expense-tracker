import Expense from "../models/Expense.Model.js";
import errorHandler from "../errors/error.js";

export const getExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const expense = await Expense.findById(expenseId);
    if (!expense) {
      return next(errorHandler(404, "Expense not found"));
    }
    res.status(200).send({ success: true, message: "Expense Sent", expense });
  } catch (error) {
    next(error);
  }
};

export const addExpense = async (req, res, next) => {
  try {
    const { name, amount, date, budget } = req.body;
    const newExpense = new Expense({ name, amount, date, budget });
    const savedExpense = await newExpense.save();
    res
      .status(201)
      .send({ success: true, message: "Expense Added", savedExpense });
  } catch (error) {
    next(error);
  }
};

export const updateExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const { name, amount, date, budget } = req.bodyل;
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { name, amount, date, budget },
      { new: true }
    );
    if (!updatedExpense) {
      return next(errorHandler(404, "Expense not found"));
    }
    res
      .status(200)
      .send({ success: true, message: "Expense Updated", updatedExpense });
  } catch (error) {
    next(error);
  }
};

export const deleteExpense = async (req, res, next) => {
  try {
    const { expenseId } = req.params;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return next(errorHandler(404, "Expense not found"));
    }
    res
      .status(200)
      .send({ success: true, message: "Expense deleted successfully" });
  } catch (error) {
    next(error);
  }
};
