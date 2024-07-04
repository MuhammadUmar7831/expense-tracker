import React from "react";

export default function AddExpenseModal() {
  return (
    <form className="border p-5 rounded-lg">
      <h2 className="font-bold text-lg">Add Expense</h2>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Name</h2>
        <input
          type="text"
          placeholder="e.g, Home Decor"
          //   value={name}
          //   onChange={(e) => setName(e.target.value)}
          className="border w-full px-3 py-2 rounded-lg"
          required
        />
      </div>
      <div className="mt-2">
        <h2 className="text-black font-medium my-1">Expense Amount</h2>
        <input
          type="number"
          placeholder="e.g, 1000$"
          //   value={amount}
          //   onChange={(e) => setAmount(e.target.value)}
          className="border w-full px-3 py-2 rounded-lg"
          min={0}
          required
        />
      </div>
      <button
        // disabled={!(name && amount)}
        // onClick={handleSubmit}
        type="submit"
        className="mt-3 w-full bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        Add new Expense
      </button>
    </form>
  );
}
