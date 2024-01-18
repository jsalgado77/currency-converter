import React from 'react'

export default function CurrencyRow(props) {
  const {
    currencyOptions,
    currencyFullNames,
    selectedCurrency,
    onChangeCurrency,
    onChangeAmount,
    amount
  } = props
  return (
    <div className="currency-row">
      <input type="number" className="input" value={amount} onChange={onChangeAmount} />
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option, index) => (
          <option key={`${option}_${index}`} value={option}>
            {currencyFullNames[option] || option}
          </option>
        ))}
      </select>
    </div>
  )
}