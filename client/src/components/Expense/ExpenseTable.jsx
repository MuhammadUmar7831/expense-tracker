import React from "react";

export default function ExpenseTable({ expenses }) {
  const formatDate = (dateStr) => {
    const options = { month: "long", year: "numeric", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((row, i) => (
          <tr>
            <td>{row.name}</td>
            <td>{row.amount}</td>
            <td>{formatDate(row.date)}</td>
            <td className="editicon">
              <button onClick={() => openPopup(row)}>
                <EditIcon />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
