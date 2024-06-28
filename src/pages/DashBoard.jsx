import React from "react";
import DashBoard_Menu from "../components/DashBoard_Menu";
import { Route, Routes } from "react-router-dom";
import Stats from "./Stats";
import Budget from "./Budget";
import Expense from "./Expense";

export default function DashBoard() {
  return (
    <div>
      <DashBoard_Menu />
      <Routes>
        <Route path="/" element={<Stats />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </div>
  );
}
