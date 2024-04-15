import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import config from "../config/Config";
import HomeCard from "../components/HomeCard";
import Styles from "./FavResult.module.css";

const FavResult = (selectedFav) => {
  console.log("favstock from FavResult line 8", selectedFav);
  console.log(
    "Favstock ticker from FavResult line 13",
    selectedFav.selectedFav.ticker
  );
  const [favInfo, setFavInfo] = useState();
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const [sixMonthAverages, setSixMonthAverages] = useState();
  const [pastDay, setPastDay] = useState();
  const [pastMonth, setPastMonth] = useState();
  const [pastTwoYears, setPastTwoYears] = useState();
  const ticker = selectedFav.selectedFav.ticker;
  const [isLoading, setIsLoading] = useState(false);

  //..............................................

  //get fav stock info
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
        const favStockData = await res.json();
        setFavInfo(favStockData.data);
        console.log(
          "Here is the favourite stock data line 39",
          favStockData.data
        );
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
        const favHistoricalData = await res.json();
        console.log("Here is the favourite historical data", favHistoricalData);
        setSixMonthAverages(favHistoricalData.sixMonthAverages);
        // console.log(
        //   "Here is the Avg six Month",
        //   favHistoricalData.sixMonthAverages
        // );
        setPastDay(favHistoricalData.pastDay);
        //console.log("Here is the pastDay", favHistoricalData.pastDay);
        setPastMonth(favHistoricalData.pastMonth);
        //console.log("Here is the pastMonth", favHistoricalData.pastMonth);
        setPastTwoYears(favHistoricalData.pastTwoYears);
        //console.log("Here is the pastTwoYears", favHistoricalData.pastTwoYears);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    // if (token || !token) {
    getHistoricalData();
    // }
  }, [selectedFav]);
  console.log("HERE is the fav stock info line 89", favInfo);

  return (
    <div className={Styles.root}>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : favInfo ? (
        <div className={Styles.favInfoCard}>
          {favInfo && pastDay && (
            <HomeCard favInfo={favInfo} price={pastDay.adjClose} />
          )}
        </div>
      ) : (
        <h1>No stock selected</h1>
      )}
    </div>
  );
};
export default FavResult;
