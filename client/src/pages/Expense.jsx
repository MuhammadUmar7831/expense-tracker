import React from "react";
import "../styles/expense.css";

const Expense = () => {

  const expenses = [
    {
      _id: "667c2aab83f80556039adeb1",
      name: "Bread",
      amount: 50,
      date: "2024-06-01",
      budget: "667c291183f80556039adea3",
    },
    {
      _id: "667c2aab83f80556039adeb2",
      name: "Milk",
      amount: 30,
      date: "2024-06-05",
      budget: "667c291183f80556039adea3",
    },
    {
      _id: "667c2aea83f80556039adeb4",
      name: "July Rent",
      amount: 1000,
      date: "2024-07-01",
      budget: "667c291183f80556039adea4",
    },
    {
      _id: "667c2b6083f80556039adeba",
      name: "JoyLand Tickets",
      amount: 50,
      date: "2024-06-10",
      budget: "667c291183f80556039adea5",
    },
    {
      _id: "667c2b6083f80556039adebb",
      name: "Netflix Subscription",
      amount: 30,
      date: "2024-06-15",
      budget: "667c291183f80556039adea5",
    },
    {
      _id: "667c2b6083f80556039adebc",
      name: "Cinema",
      amount: 60,
      date: "2024-06-20",
      budget: "667c291183f80556039adea5",
    },
    {
      _id: "667c2bb283f80556039adebe",
      name: "Bulb Replacement",
      amount: 50,
      date: "2024-06-05",
      budget: "667c291183f80556039adea6",
    },
    {
      _id: "667c2bb283f80556039adebf",
      name: "Fan Repair",
      amount: 100,
      date: "2024-06-15",
      budget: "667c291183f80556039adea6",
    },
    {
      _id: "667c2bf283f80556039adec1",
      name: "Van Fee",
      amount: 50,
      date: "2024-06-10",
      budget: "667c291183f80556039adea7",
    },
    {
      _id: "667c2bf283f80556039adec2",
      name: "Fuel",
      amount: 50,
      date: "2024-06-20",
      budget: "667c291183f80556039adea7",
    },
    {
      _id: "667c2c1983f80556039adec4",
      name: "Jubilee Insurance Installment",
      amount: 200,
      date: "2024-06-15",
      budget: "667c291183f80556039adea8",
    },
    {
      _id: "667c2c6983f80556039adec6",
      name: "Air Ticket",
      amount: 150,
      date: "2024-06-05",
      budget: "667c291183f80556039adeaa",
    },
    {
      _id: "667c2c6983f80556039adec7",
      name: "Hotel Rent",
      amount: 100,
      date: "2024-06-15",
      budget: "667c291183f80556039adeaa",
    },
    {
      _id: "667c2c6983f80556039adec8",
      name: "Museum Ticket",
      amount: 50,
      date: "2024-06-20",
      budget: "667c291183f80556039adeaa",
    },
    {
      _id: "667c2ca483f80556039adeca",
      name: "Foodie Moodie Visit",
      amount: 80,
      date: "2024-06-10",
      budget: "667c291183f80556039adeab",
    },
    {
      _id: "667c2ca483f80556039adecb",
      name: "Golden Fork Visit",
      amount: 70,
      date: "2024-06-20",
      budget: "667c291183f80556039adeab",
    },
    {
      _id: "667c2ccc83f80556039adecd",
      name: "Inhaler",
      amount: 150,
      date: "2024-06-05",
      budget: "667c291183f80556039adeac",
    },
    {
      _id: "667c2ccc83f80556039adece",
      name: "Insulin Syringe",
      amount: 100,
      date: "2024-06-15",
      budget: "667c291183f80556039adeac",
    },
    {
      _id: "667c2cf483f80556039aded0",
      name: "Tuition Fee",
      amount: 300,
      date: "2024-06-10",
      budget: "667c291183f80556039adead",
    },
    {
      _id: "667c2cf483f80556039aded1",
      name: "Admission Fee",
      amount: 100,
      date: "2024-06-20",
      budget: "667c291183f80556039adead",
    },
    {
      _id: "667c2d3d83f80556039aded3",
      name: "Protein",
      amount: 50,
      date: "2024-06-05",
      budget: "667c291183f80556039adeae",
    },
    {
      _id: "667c2d3d83f80556039aded4",
      name: "Fruit",
      amount: 30,
      date: "2024-06-10",
      budget: "667c291183f80556039adeae",
    },
    {
      _id: "667c2d3d83f80556039aded5",
      name: "Dumbbells",
      amount: 20,
      date: "2024-06-15",
      budget: "667c291183f80556039adeae",
    },
  ];
  const formatDate = (dateStr) => {
    const options = { month: "long", year: "numeric", day: "numeric" };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", options);
  };
  return (
    <table className="expense-table" >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {
          expenses.map((row,i)=>(
            <tr>
              <td>{row.name}</td>
              <td>{row.amount}</td>
              <td>{formatDate(row.date)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Expense;
