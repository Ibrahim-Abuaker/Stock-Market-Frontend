import Styles from "./InfoCard.module.css";
import SearchLineChart from "./SearchLineChart";
import SearchBarChart from "./SearchBarChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
const InfoCard = ({
  stockInfo,
  price,
  pastDay,
  pastMonth,
  duration,
  pastTwoYears,
  sixMonthAverages,
}) => {
  console.log("stockInfo from InfoCard", stockInfo);
  console.log("pastDay from InfoCard", pastDay);
  console.log("pastMonth from InfoCard", pastMonth);
  console.log("price from InfoCard", price);
  console.log("sixMonthAverages from InfoCard", sixMonthAverages);
  console.log("pastTwoYears from InfoCard", pastTwoYears);
  console.log("duration from InfoCard", duration);
  //#63E6BE
  return (
    <div className={Styles.cardContent}>
      <div className={Styles.namePrice}>
        <h2>
          ${price}{" "}
          <FontAwesomeIcon icon={faCaretUp} style={{ color: "#36aa87" }} />
        </h2>
      </div>
      <div className={Styles.chartsDescription}>
        <div className={Styles.barChart}>
          <SearchBarChart
            sixMonthAverages={sixMonthAverages}
            stockInfo={stockInfo}
          />
        </div>
        <div className={Styles.description}>
          <p>{stockInfo.description}</p>
        </div>
      </div>
      <div className={Styles.lineChart}>
        {" "}
        <SearchLineChart
          pastTwoYears={pastTwoYears}
          stockInfo={stockInfo}
          duration={duration}
        />
      </div>
    </div>
  );
};
export default InfoCard;
