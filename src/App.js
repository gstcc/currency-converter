import React, { useState } from 'react';
import Exchange from './components/exchange';
import SearchBar from './components/search';
import { currencies } from './constants';
import './App.css';

function App() {
  // State to track the selected currency for conversion
  const [currencyFrom, setCurrencyFrom] = useState('');
  const [currencyTo, setCurrencyTo] = useState('');

  // Function to handle changes in the search bars
  const handleSearchChange = ({ sender, option }) => {
    if (sender === 'from') {
      setCurrencyFrom(option);
    } else {
      setCurrencyTo(option);
    }
  };

  return (
    <div className="App">
      {/* Search Bars */}
      <div className='SearchBars'>
        {/* Search Bar for currency to convert from */}
        <SearchBar
          placeholder={{ data: "Search for currency to convert from" }}
          onSearchChange={handleSearchChange}
          sender={"from"}
          currency={currencyFrom}
        />
        {/* Search Bar for currency to convert to */}
        <SearchBar
          placeholder={{ data: "Search for currency to convert to" }}
          onSearchChange={handleSearchChange}
          sender={"to"}
          currency={currencyTo}
        />
      </div>
      {/* Exchange Component */}
      <div className='Button'>
        <Exchange data={{ from: currencyFrom, to: currencyTo, mode: 'convert' }} />
      </div>
    </div>
  );
}

export default App;
