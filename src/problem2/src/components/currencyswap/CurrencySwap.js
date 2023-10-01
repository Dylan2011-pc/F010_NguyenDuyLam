import React, { useEffect, useState } from "react";
import SwapRate from "../swaprate/SwapRate";
import "./index.css";
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFrom } from '../../redux-store/slices/selectFromSlice';
import { setSelectedTo } from '../../redux-store/slices/selectToSlice';

const CurrencySwap = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const swapFromCurrency = useSelector((state) => state.selectFrom);
  const swapToCurrency = useSelector((state) => state.selectTo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://interview.switcheo.com/prices.json"
        );
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSwapFromCurrencyChange = (event) => {
    dispatch(setSelectedFrom(event.target.value));
  };

  const handleSwapToCurrencyChange = (event) => {
    dispatch(setSelectedTo(event.target.value));
  };

  return (
    <div className="swap-block">
      {/* token to swap */}
      <div className="swap-select">
        <label>Swap From:</label>
        <select value={swapFromCurrency} onChange={handleSwapFromCurrencyChange}
        >
          <option value="">Select a currency</option>
          {data.map((currency, index) => (
            <option key={index} value={currency.currency}>
              {currency.currency}
            </option>
          ))}
        </select>
      </div>

      {/* token swap to*/}
      <div className="swap-select">
        <label>Swap To:</label>
        <select value={swapToCurrency} onChange={handleSwapToCurrencyChange}>
          <option value="">Select a currency</option>
          {data.map((currency, index) => (
            <option key={index} value={currency.currency}>
              {currency.currency}
            </option>
          ))}
        </select>
      </div>
      
      {/* swap rate result */}
      {swapFromCurrency && swapToCurrency && (
        <SwapRate
          from={swapFromCurrency}
          fromRate={
            data.find((currency) => currency.currency === swapFromCurrency)?.price
          }
          to={swapToCurrency}
          toRate={
            data.find((currency) => currency.currency === swapToCurrency)?.price
          }
        ></SwapRate>
      )}
    </div>
  );
};

export default CurrencySwap;
