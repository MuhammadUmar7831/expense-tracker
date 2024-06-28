import express from "express";
import { overview } from "../controllers/stats.controller.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get('/overview', authenticate, overview);
// router.get('/recentBudgets/:userId', recentBudgets);
// router.get('/recentExpenses/:userId', recentExpenses);

export default router;
