import express from "express";

const router = express.Router();

router.get('/get/:expenseId', authenticate, getExpense);
// router.post('/add/:expenseId', authenticate, addExpense);
// router.put('/update/:expenseId', authenticate, updateExpense);
// router.delete('/delete/:expenseId', authenticate, deleteExpense);

export default router;
