import Expense from "../models/expense.model.js";
import errorHandler from "../errors/error.js"


export const getExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const expense = await Expense.findById(expenseId);
        if (!expense) {
            throw errorHandler(404, "Expense not found");
        }
        res.status(200).json(expense);
    } catch (error) {
        next(error);
    }
};

export const addExpense = async (req, res, next) => {
    try {
        const newExpense = new Expense(req.body);
        const savedExpense = await newExpense.save();
        res.status(201).json(savedExpense);
    } catch (error) {
        next(error);
    }
};

export const updateExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const updatedExpense = await Expense.findByIdAndUpdate(expenseId, req.body, { new: true });
        if (!updatedExpense) {
            throw errorHandler(404, "Expense not found");
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        next(error);
    }
};

export const deleteExpense = async (req, res, next) => {
    try {
        const { expenseId } = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(expenseId);
        if (!deletedExpense) {
            throw errorHandler(404, "Expense not found");
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        next(error);
    }
};

