import React from "react";
import StatsIcon from "../interface/Svgs/StatsIcon";
import BudgetIcon from "../interface/Svgs/BudgetIcon";
import ExpenseIcon from "../interface/Svgs/ExpenseIcon";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

export default function Menu({ isOpen, toggleMenu }) {
  const navigate = useNavigate();
  return (
    <motion.div
      // initial={{ x: "0%" }}
      initial={{ x: isOpen ? "0%" : "-100%" }}
      animate={{ x: isOpen ? "0%" : "-100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed lg:flex z-10 bg-white shadow"
    >
      <div className="h-screen py-4 px-7 border-r">
        <h1 className="text-gray-600 text-2xl text-nowrap">Expense Tracker</h1>
        <div className="mt-20 text-lg flex flex-col gap-6">
          <Link
            onClick={() => {
              toggleMenu(false);
            }}
            to="/dashboard"
            className="flex gap-2 px-4 py-2 hover:bg-gray-900 cursor-pointer rounded-md hover:text-white"
          >
            <StatsIcon className="hover:text-white" />
            <span>Stats</span>
          </Link>
          <Link
            to="/dashboard/budget"
            onClick={() => {
              toggleMenu(false);
            }}
            className="flex gap-2 px-4 py-2 hover:bg-gray-900 cursor-pointer rounded-md hover:text-white"
          >
            <BudgetIcon className="hover:text-white" />
            <span>Budgets</span>
          </Link>
          <Link
            to="/BudgetDetail"
            onClick={() => {
              toggleMenu(false);
            }}
            className="flex gap-2 px-4 py-2 hover:bg-gray-900 cursor-pointer rounded-md hover:text-white"
          >
            <ExpenseIcon className="hover:text-white" />
            <span>Expenses</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
