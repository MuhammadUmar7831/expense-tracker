import express from "express";

import { getExpense, addExpense, updateExpense, deleteExpense } from "../controllers/expense.controller.js";
const router = express.Router();

router.get('/get/:expenseId', getExpense);
router.post('/add', addExpense);
router.put('/update/:expenseId', updateExpense);
router.delete('/delete/:expenseId', deleteExpense);

export default router;