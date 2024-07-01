import React from "react";

export default function EditExpenseModal(props) {
  const { closePopup, selectedExpense, handleSubmit } = props;
  return (
    <div className="popup">
      <div className="popup-content">
        <span className="close" onClick={closePopup}>
          &times;
        </span>
        <h2>Edit Expense</h2>
        <p>
          Name <input type="text" defaultValue={selectedExpense.name} />
        </p>
        <p>
          Amount <input type="number" defaultValue={selectedExpense.amount} />
        </p>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
