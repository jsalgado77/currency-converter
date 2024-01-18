import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'
import image from './exchange.png'

const BASE_URL = 'https://api.exchangeratesapi.io/v1/latest?access_key=584dc88718833e72b99791883b0c61e8'
const NAME_URL = 'https://api.exchangeratesapi.io/v1/symbols?access_key=584dc88718833e72b99791883b0c61e8'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [currencyFullNames, setCurrencyFullNames] = useState({});
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = (amount * exchangeRate).toFixed(2);
  } else {
    toAmount = amount
    fromAmount = (amount / exchangeRate).toFixed(2);
  }

  useEffect(() => {
    // Fetch currency symbols (full names) and exchange rates in parallel
    Promise.all([
      fetch(BASE_URL).then((res) => res.json()),
      fetch(NAME_URL).then((res) => res.json()),
    ])
      .then(([exchangeRatesData, symbolsData]) => {
        const firstCurrency = Object.keys(exchangeRatesData.rates)[0];
        setCurrencyOptions([exchangeRatesData.base, ...Object.keys(exchangeRatesData.rates)]);
        setCurrencyFullNames({
          ...symbolsData.symbols,
          [exchangeRatesData.base]: 'United States Dollar', // Add the full name for the base currency
        });
        setFromCurrency(exchangeRatesData.base);
        setToCurrency(firstCurrency);
        setExchangeRate(exchangeRatesData.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}&base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  return (
    <>
    <div className='app-container'>
      <div className="header-container">
        <img src={image} alt='Currency Converter' className='icon'/>
        <h1>Currency Converter</h1>
      </div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        currencyFullNames={currencyFullNames}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount.toString()}
      />

      <CurrencyRow
        currencyOptions={currencyOptions}
        currencyFullNames={currencyFullNames}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount.toString()}
      />
    </div>
    </>
  );
}

export default App;
