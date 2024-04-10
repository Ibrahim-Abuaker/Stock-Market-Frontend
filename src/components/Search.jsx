
import { useState } from "react";
import Styles from "./Search.module.css";
import config from "../config/Config";

export default function Search() {
  const [results, setResults] = useState([]);
  const [stock, setStock] = useState(false);

  const searchStock = async (input) => {
    const term = input.target.value;
    if (term.length == 0) {
      setResults([]);
      return;
    }
    const res = await fetch(
      config.twelvedata_url + `/symbol_search?symbol=${term}`,
      {
        headers: {
          Authorization: `apikey ${config.twelvedata_key}`,
        },
      }
    );
    const response = await res.json();
    if (response.data && response.data.length > 0) {
      setResults(response.data.slice(0, 5));
      console.log(response.data);
    }
  };

  return (
    <>
      <h2>Search for stocks</h2>
      <label>
        Enter a stock name:
        <input className="searchbar" name="search" onChange={searchStock} />
      </label>
      <div className={Styles.results}>
        <ul>
          {results.map((el) => (
            <li onClick={() => setStock(el)}>
              {el.symbol} - {el.instrument_name}
            </li>
          ))}
        </ul>
      </div>
      {stock ? (
        <div className="stock">
          <p>
            Symbol:<strong> {stock.symbol}</strong>
          </p>
          <p>
            Company Name:<strong> {stock.instrument_name}</strong>
          </p>
          <p>
            Country:<strong> {stock.country}</strong>
          </p>
        </div>
      ) : null}
    </>
  );
}

//I want to setup the search component to be able to search for stocks.
//I want to create a state variable to store the selected stock.
//I want to save the selected stock and pass it to the StockResult component to display the stock information.
//I want to use the Autocomplete component from the @autocomplete/material-ui library
//to search for stocks and get the options from the stocksOptions array.
//I want to use the TextField component from the @material-ui/core library to display the search input field

//I want to create a function to handle the stock selection and save the selected stock to the state variable.

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