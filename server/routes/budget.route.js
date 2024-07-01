import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import {
  addBudget,
  deleteBudget,
  getBudget,
  updateBudget,
} from "../controllers/budget.controller.js";

const router = express.Router();

router.get("/get", authenticate, getBudget); //to get all budgets of authenticated user
// router.get('/get/:budgetId', authenticate, getBudget); //to get a particular budget
router.post("/add", authenticate, addBudget); // to add a budget
router.put("/update", authenticate, updateBudget); // to update a specific budget
router.delete("/delete", authenticate, deleteBudget); // to delete a specific budget

export default router;
