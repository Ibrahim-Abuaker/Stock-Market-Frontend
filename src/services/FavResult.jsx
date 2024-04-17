import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import config from "../config/Config";
import HomeCard from "../components/HomeCard";
import Styles from "./FavResult.module.css";
import HashLoader from "react-spinners/HashLoader";

const FavResult = (selectedFav) => {
  console.log("favstock from FavResult line 8", selectedFav.stock);
  console.log(
    "Favstock ticker from FavResult line 13",
    selectedFav.selectedFav.ticker
  );
  const [favInfo, setFavInfo] = useState();
  const { token } = useContext(AuthContext);
  const [sixMonthAverages, setSixMonthAverages] = useState();
  const [pastDay, setPastDay] = useState();
  const [pastMonth, setPastMonth] = useState();
  const [pastTwoYears, setPastTwoYears] = useState();
  const ticker = selectedFav.selectedFav.ticker;
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

  //get fav stock info
  useEffect(() => {
    const getStockInfo = async () => {
      setIsLoading(true);
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
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
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
        console.log(
          "Here is the Avg six Month",
          favHistoricalData.sixMonthAverages
        );
        setPastDay(favHistoricalData.pastDay);
        console.log("Here is the pastDay", favHistoricalData.pastDay);
        setPastMonth(favHistoricalData.pastMonth);
        console.log("Here is the pastMonth", favHistoricalData.pastMonth);
        setPastTwoYears(favHistoricalData.pastTwoYears);
        console.log("Here is the pastTwoYears", favHistoricalData.pastTwoYears);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    // if (token || !token) {
    getHistoricalData();
    // }
  }, [selectedFav]);

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
      ) : favInfo ? (
        <div className={Styles.favInfoCard}>
          {favInfo &&
            pastDay &&
            sixMonthAverages &&
            pastMonth &&
            pastTwoYears && (
              <HomeCard
                duration={"2 years"}
                favInfo={favInfo}
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
export default FavResult;
