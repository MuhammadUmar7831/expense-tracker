import React, { useState } from 'react';

const Budget = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [budgets, setBudgets] = useState([]);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const saveBudget = (budget) => {
    setBudgets([...budgets, budget]);
  };

  const BudgetDialog = ({ onClose, onSaveBudget }) => {
    const [budgetName, setBudgetName] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);

    // Function to handle creation of budget
    const handleCreateBudget = () => {
      // Validate inputs
      if (budgetName.trim() === '' || budgetAmount.trim() === '') {
        alert('Please enter both budget name and amount.');
        return;
      }

      const amount = parseFloat(budgetAmount);

      // Save budget data
      onSaveBudget({ name: budgetName, amount, spent: 0 });

      // Reset fields after creating budget
      setBudgetName('');
      setBudgetAmount('');

      // Close the dialog
      onClose();
    };

    // Function to validate inputs and enable/disable button
    const validateInputs = () => {
      setIsButtonEnabled(budgetName.trim() !== '' && budgetAmount.trim() !== '');
    };

    // Effect to validate inputs whenever inputs change
    React.useEffect(() => {
      validateInputs();
    }, [budgetName, budgetAmount]);

    return (
      <div className="budget-dialog">
        <h3>Create New Budget</h3>
        <label>
          Budget Name:
          <input
            type="text"
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
            placeholder="Enter budget name"
          />
        </label>
        <label>
          Budget Amount:
          <input
            type="number"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
            placeholder="Enter budget amount"
          />
        </label>
        <button
          onClick={handleCreateBudget}
          disabled={!isButtonEnabled}
          className={isButtonEnabled ? '' : 'disabled'}
        >
          Create Budget
        </button>
      </div>
    );
  };

  const BudgetCard = ({ budget }) => {
    if (!budget) {
      return (
        <div className="budget-card-create-new" onClick={openDialog}>
          + Create New Budget
        </div>
      );
    }

    const { name, amount, spent } = budget;
    const remaining = amount - spent;
    const spentPercentage = (spent / amount) * 100;
    const remainingPercentage = (remaining / amount) * 100;

    return (
      <div className="budget-card">
        <div className="budget-info">
          <div className="budget-name">{name}</div>
          <div className="budget-amount">${amount}</div>
          <div className="item-number">0 Items</div>
        </div>
        <div className="single-bar">
          <div className="spent" style={{ width: `${spentPercentage}%` }}>
            <span className="bar-label">Spent: ${spent}</span>
          </div>
          <div className="remaining" style={{ width: `${remainingPercentage}%` }}>
            <span className="bar-label">Remaining: ${remaining}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .app {
          display: flex;
          flex-direction: column;
          height: 100vh;
          width: 100vw;
          padding-left: 150px;
          box-sizing: border-box;
          overflow: hidden;
          position: relative;
        }

        .main-content {
          flex-grow: 1;
          padding: 20px;
          width: calc(100% - 250px);
          box-sizing: border-box;
        }

        .budgets-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          width: 100%;
        }

        .budget-card {
          background-color: 'white';
          height: 150px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          border-radius: 8px;
          cursor: pointer;
          padding: 10px;
          border: 1px solid #ccc;
        }

        .budget-card-create-new {
          color: #000;
          cursor: pointer;
          text-decoration: underline;
          background-color: #f4f4f4;
          height: 150px;
          align-content:center;
          align-items: center;
          justify-content: space-between;
          border-radius: 8px;
          cursor: pointer;
          border: 1px dashed #ccc;
          padding: 10px;
        }

        .budget-dialog {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .budget-dialog h3 {
          margin-top: 0;
        }

        .budget-dialog label {
          display: block;
          margin-bottom: 10px;
        }

        .budget-dialog input {
          width: calc(100% - 20px);
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .budget-dialog input::placeholder {
          color: #ccc; 
        }

        .budget-dialog button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 10px 20px;
          text-align: center;
          text-decoration: none;
          display: inline-block;
          font-size: 14px;
          margin-top: 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        .budget-dialog button:disabled {
          background-color: #ddd; 
          cursor: not-allowed; 
        }

        .budget-dialog button:hover:disabled {
          background-color: #ddd; 
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4); 
          z-index: 999; 
        }

        .budget-info {
          padding: 10px;
        }

        .budget-info .budget-name {
          font-weight: bold;
          margin-bottom: 5px;
       
        }

        .budget-info .budget-amount {
          color: #666;

        }

        .single-bar {
          width: 100%;
          height: 10px;
          display: flex;
          flex-direction: row;
        }

        .single-bar .spent,
        .single-bar .remaining {
          height: 100%;
          display: block;
          position: relative;
        }

        .single-bar .spent {
          background-color: #ff6347; 
        }

        .single-bar .remaining {
          background-color: #3cb371; 
        }

        .bar-label {
          font-size: 12px;
          color: #666;
          position: absolute;
          top: -20px;
          white-space: nowrap;
        }

        .item-number {
          font-size: 12px;
          color: #666;
         
        }

      `}</style>

      <div className="app">
        <div className="main-content">
          <h2>My Budgets</h2>
          <div className="budgets-grid">
            <BudgetCard /> {/* Render the "Create New Budget" card */}
            {budgets.map((budget, index) => (
              <BudgetCard key={index} budget={budget} />
            ))}
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <>
          <div className="overlay" onClick={closeDialog}></div>
          <BudgetDialog onClose={closeDialog} onSaveBudget={saveBudget} />
        </>
      )}
    </>
  );
};

export default Budget;


































// import React, { useState } from 'react';

// const BudgetDialog = ({ onClose }) => {
//   const [budgetName, setBudgetName] = useState('');
//   const [budgetAmount, setBudgetAmount] = useState('');
//   const [isButtonEnabled, setIsButtonEnabled] = useState(false);

//   // Function to handle creation of budget
//   const handleCreateBudget = () => {
//     // Handle create budget logic here (e.g., API call, state updates)
//     console.log('Creating budget:', { budgetName, budgetAmount });
//     // Reset fields after creating budget
//     setBudgetName('');
//     setBudgetAmount('');
//     // Close the dialog
//     onClose();
//   };

//   // Function to validate inputs and enable/disable button
//   const validateInputs = () => {
//     setIsButtonEnabled(budgetName.trim() !== '' && budgetAmount.trim() !== '');
//   };

//   // Effect to validate inputs whenever inputs change
//   React.useEffect(() => {
//     validateInputs();
//   }, [budgetName, budgetAmount]);

//   return (
//     <div className="budget-dialog">
//       <h3>Create New Budget</h3>
//       <label>
//         Budget Name:
//         <input
//           type="text"
//           value={budgetName}
//           onChange={(e) => setBudgetName(e.target.value)}
//         />
//       </label>
//       <label>
//         Budget Amount:
//         <input
//           type="number"
//           value={budgetAmount}
//           onChange={(e) => setBudgetAmount(e.target.value)}
//         />
//       </label>
//       <button
//         onClick={handleCreateBudget}
//         disabled={!isButtonEnabled}
//         className={isButtonEnabled ? '' : 'disabled'}
//       >
//         Create Budget
//       </button>
//     </div>
//   );
// };

// const Budget = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const openDialog = () => {
//     setIsDialogOpen(true);
//   };

//   const closeDialog = () => {
//     setIsDialogOpen(false);
//   };

//   return (
//     <>
//       <style jsx global>{`
//         body {
//           margin: 0;
//           font-family: Arial, sans-serif;
//         }

//         .app {
//           display: flex;
//           flex-direction: column;
//           height: 100vh;
//           width: 100vw;
//           padding-left: 150px;
//           box-sizing: border-box;
//           overflow: hidden;
//           position: relative;
//         }

//         .main-content {
//           flex-grow: 1;
//           padding: 20px;
//           width: calc(100% - 250px);
//           box-sizing: border-box;
//         }

//         .budgets-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 20px;
//           width: 100%;
//         }

//         .budget-card {
//           background-color: #f4f4f4;
//           height: 150px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 8px;
//           cursor: pointer;
//           border: 1px dashed #ccc;
//         }

//         .budget-card.empty {
//           border: none;
//         }

//         .create-new {
//           color: #000;
//           cursor: pointer;
//           text-decoration: underline;
//         }

//         .budget-dialog {
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background-color: white;
//           padding: 20px;
//           border-radius: 8px;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//           z-index: 1000;
//         }

//         .budget-dialog h3 {
//           margin-top: 0;
//         }

//         .budget-dialog label {
//           display: block;
//           margin-bottom: 10px;
//         }

//         .budget-dialog input {
//           width: calc(100% - 20px);
//           padding: 8px;
//           font-size: 14px;
//           border: 1px solid #ccc;
//           border-radius: 4px;
//         }

//         .budget-dialog button {
//           background-color: #4caf50;
//           color: white;
//           border: none;
//           padding: 10px 20px;
//           text-align: center;
//           text-decoration: none;
//           display: inline-block;
//           font-size: 14px;
//           margin-top: 10px;
//           border-radius: 4px;
//           cursor: pointer;
//         }

//         .budget-dialog button:disabled {
//           background-color: #ddd; 
//           cursor: not-allowed; 
//         }

//         .budget-dialog button:hover:disabled {
//           background-color: #ddd; 
//         }

//         .overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.4); 
//           z-index: 999;
//         }
//       `}</style>

//       <div className="app">
//         <div className="main-content">
//           <h2>My Budgets</h2>
//           <div className="budgets-grid">
//             <div className="budget-card" onClick={openDialog}>
//               <div className="create-new">+ Create New Budget</div>
//             </div>
//             {/* Placeholder for other budget cards */}
//             <div className="budget-card empty"></div>
//             <div className="budget-card empty"></div>
//             <div className="budget-card empty"></div>
//             <div className="budget-card empty"></div>
//             <div className="budget-card empty"></div>
//           </div>
//         </div>
//       </div>

//       {isDialogOpen && (
//         <>
//           <div className="overlay" onClick={closeDialog}></div>
//           <BudgetDialog onClose={closeDialog} />
//         </>
//       )}
//     </>
//   );
// };

// export default Budget;