import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import config from "../config/Config";
import InfoCard from "../components/InfoCard";
import Styles from "./StockResult.module.css";
import HashLoader from "react-spinners/HashLoader";

const StockResult = (selectedStock) => {
  // console.log("Here is the selected stock from StockResult", selectedStock);
  // console.log(
  //   "Here is the selected stock ticker from StockResult",
  //   selectedStock.selectedStock.ticker
  // );
  const [stockInfo, setStockInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [sixMonthAverages, setSixMonthAverages] = useState();
  const [pastDay, setPastDay] = useState();
  const [pastMonth, setPastMonth] = useState();
  const [pastTwoYears, setPastTwoYears] = useState();
  const ticker = selectedStock.selectedStock.ticker;
  const [isLoading, setIsLoading] = useState(false);
  const [color, setColor] = useState("#72a6da");

  const override = {
    display: "block",
    margin: "0 auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  //..............................................

  //get stock info
  useEffect(() => {
    const getStockInfo = async () => {
      setIsLoading(true); // Set loading to true at the start of the fetch operation
      try {
        const url = config.base_url + `/api/data/prices/${ticker}`;
        // const url = config.base_url + `/api/data/prices/aapl`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const stockData = await res.json();
        setStockInfo(stockData.data);
        console.log("Here is the stock data line 39", stockData.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set loading to false once the data has been fetched
      }
    };
    // if (token || !token) {
    getStockInfo();
    // }

    //..............................................

    //get historical data
    const getHistoricalData = async () => {
      setIsLoading(true);
      try {
        const url = config.base_url + `/api/data/prices/${ticker}/full`;
        // config.base_url + `/api/data/prices/aapl/full`;
        const res = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const historicalData = await res.json();
        // console.log("Here is the historical data", historicalData);
        setSixMonthAverages(historicalData.sixMonthAverages);
        // console.log(
        //   "Here is the Avg six Month",
        //   historicalData.sixMonthAverages
        // );
        setPastDay(historicalData.pastDay);
        // console.log("Here is the pastDay", historicalData.pastDay);
        setPastMonth(historicalData.pastMonth);
        // console.log("Here is the pastMonth", historicalData.pastMonth);
        setPastTwoYears(historicalData.pastTwoYears);
        // console.log("Here is the pastTwoYears", historicalData.pastTwoYears);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    // if (token || !token) {
    getHistoricalData();
    // }
  }, []);
  // console.log("HERE is the stock historical data", stockInfo);

  return (
    <div className={Styles.root}>
      {isLoading ? (
        <HashLoader
          color={color}
          loading={isLoading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : stockInfo ? (
        <div className={Styles.resultInfoCard}>
          {stockInfo &&
            pastDay &&
            sixMonthAverages &&
            pastMonth &&
            pastTwoYears && (
              <InfoCard
                duration={"2 years"}
                stockInfo={stockInfo}
                pastDay={pastDay}
                price={pastDay.adjClose}
                sixMonthAverages={sixMonthAverages}
                pastMonth={pastMonth}
                pastTwoYears={pastTwoYears}
              />
            )}
        </div>
      ) : (
        <h1>No stock selected</h1>
      )}
    </div>
  );
};
export default StockResult;
