import Styles from "./HomeCard.module.css";
import FavBarChart from "./FavBarChart";
import FavLineChart from "./FavLineChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";

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
        <h3> {favInfo.name} </h3>
        <h3 className={Styles.priceContainer}>
          ${pastDay.adjClose}
          <FontAwesomeIcon icon={faCaretUp} style={{ color: "#36aa87" }} />
        </h3>
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
