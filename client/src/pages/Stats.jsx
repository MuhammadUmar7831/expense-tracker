import React, { useEffect, useState } from "react";
import OverviewCard from "../components/Stats/OverviewCard";
import BudgetIcon from "../interface/Svgs/BudgetIcon";
import ExpenseIcon from "../interface/Svgs/ExpenseIcon";
import NumberIcon from "../interface/Svgs/NumberIcon";
import "../styles/Stats.css";

const Stats = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [numOfBudgets, setNumOfBudgets] = useState(0);

  useEffect(() => {
    // Function to fetch data from backend and update state
    const fetchData = async () => {
      try {
        // Fetch total budget, total spend, and number of budgets
        const response = await fetch("/api/overview", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setTotalBudget(data.netBudgetAmount);
        setTotalSpend(data.netSpendingAmount);
        setNumOfBudgets(data.netBudgets);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error or set default values
      }
    };

    fetchData(); // Call the function on component mount

    // Clean up function if needed
    return () => {
      // Any cleanup code here if needed
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div className="stats">
      <OverviewCard
        heading={"Total Budget"}
        text={totalBudget}
        icon={<BudgetIcon className={"w-8 h-8 text-gray-900"} />}
      />
      <OverviewCard
        heading={"Total Spend"}
        text={totalBudget}
        icon={<ExpenseIcon className={"w-8 h-8 text-gray-900"} />}
      />
      <OverviewCard
        heading={"No. Of Budget"}
        text={numOfBudgets}
        icon={<NumberIcon className={"w-8 h-8 text-gray-900"} />}
      />
    </div>
  );
};

export default Stats;
