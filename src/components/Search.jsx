import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
//npm i --legacy-peer-deps @autocomplete/material-ui
//npm install --legacy-peer-deps  @material-ui/lab
import Autocomplete from "@material-ui/lab/Autocomplete";
import { TextField, Container } from "@material-ui/core";
import StockResult from "./StockResult";
import Styles from "./Search.module.css";
const Search = () => {
  const [selectedStock, setSelectedStock] = useState(null);
  const [value, setValue] = useState(null);
  const { token } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [favourites, setFavourites] = useState([]);

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

  const addToWatchlist = () => {
    setFavourites([...favourites, selectedStock]);
    console.log({ favourites });
  };

  return (
    <Container className={Styles.searchContainer}>
      <Autocomplete
        value={value}
        options={stocksOptions}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} label="Search for stocks" variant="outlined" />
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
        selectedStock && <StockResult selectedStock={selectedStock} />
      )}{" "}
      {selectedStock && (
        <button onClick={addToWatchlist}>Add to watchlist</button>
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
