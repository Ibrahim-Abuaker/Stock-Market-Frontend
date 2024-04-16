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

export default function Home() {
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFav, setSelectedFav] = useState(null);
  const [favorites, setFavorites] = useState([]); // the user's favourites list

  console.log("Here is the new selectedFav value stock", selectedFav);

  // Get the logged in user's favourites when the page loads

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
        <h1>Welcome to the Home Page</h1>
        <p>
          You can check the market news and search for stocks to view their
          price trends
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
              {favorites.length ? (
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
                  "No favourite list yet , you can search for a stock and add it
                  to your favourite list"
                </h2>
              )}
            </tbody>
          </table>
        </div>
        <div className={style.favoritesCharts}>
          {selectedFav && <FavResult selectedFav={selectedFav.stock} />}
        </div>
      </div>
    </div>
  );
}

{
  /* <div className={style.favouriteSection}>
        <h2>Random Stocks</h2>
        <table className={style.tableStyle}>
          <thead>
            <tr className={style.headerRowStyle}>
              <th className={style.headerCellStyle}>Name</th>
              <th className={style.headerCellStyle}>Ticker</th>
              <th className={style.headerCellStyle}>Exchange Market</th>
            </tr>
          </thead>
          <tbody>
            {stockData
              // .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((stock, index) => (
                <tr
                  key={index}
                  className={style.rowStyle}
                  onClick={() => setSelectedFav(stock)}
                >
                  <td className={style.cellStyle}>{stock.name}</td>
                  <td className={style.cellStyle}>{stock.ticker}</td>
                  <td className={style.cellStyle}>{stock.exchangeCode}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div> */
}
