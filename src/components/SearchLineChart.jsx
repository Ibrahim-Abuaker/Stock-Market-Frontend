import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SearchLineChart = ({ pastTwoYears, stockInfo, duration }) => {
  console.log("Here is the pastDataPeriod", pastTwoYears);
  console.log("Here is the favInfo", stockInfo);
  console.log("Here is the duration", duration);

  const options = {};
  const data = {};

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day].join("-");
  };
  const lineChartData =
    pastTwoYears && pastTwoYears.length ? (
      {
        labels: pastTwoYears.map(({ date }, i) => formatDate(date)),
        datasets: [
          {
            data: pastTwoYears.map(({ adjClose }) => adjClose),
            label: "Price",
            borderColor: "#3e95cd",
            backgroundColor: "rgba(75,192,192,0.6)",
          },
        ],
      }
    ) : (
      <h2>No Enough Data For This Stock</h2>
    );
  console.log("Here is the lineChartData", lineChartData);
  return (
    <>
      <Line options={options} data={lineChartData} />
    </>
  );
};

export default SearchLineChart;
