import Styles from "./HomeCard.module.css";
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

  return (
    <div className={Styles.cardContent}>
      <div className={Styles.namePrice}>
        {" "}
        <h2> {favInfo.name} </h2>
        <h2 className={Styles.priceContainer}>
          {pastDay.adjClose}
          <span className={Styles.greenTriangle}></span>
          <span className={Styles.redTriangle}></span>
        </h2>
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
          <FavBarChart sixMonthAverages={sixMonthAverages} favInfo={favInfo} />
        </div>
      </div>
      <div className={Styles.description}>
        <p>{favInfo.description}</p>
      </div>
    </div>
  );
};
export default HomeCard;
