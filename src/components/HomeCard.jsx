import Styles from "./HomeCard.module.css";
import { Bar, Line } from "react-chartjs-2";
import { Card, Grid } from "@material-ui/core";
import FavBarChart from "./FavBarChart";
import FavLineChart from "./FavLineChart";

const HomeCard = ({
  favInfo,
  price,
  pastDay,
  pastMonth,
  duration,
  pastTwoYears,
  sixMonthAverages,
}) => {
  console.log("Here is the stock info from HomeCard", favInfo);
  console.log("Here is the pastDay from HomeCard", pastDay);
  console.log("Here is the pastMonth from HomeCard", pastMonth);
  console.log("Here is the price from HomeCard", price);
  console.log("Here is the sixMonthAverages from HomeCard", sixMonthAverages);
  console.log("Here is the pastTwoYears from HomeCard", pastTwoYears);
  console.log("Here is the duration from HomeCard", duration);

  // const LineChartCard = () => {
  //   return (
  //     <Grid
  //       item
  //       xs={12}
  //       sm={7}
  //       component={Card}
  //       className={Styles.card}
  //       style={{ minHeight: "350px" }}
  //     >
  //       <LineChart
  //         pastDataPeriod={pastDataPeriod}
  //         favInfo={favInfo}
  //         duration={duration}
  //       />
  //     </Grid>
  //   );
  // };

  // const LineChart = () => {
  //   const formatDate = (date) => {
  //     var d = new Date(date),
  //       month = "" + (d.getMonth() + 1),
  //       day = "" + d.getDate();

  //     if (month.length < 2) month = "0" + month;
  //     if (day.length < 2) day = "0" + day;

  //     return [month, day].join("-");
  //   };

  //   const lineChart =
  //     pastDataPeriod.length ? (
  //       <Line
  //         data={{
  //           labels: pastDataPeriod.map(({ date }, i) => formatDate(date)),
  //           datasets: [
  //             {
  //               data: pastDataPeriod.map(({ adjClose }) => adjClose),
  //               label: "Price",
  //               borderColor: "rgba(0, 0, 255, 0.5)",
  //               fill: true,
  //               backgroundColor: "rgba(116, 185, 255, 0.2)",
  //             },
  //           ],
  //         }}
  //         options={{
  //           maintainAspectRatio: false,
  //           elements: {
  //             point: {
  //               radius: 2,
  //             },
  //           },
  //           legend: { display: false },
  //           layout: {
  //             padding: {
  //               left: 20,
  //               right: 20,
  //               top: 15,
  //               bottom: 0,
  //             },
  //           },
  //           title: {
  //             display: true,
  //             text: `Adjusted closing stock price of ${favInfo.ticker} over the past ${duration}`,
  //             position: "bottom",
  //           },
  //           animation: {
  //             duration: 2000,
  //           },
  //         }}
  //       />
  //     ) : null;

  //   return lineChart;
  // };

  //optional separate jsx component
  // const BarChartCard = () => {
  //   return (
  //     <Grid item xs={12} sm component={Card} className={Styles.card}>
  //       <BarChart sixMonthAverages={sixMonthAverages} favInfo={favInfo} />
  //     </Grid>
  //   );
  // };

  // const BarChart = () => {
  //   const monthNames = [
  //     "Jan",
  //     "Feb",
  //     "Mar",
  //     "Apr",
  //     "May",
  //     "June",
  //     "July",
  //     "Aug",
  //     "Sep",
  //     "Oct",
  //     "Nov",
  //     "Dec",
  //   ];

  //   const barChart = sixMonthAverages ? (
  //     <Bar
  //       data={{
  //         labels: sixMonthAverages.map(({ month }) => monthNames[month]),
  //         datasets: [
  //           {
  //             label: "Price",
  //             backgroundColor: "rgba(0, 0, 255, 0.3)",
  //             data: sixMonthAverages.map(({ value }) => value),
  //           },
  //         ],
  //       }}
  // options={{
  //   maintainAspectRatio: false,
  //   scales: {
  //     y: {
  //       beginAtZero: true,
  //     },
  //   },
  //   legend: { display: false },
  //   layout: {
  //     padding: {
  //       left: 10,
  //       right: 10,
  //       top: 15,
  //       bottom: 0,
  //     },
  //   },
  //   title: {
  //     display: true,
  //     text: `Average closing price per month of ${favInfo.ticker} over the past 6 months`,
  //     position: "bottom",
  //   },
  //   animation: {
  //     duration: 2000,
  //   },
  // }}
  //     />
  //   ) : null;

  //   return barChart;
  // };

  return (
    <div className={Styles.cardContent}>
      <div className={Styles.namePrice}>
        {" "}
        <h2> {favInfo.name} </h2>
        <h2>{pastDay.adjClose}</h2>
      </div>{" "}
      <div className={Styles.charts}>
        <div className={Styles.lineChart}>
          {" "}
          <FavLineChart
            pastTwoYears={pastTwoYears}
            favInfo={favInfo}
            duration={duration}
          />
        </div>
        <div className={Styles.barChart}>
          {/* <FavBarChart sixMonthAverages={sixMonthAverages} favInfo={favInfo} /> */}
        </div>
      </div>
      <div className={Styles.description}>
        <p>{favInfo.description}</p>
      </div>
    </div>
  );
};
export default HomeCard;
