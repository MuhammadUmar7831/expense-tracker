import Expense from "../models/Expense.Model.js";
import errorHandler from "../errors/error.js";
import Budget from "../models/Budget.Model.js";

export const getExpense = async (req, res, next) => {
  try {
    const { expensesIds } = req;
    if (!expensesIds || expensesIds.length === 0) {
      return next(errorHandler(404, "No expenses found for user"));
    }
    const expenses = await Expense.find({ _id: { $in: expensesIds } });
    res.status(200).send({ success: true, message: "Expenses retrieved", expenses });
  } catch (error) {
    next(error);
  }
};


export const getExpensesByBudget = async (req, res, next) => {
  try {
    const { budgetId } = req.params;
    const expenses = await Expense.find({ budget: budgetId });

    if (!expenses || expenses.length === 0) {
      return next(errorHandler(404, "No expenses found for this budget"));
    }

    res.status(200).send({ success: true, message: "Expenses Retrieved", expenses });
  } catch (error) {
    next(error);
  }
};


export const addExpense = async (req, res, next) => {
  try {
    const { name, amount, date, budget } = req.body;

    const budgetData = await Budget.findById(budget);
    if (!budgetData) {
      return next(errorHandler(404, "Budget not found"));
    }

    const currentExpenses = await Expense.find({ budget }).select("amount");
    const totalExpenses = currentExpenses.reduce((total, expense) => total + expense.amount, 0);
    
    if (totalExpenses + amount > budgetData.amount) {
      return next(errorHandler(400, "Total expenses exceed the budget amount"));
    }
    

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
    const { expenseIds } = req;

    if (!expenseId) {
      return next(errorHandler(400, "Id is required"));
    }


    if (!expenseIds || !Array.isArray(expenseIds)) {
      return next(errorHandler(400, "Invalid Format"));
    }

    let expenseToDelete = false;
    for (const _expenseId of expenseIds) {
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

    const budgetData = await Budget.findById(budget);
    if (!budgetData) {
      return next(errorHandler(404, "Budget not found"));
    }

    const currentExpenses = await Expense.find({ budget }).select("amount");
    const totalExpenses = currentExpenses.reduce((total, expense) => total + expense.amount, 0);
    
    if (totalExpenses + amount > budgetData.amount) {
      return next(errorHandler(400, "Total expenses exceed the budget amount"));
    }

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

    if (!expenseId) {
      return next(errorHandler(400, "Id is required"));
    }


    if (!expensesIds || !Array.isArray(expensesIds)) {
      return next(errorHandler(400, "Invalid Format"));
    }

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
