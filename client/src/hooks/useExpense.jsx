import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAllExpenses, updateUserExpensesApi } from "../api/expense.api";
import { setError } from "../redux/slices/error.slice";
import { setSuccess } from "../redux/slices/success.slice";
import { setLoading } from "../redux/slices/loading.slice";

export default function useExpense() {
  const [expenses, setExpenses] = useState([]);
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  async function fetchData() {
    const res = await getUserAllExpenses();
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setExpenses(res.expenses);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedExpense !== null && selectedExpense.change == true) {
      const data = {
        name: selectedExpense.name,
        amount: selectedExpense.amount,
        date: Date.now(),
        budget: selectedExpense.budget,
      };
      dispatch(setLoading(true));
      const res = await updateUserExpensesApi(selectedExpense._id, data);
      if (!res.success) {
        dispatch(setError(res.message));
      } else {
        const updatedExpense = res.updatedExpense;
        setExpenses((prevExpenses) => {
          const filteredExpenses = prevExpenses.filter(
            (expense) => expense._id !== selectedExpense._id
          );
          return [updatedExpense, ...filteredExpenses].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        });
        setSelectedExpense(null);
        dispatch(setSuccess(res.message));
      }
      dispatch(setLoading(false));
    }
    closePopup();
  };

  const openPopup = (expense) => {
    setSelectedExpense(expense);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedExpense(null);
  };
  return {
    expenses,
    showPopup,
    openPopup,
    closePopup,
    selectedExpense,
    setSelectedExpense,
    handleSubmit,
    fetchData
  };
}
