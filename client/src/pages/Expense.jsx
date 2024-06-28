import React from "react";
import "../styles/expense.css";

const Expense = () => {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Muntaha</td>
          <td>500$</td>
          <td>27/06/2024</td>
        </tr>

        <tr>
          <td>Yaseen</td>
          <td>100$</td>
          <td>25/06/2004</td>
        </tr>

        <tr>
          <td>Umar</td>
          <td>500$</td>
          <td>30/06/2004</td>
        </tr>

        <tr>
          <td>Mubasher</td>
          <td>50$</td>
          <td>27/07/2004</td>
        </tr>

        <tr>
          <td>Ali</td>
          <td>500$</td>
          <td>20/06/2004</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Expense;
