import React, { useEffect, useState } from 'react';
import './Stats.css'; // Assuming you define styles here

const Stats = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);
  const [numOfBudgets, setNumOfBudgets] = useState(0);

  useEffect(() => {
    // Function to fetch data from backend and update state
    const fetchData = async () => {
      try {
        // Fetch total budget, total spend, and number of budgets
        const response = await fetch('/api/overview', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTotalBudget(data.netBudgetAmount);
        setTotalSpend(data.netSpendingAmount);
        setNumOfBudgets(data.netBudgets);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      <div className="stat-card">
        <div className="stat-icon">&#128176;</div> {/* Money bag emoji */}
        <div className="stat-info">
          <p className="stat-title">Total Budget</p>
          <p className="stat-value">${totalBudget}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">&#128221;</div> {/* Memo emoji */}
        <div className="stat-info">
          <p className="stat-title">Total Spend</p>
          <p className="stat-value">${totalSpend}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">&#128221;</div> {/* Memo emoji */}
        <div className="stat-info">
          <p className="stat-title">No. Of Budget</p>
          <p className="stat-value">{numOfBudgets}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
