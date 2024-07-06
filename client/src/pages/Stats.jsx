import React, { useEffect, useState } from "react";
import OverviewCard from "../components/Stats/OverviewCard";
import BudgetIcon from "../interface/Svgs/BudgetIcon";
import ExpenseIcon from "../interface/Svgs/ExpenseIcon";
import NumberIcon from "../interface/Svgs/NumberIcon";
import "../styles/stats.css";
import {
  getBarChartDataApi,
  getLatestBudgetsApi,
  getLatestExpensesApi,
  getOverviewApi,
} from "../api/stats.api";
import { useDispatch } from "react-redux";
import { setError } from "../redux/slices/error.slice";
import StackedBarchart from "../components/Stats/StackedBarchart";
import BudgetCard from "../components/Budget/BudgetCard";
import ExpenseTable from "../components/Expense/ExpenseTable";

const Stats = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [numOfBudgets, setNumOfBudgets] = useState(0);
  const [barChartData, setBarChartData] = useState(false);
  const [latestBudgets, setLatestBudgets] = useState(false);
  const [latestExpenses, setLatestExpenses] = useState(false);
  const dispatch = useDispatch();

  const getOverview = async () => {
    const res = await getOverviewApi();
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setTotalBudget(res.netBudgetAmount);
      setTotalSpend(res.netSpendingAmount);
      setNumOfBudgets(res.netBudgets);
    }
  };

  const getBarChartData = async () => {
    const res = await getBarChartDataApi();
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setBarChartData({
        names: res.budgetNames,
        spentAmounts: res.spentAmounts,
        remainingAmounts: res.remainingAmounts,
      });
    }
  };

  const getLatestBudgets = async () => {
    const res = await getLatestBudgetsApi();
    if (!res.success) {
      dispatch(res.message);
    } else {
      setLatestBudgets(res.budgets);
    }
  };

  const getLatestExpenses = async () => {
    const res = await getLatestExpensesApi();
    if (!res.success) {
      dispatch(res.message);
    } else {
      setLatestExpenses(res.last3Expenses);
    }
  };

  useEffect(() => {
    getOverview();
    getBarChartData();
    getLatestBudgets();
    getLatestExpenses();
  }, []);

  return (
    <div className="stats">
      <OverviewCard
        heading={"Total Budget"}
        text={`$${totalBudget}`}
        icon={<BudgetIcon className={"w-8 h-8 text-gray-900"} />}
      />
      <OverviewCard
        heading={"Total Spend"}
        text={`$${totalSpend}`}
        icon={<ExpenseIcon className={"w-8 h-8 text-gray-900"} />}
      />
      <OverviewCard
        heading={"Number of Budgets"}
        text={numOfBudgets}
        icon={<NumberIcon className={"w-8 h-8 text-gray-900"} />}
      />
      <div className="p-4 w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-2/3 flex flex-col gap-5">
          <StackedBarchart barChartData={barChartData} />
          {latestExpenses && (
            <div>
              <h1 className="text-xl text-gray-900 font-semibold w-[90%] mx-auto mb-2">
                Latest Expenses
              </h1>
              <ExpenseTable
                expenses={latestExpenses}
                setExpenses={setLatestExpenses}
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-1/3">
          {latestBudgets && (
            <div>
              <h1 className="text-xl text-gray-900 font-semibold mb-2">
                Latest Budgets
              </h1>
              {latestBudgets.map((latestBudget) => (
                <div
                  className="flex flex-col gap-2"
                  key={latestBudget.budgetId}
                >
                  <BudgetCard
                    budget={latestBudget}
                    className={"w-full md:w-full lg:w-full"}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
