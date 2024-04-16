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

const FavLineChart = ({ pastTwoYears, favInfo, duration }) => {
  console.log("Here is the pastDataPeriod", pastTwoYears);
  console.log("Here is the favInfo", favInfo);
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
    pastTwoYears && pastTwoYears.length
      ? {
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
      : null;

  //   const options = {
  //     maintainAspectRatio: false,
  //     elements: {
  //       point: {
  //         radius: 2,
  //       },
  //     },
  //     legend: { display: false },
  //     layout: {
  //       padding: {
  //         left: 20,
  //         right: 20,
  //         top: 15,
  //         bottom: 0,
  //       },
  //     },
  //     title: {
  //       display: true,
  //       text: `Adjusted closing stock price of ${favInfo.ticker} over the past ${duration}`,
  //       position: "bottom",
  //     },
  //     animation: {
  //       duration: 2000,
  //     },
  //   };
  console.log("Here is the lineChartData", lineChartData);
  return (
    <>
      <Line options={options} data={lineChartData} />
    </>
  );
};

export default FavLineChart;
