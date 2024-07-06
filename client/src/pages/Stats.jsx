import React, { useEffect } from "react";
import OverviewCard from "../components/Stats/OverviewCard";
import BudgetIcon from "../interface/Svgs/BudgetIcon";
import ExpenseIcon from "../interface/Svgs/ExpenseIcon";
import NumberIcon from "../interface/Svgs/NumberIcon";
import StackedBarchart from "../components/Stats/StackedBarchart";
import BudgetCard from "../components/Budget/BudgetCard";
import ExpenseTable from "../components/Expense/ExpenseTable";
import useStats from "../hooks/useStats";
import "../styles/stats.css";
import OverviewCardSkeleton from "../interface/skeletons/OverviewCardSkeleton";
import StackedBarChartSkeleton from "../interface/skeletons/StackedBarChartSkeleton";

const Stats = () => {
  const {
    totalBudget,
    totalSpend,
    numOfBudgets,
    barChartData,
    latestBudgets,
    latestExpenses,
    setLatestExpenses,
    getOverview,
    getBarChartData,
    getLatestBudgets,
    getLatestExpenses,
  } = useStats();
  useEffect(() => {
    getOverview();
    getBarChartData();
    getLatestBudgets();
    getLatestExpenses();
  }, []);

  return (
    <div className="stats">
      {totalBudget !== false ? (
        <OverviewCard
          heading={"Total Budget"}
          text={`$${totalBudget}`}
          icon={<BudgetIcon className={"w-8 h-8 text-gray-900"} />}
        />
      ) : (
        <OverviewCardSkeleton />
      )}
      {totalSpend !== false ? (
        <OverviewCard
          heading={"Total Spend"}
          text={`$${totalSpend}`}
          icon={<ExpenseIcon className={"w-8 h-8 text-gray-900"} />}
        />
      ) : (
        <OverviewCardSkeleton />
      )}
      {numOfBudgets !== false ? (
        <OverviewCard
          heading={"Number of Budgets"}
          text={numOfBudgets}
          icon={<NumberIcon className={"w-8 h-8 text-gray-900"} />}
        />
      ) : (
        <OverviewCardSkeleton />
      )}
      <div className="p-4 w-full flex flex-col md:flex-row gap-5">
        <div className="w-full md:w-2/3 flex flex-col gap-5">
          {barChartData !== false ? (
            <StackedBarchart barChartData={barChartData} />
          ) : (
            <StackedBarChartSkeleton />
          )}
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
                <div className="flex flex-col gap-2" key={latestBudget._id}>
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
