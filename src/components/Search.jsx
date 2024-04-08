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
