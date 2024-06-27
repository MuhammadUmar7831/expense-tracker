import React from 'react';

const Expense = () => {
  return (
    <table bgcolor='black'>
      <tr bgcolor="pink">
        <th>Name</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
      <tr bgcolor="lightgray">
        <td>Muntaha</td>
        <td>500$</td>
        <td>27/06/2024</td>

      </tr>

      <tr bgcolor="lightgray">
        <td>Yaseen</td>
        <td>100$</td>
        <td>25/06/2004</td>

      </tr>

      <tr bgcolor="lightgray">
        <td>Umar</td>
        <td>500$</td>
        <td>30/06/2004</td>

      </tr>

      <tr bgcolor="lightgray">
        <td>Mubasher</td>
        <td>50$</td>
        <td>27/07/2004</td>

      </tr>

      <tr bgcolor="lightgray">
        <td>Ali</td>
        <td>500$</td>
        <td>20/06/2004</td>

      </tr>
    </table>
  );
};

export default Expense;