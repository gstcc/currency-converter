import './App.css';
import Exchange from './components/exchange';
import SearchBar from './components/search';
import React, { useState } from 'react';


function App() {

  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");

  const data = { "from": currencyFrom, "to": currencyTo, "mode": "convert" };
  const fromMessage = { "data": "Search for currency to convert from" };
  const toMessage = { "data": "Search for currency to convert to" };

  const handleSearchChange = (data) =>{
    if(data.sender=="from"){setCurrencyFrom(data.option)}
    else {setCurrencyTo(data.option)}
  }

  const convert = () => {
    // Swap the values of currencyFrom and currencyTo
    const currencyFromTemp = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyFromTemp);
    
  };

  return (
    <div className="App">
    <h1>Currency Converter</h1>
      <div className='SearchBars'>
        <SearchBar placeholder={fromMessage} onSearchChange={handleSearchChange} sender={"from"}/>
        <SearchBar placeholder={toMessage} onSearchChange={handleSearchChange} sender={"to"} />
      </div>
      <div className='Button'>
        <Exchange data={data}/>
      </div>
    </div>
  );
}

export default App;
