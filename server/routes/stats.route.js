import express from "express";
import { overview } from "../controllers/stats.controller.js";

const router = express.Router();

router.get('/overview/:userId', overview);
// router.get('/recentBudgets/:userId', recentBudgets);
// router.get('/recentExpenses/:userId', recentExpenses);

export default router;
