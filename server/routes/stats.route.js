import express from "express";
import { barchart, overview, recentBudgets, recentExpenses } from "../controllers/stats.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get('/overview', authenticate, overview);
router.get('/barchart', authenticate, barchart);
router.get('/recentBudgets', authenticate, recentBudgets);
router.get('/recentExpenses', authenticate, recentExpenses);

export default router;
