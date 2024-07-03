import React from "react";

export default function EditExpenseModal(props) {
  const { closePopup, selectedExpense, handleSubmit } = props;

  const handleOuterClick = (e) => {
    if (e.target.className === "popup") {
      closePopup();
    }
  };

  return (
    <div className="popup" onClick={handleOuterClick}>
      <div className="popup-content">
        <span className="close" onClick={closePopup}>
          &times;
        </span>
        <h2>Edit Expense</h2>
        <p>
          Name <input type="text" defaultValue={selectedExpense.name} />
        </p>
        <p>
          Amount <input type="number" min="0" defaultValue={selectedExpense.amount} onKeyPress={(e) => e.charCode === 45 && e.preventDefault()}/>
        </p>
        <button onClick={handleSubmit}>Update Expense</button>
      </div>
      
    </div>
  );
}
