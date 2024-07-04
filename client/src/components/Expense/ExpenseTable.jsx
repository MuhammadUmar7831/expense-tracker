import React, { useState } from "react";
import EditIcon from "../../interface/Svgs/EditIcon";
import DeleteIcon from "../../interface/Svgs/DeleteIcon";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/slices/loading.slice";
import { deleteUserExpensesApi } from "../../api/expense.api";
import { setError } from "../../redux/slices/error.slice";
import { setSuccess } from "../../redux/slices/success.slice";
import DeleteModal from "../../interface/DeleteModal";

export default function ExpenseTable({ expenses, setExpenses, openPopup }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteExpense = async () => {
    dispatch(setLoading(true));
    const res = await deleteUserExpensesApi(deleteModalOpen._id);
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setExpenses((prevExpenses) => {
        return prevExpenses.filter(
          (expense) => expense._id !== deleteModalOpen._id
        );
      });
      dispatch(setSuccess(res.message));
    }
    setDeleteModalOpen(false);
    dispatch(setLoading(false));
  };

  const formatDate = (dateStr) => {
    const options = { month: "long", year: "numeric", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((row, i) => (
            <tr key={row._id}>
              <td>{row.name}</td>
              <td>{row.amount}</td>
              <td>{formatDate(row.date)}</td>
              <td className="flex gap-2">
                <button className="editicon" onClick={() => openPopup(row)}>
                  <EditIcon />
                </button>
                <button
                  className="hover:text-red-600"
                  onClick={() => setDeleteModalOpen(row)}
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteModalOpen && (
        <DeleteModal
          confirmClick={deleteExpense}
          cancelClick={() => setDeleteModalOpen(false)}
        />
      )}
    </>
  );
}
