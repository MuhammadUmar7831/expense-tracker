import express from "express";

import {
  getExpense,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller.js";
import { authenticate } from "../middlewares/authenticate.js";
import getExpensesByUserId from "../middlewares/getExpensesByUserId.js";
const router = express.Router();

router.get("/get/:expenseId", authenticate, getExpense);
router.post("/add", authenticate, addExpense);
router.put("/update/:expenseId", authenticate, updateExpense);
router.delete("/delete/:expenseId", authenticate, getExpensesByUserId, deleteExpense);

export default router;
