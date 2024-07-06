import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function StackedBarchart({ barChartData }) {
  const data = {
    labels: barChartData.names,
    datasets: [
      {
        label: "Spent",
        data: barChartData.spentAmounts,
        backgroundColor: "#111827",
      },
      {
        label: "Remaining",
        data: barChartData.remainingAmounts,
        backgroundColor: "#D1D5DB",
      },
    ],
  };
  const options = {
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
  return <Bar data={data} options={options}></Bar>;
}
