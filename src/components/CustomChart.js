import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"
import { CryptoState } from "../CryptoContext"
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  pointBorderWidth: 0,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
    },
  },
}

const CustomChart = ({ chartData, hoursFormat, dateFormat, timeChart }) => {
  const { currency } = CryptoState()

  const labels =
    timeChart === "1"
      ? chartData.map((chart) => hoursFormat(chart[0]))
      : chartData.map((chart) => dateFormat(chart[0]))
  const data = {
    labels,
    datasets: [
      {
        label: `Price (${
          timeChart === "1"
            ? "Past 1 Days"
            : timeChart === "30"
            ? "Past 30 Days"
            : timeChart === "90"
            ? "Past 90 Days"
            : "Past 365 Days"
        }) in ${currency.toUpperCase()}`,
        data: chartData.map((chart) => chart[1]),
        borderColor: "gold",
      },
    ],
  }
  return <Line options={options} data={data} />
}

export default CustomChart
