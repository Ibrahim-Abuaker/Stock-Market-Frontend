// import NewsFeed from "./NewsFeed";
// import Navbar from "./Navbar";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useContext } from "react";
import { useState, useEffect } from "react";
import config from "../config/Config";
import stockData from "../config/StocksData";
import style from "./Home.module.css";
import FavResult from "../services/FavResult";
import HashLoader from "react-spinners/HashLoader";
// import Favorites from "../assets/Favorites.png";
import logo from "../assets/logo.jpg";

export default function Home() {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFav, setSelectedFav] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [color, setColor] = useState("#72a6da");

  const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

  useEffect(() => {
    const getAllFavourites = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");

        console.log("token", token);
        const res = await fetch(config.base_url + "/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.status === 200) {
          console.log("Home/37 my favourite data: ", data);
          setFavorites(data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllFavourites();
  }, []);

  console.log(
    favorites.length
      ? "Home/53 Here is the user's favourite" + favorites
      : "No favourite list yet"
  );
  console.log("Random Stocks", stockData);
  console.log("the type of StockData", typeof stockData);
  console.log("the selectedFav", selectedFav);

  return (
    <div className={style.container}>
      <div className={style.welcome}>
        <h1>Welcome to InvestoGuide</h1>
        <p>
          Where you can check the market news and search for stocks to view
          their price trends
        </p>
      </div>
      <div className={style.mainContent}>
        <div className={style.favoritesTableBox}>
          <h2>Favorite Stocks</h2>
          <table className={style.favoritesTable}>
            <thead>
              <tr className={style.headerRowStyle}>
                <th className={style.headerCellStyle}>Name</th>
                <th className={style.headerCellStyle}>Ticker</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <HashLoader
                  color={color}
                  loading={isLoading}
                  cssOverride={override}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : favorites.length && token ? (
                (favorites || []).map((favorite, index) => (
                  <tr
                    key={index}
                    className={style.rowStyle}
                    onClick={() => setSelectedFav(favorite)}
                  >
                    <td className={style.cellStyle}>{favorite.stock.name}</td>
                    <td className={style.cellStyle}>{favorite.stock.ticker}</td>
                  </tr>
                ))
              ) : (
                <h2>
                  No favourite list yet, you can login, search for a stock add
                  it to your favourite list.
                </h2>
              )}
            </tbody>
          </table>
        </div>
        <div className={style.favoritesChartsBox}>
          {token && selectedFav ? (
            <div className={style.favoritesCharts}>
              {selectedFav && <FavResult selectedFav={selectedFav.stock} />}
            </div>
          ) : (
            <div className={style.favoritesChartsMsg}>
              <h2>Pick one of your favourite stocks</h2>
              <img src={logo} alt="logo" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
