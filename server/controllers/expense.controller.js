import Expense from "../models/Expense.Model.js";


export const getExpense = async (req, res, next) => {
    try {
      const expense = await Expense.findById(req.params.id);
      res.status(200).json(expense);
    } catch (err) {
      next(err);
    }
  };