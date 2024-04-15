import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
//npm i --legacy-peer-deps @autocomplete/material-ui
//npm install --legacy-peer-deps  @material-ui/lab
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Container } from "@material-ui/core";
import StockResult from "../services/StockResult";
import Styles from "./Search.module.css";
// import Favourites from "./Favourites";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../config/Config";
import InfoCard from "./InfoCard";
import Favourites from "./Favorites";

const Search = () => {
  const [value, setValue] = useState(null);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]); // the user's favourites list
  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedFavorite, setSelectedFavorite] = useState([]);

  const handleStockSelection = (event, newValue) => {
    setIsLoading(true);
    if (newValue) {
      setSelectedStock(newValue);
    } else {
      setSelectedStock(null);
    }
    setValue(null);
    setIsLoading(false);
  };

  useEffect(() => {
    const getAllFavourites = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        console.log("token", token);
        const res = await fetch("http://localhost:8090/favorites", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        //if (res.status === 200) {
        console.log("line 49 my favourite : ", data);
        setFavorites(data);
        // } else {
        //   throw new Error(data.message);
        // }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllFavourites();
  }, []);

  console.log("line 62 my selected favourite : ", favorites);

  const addToFavorites = async (selectedFavorite) => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await fetch("http://localhost:8090/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedFavorite),
      });
      const data = await res.json();
      setSelectedFavorite((prevSelectedFavorites = []) => [
        ...prevSelectedFavorites,
        data,
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("line 86 my selected favourite : ", selectedFavorite);

  // useEffect(() => {
  //   const removeFromFavorites = async (favoriteToRemove) => {
  //     if (!token) {
  //       return;
  //     }
  //     try {
  //       const res = await fetch("http://localhost:8090/favourites/remove", {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //         body: JSON.stringify({
  //           stock: stockToRemove,
  //         }),
  //       });
  //       const data = await res.json();
  //       if (res.status === 200) {
  //         setFavourites(
  //           favourites.filter((stock) => stock.name !== stockToRemove.name)
  //         );
  //       } else {
  //         throw new Error(data.message);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   //here I want to run the function to remove the selected
  //   //stock once clicked on the button below

  //   // Call removeFromWatchlist with the stock you want to remove
  //   // removeFromWatchlist(stockToRemove);
  // }, [token, favourites]);

  return (
    <Container className={Styles.searchContainer}>
      <h1>Welcome to the Search Page</h1>
      <Autocomplete
        value={value}
        options={stocksOptions}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for a stock"
            variant="outlined"
          />
        )}
        onChange={handleStockSelection}
        onInputChange={(event, value, reason) => {
          if (reason === "input") {
            setSelectedStock(null);
          }
        }}
      />
      {isLoading ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {selectedStock && (
            <div>
              <h1>
                {selectedStock.name} {selectedStock.ticker}{" "}
              </h1>
            </div>
          )}
          {selectedStock && <StockResult selectedStock={selectedStock} />}
          <button
            onClick={() => {
              addToFavorites(selectedStock);
              console.log("selectedStock", selectedStock);
            }}
          >
            Add to favorite list
          </button>{" "}
        </>
      )}
    </Container>
  );
};
const stocksOptions = [
  { name: "Apple", ticker: "AAPL" },
  { name: "Amazon", ticker: "AMZN" },
  { name: "Google", ticker: "GOOG" },
  { name: "Microsoft", ticker: "MSFT" },
  { name: "Walmart", ticker: "WMT" },
  { name: "Intel", ticker: "INTC" },
  { name: "American Express", ticker: "AXP" },
  { name: "Boeing", ticker: "BA" },
  { name: "Cisco", ticker: "CSCO" },
  { name: "Goldman Sachs", ticker: "GS" },
  { name: "Johson & Johnson", ticker: "JNJ" },
  { name: "Coca-Cola", ticker: "KO" },
  { name: "McDonald's", ticker: "MCD" },
  { name: "Nike", ticker: "NKE" },
  { name: "Procter & Gamble", ticker: "PG" },
  { name: "Verizon", ticker: "VZ" },
  { name: "Salesforce", ticker: "CRM" },
  { name: "Visa", ticker: "V" },
  { name: "UnitedHealth", ticker: "UNH" },
  { name: "IBM", ticker: "IBM" },
  { name: "Chevron", ticker: "CVX" },
];

export default Search;
