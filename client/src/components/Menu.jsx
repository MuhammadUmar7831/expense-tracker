import React from "react";
import StatsIcon from "../interface/Svgs/StatsIcon";
import BudgetIcon from "../interface/Svgs/BudgetIcon";
import ExpenseIcon from "../interface/Svgs/ExpenseIcon";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="flex">
      <div className="h-screen py-4 px-7 border-r">
        <h1 className="text-gray-600 text-2xl text-nowrap">Expense Tracker</h1>
        <div className="mt-20 text-lg flex flex-col gap-6">
          <Link to="/dashboard" className="flex gap-2 px-4 py-2 hover:bg-blue-400 cursor-pointer rounded-md hover:text-white">
            <StatsIcon className="hover:text-white" />
            <span>Stats</span>
          </Link>
          <Link to="/dashboard/budget" className="flex gap-2 px-4 py-2 hover:bg-blue-400 cursor-pointer rounded-md hover:text-white">
            <BudgetIcon className="hover:text-white" />
            <span>Budgets</span>
          </Link>
          <Link to="/dashboard/expense" className="flex gap-2 px-4 py-2 hover:bg-blue-400 cursor-pointer rounded-md hover:text-white">
            <ExpenseIcon className="hover:text-white" />
            <span>Expenses</span>
          </Link>
        </div>
      </div>
      <div className="w-full h-fit bg-gray-900 p-4 text-white text-left text-xl">
        Menu
      </div>
    </div>
  );
}
