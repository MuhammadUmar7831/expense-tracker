import React from "react";
// import DashBoard_Menu from "../components/DashBoard_Menu";
import { Route, Routes } from "react-router-dom";
import Stats from "./Stats";
import Budget from "./Budget";
import Expense from "./Expense";
import Menu from "../components/Menu";
import DashboradHeader from "../components/DashboradHeader";

export default function DashBoard() {
  return (
    <div className="flex">
      {/* <DashBoard_Menu /> */}
      <Menu />
      <div className="w-full">
        <DashboradHeader />
        <Routes>
          <Route path="/" element={<Stats />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </div>
    </div>
  );
}
