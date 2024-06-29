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
    const { expensesIds } = req;

    // handle case where the param expenseId is not a valid id
    // handle case whre the requested expenseId does not even exists

    // Check if expenseId exists in userExpenses
    let expenseToDelete = false;
    for (const _expenseId of expensesIds) {
      if (_expenseId.toString() === expenseId) {
        expenseToDelete = true;
        break;
      }
    }

    // throw error in case expense not found
    if (!expenseToDelete) {
      return next(
        errorHandler(403, "You are not allowed to delete this expense")
      );
    }

    // Proceed with deleting the expense
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    if (!deletedExpense) {
      return next(errorHandler(404, "Expense not found"));
    }

    res.status(200).send({ success: true, message: "Expense deleted" });
  } catch (error) {
    next(error);
  }
};
