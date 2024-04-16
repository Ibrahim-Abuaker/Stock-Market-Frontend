import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale } from "chart.js";

Chart.register(LinearScale, CategoryScale);

const FavBarChart = ({ sixMonthAverages, favInfo }) => {
  console.log("Here is the sixMonthAverages", sixMonthAverages);
  const monthNames = [
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

  // Assuming sixMonthAverages is an array of objects like { month: 'Jan', value: 100 }
  const labels = sixMonthAverages.map(({ month }) => monthNames[month]);
  const data = sixMonthAverages.map(({ value }) => value);

  const chartData = {
    label: labels,
    datasets: [
      {
        label: "Six Month Averages",
        data: data,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default FavBarChart;
