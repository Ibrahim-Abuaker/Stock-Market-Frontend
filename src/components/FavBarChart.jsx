import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const FabBarChart = ({ sixMonthAverages, favInfo }) => {
  console.log("Here is the sixMonthAverages", sixMonthAverages);
  console.log("Here is the favInfo", favInfo);
  const options = {};
  const data = {};

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const barChartData =
    sixMonthAverages && sixMonthAverages.length ? (
      {
        labels: sixMonthAverages.map(({ month }) => months[month]),
        datasets: [
          {
            data: sixMonthAverages.map(({ value }) => value),
            label: "Average Stock Price",
            backgroundColor: "rgba(0, 0, 255, 0.3)",
          },
        ],
      }
    ) : (
      <h2>No Enough Data For This Stock</h2>
    );
  console.log("Here is the barChartData", barChartData);
  return (
    <div>
      <Bar options={options} data={barChartData} />
    </div>
  );
};
export default FabBarChart;
