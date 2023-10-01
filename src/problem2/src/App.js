import "./App.css";
import React, { useState } from "react";
import CurrencySwap from "./components/currencyswap/CurrencySwap";
import FunnyTitle from "./components/FunnyTitle/FunnyTitle";
import { useSelector } from "react-redux";

function App() {
  const [inputAmount, setInputAmount] = useState();
  const [outputAmount, setOutputAmount] = useState();
  const swapFromCurrency = useSelector((state) => state.selectFrom);
  const swapToCurrency = useSelector((state) => state.selectTo);
  const swapFromPriceRate = useSelector((state) => state.priceRateFrom);
  const swapToPriceRate = useSelector((state) => state.priceRateTo);

  const [swapFromValueError, setSwapFromValueError] = useState();
  const [swapToValueError, setSwapToValueError] = useState();

  const inputAttributes = {
    disabled: !swapFromPriceRate || !swapToPriceRate,
    step: "any",
    type: "text",
    pattern: '^[0-9]*[.,]?[0-9]*$',
    inputMode: 'decimal',
    required: true,
    placeholder: "0",
    min: 1
  };

  //inputchange
  const handleInputChange = (event) => {
    var newValue = parseFloat(event.target.value);
    if (isNaN(newValue)) {
      setSwapToValueError('this field is required!')
      newValue = 0;
    }
    else setSwapToValueError(null)
    setInputAmount(newValue);
    //set output value depend on input one
    const convertedValue = (newValue * swapToPriceRate) / swapFromPriceRate;
    setOutputAmount(convertedValue);
  };

  //output change
  const handleOutputChange = (event) => {
    var newValue = parseFloat(event.target.value);
    if (isNaN(newValue)) {
      setSwapFromValueError('this field is required!')
      newValue = 0;
    }
    else setSwapFromValueError(null)
    setOutputAmount(newValue);
    //set input value depend on output one
    const convertedValue = (newValue * swapFromPriceRate) / swapToPriceRate;
    setInputAmount(convertedValue);
  };

  return (
    <div className="App">
      <form className="swap-form" onSubmit={() => alert('submitted')}>
        <FunnyTitle/>
        <CurrencySwap></CurrencySwap>

        <div className={`input-container ${swapFromValueError && 'error'}`}>
          <input
            onChange={handleOutputChange}
            value={outputAmount}
            {...inputAttributes}
          />
          <label>
            {swapFromCurrency && (
              <>
                Amount of <b>{swapFromCurrency} </b>
              </>
            )}
            you pay
          </label>
          <br/>
          { swapFromValueError && <span className="error-message">{swapFromValueError}</span>}
        </div>

        <div className={`input-container ${swapToValueError && 'error'}`}>
          <input
            onChange={handleInputChange}
            value={inputAmount}
            {...inputAttributes}
          />
          <label>
            {swapToCurrency && (
              <>
                Amount of <b>{swapToCurrency} </b>
              </>
            )}
            you receive
          </label>
          <br/>
          { swapToValueError && <span className="error-message">{swapToValueError}</span>}
        </div>

        <button
          disabled={
            !swapFromPriceRate ||
            !swapToPriceRate ||
            !outputAmount ||
            !inputAmount
          }
          className="submit-button"
        >
          CONFIRM SWAP
        </button>
      </form>
    </div>
  );
}

export default App;
