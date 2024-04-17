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

  return (
    <div className={Styles.cardContent}>
      <div className={Styles.namePrice}>
        <h1>{stockInfo.name}</h1>
        <h2>
          Price: $ {price}{" "}
          <FontAwesomeIcon icon={faCaretUp} style={{ color: "#63E6BE" }} />
        </h2>
      </div>
      <div className={Styles.charts}>
        <div className={Styles.lineChart}>
          {" "}
          <SearchLineChart
            pastTwoYears={pastTwoYears}
            stockInfo={stockInfo}
            duration={duration}
          />
        </div>
        <div className={Styles.barChart}>
          <SearchBarChart
            sixMonthAverages={sixMonthAverages}
            stockInfo={stockInfo}
          />
        </div>
      </div>

      <p>{stockInfo.description}</p>
    </div>
  );
};
export default InfoCard;
