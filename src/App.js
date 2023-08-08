import React, { useState } from 'react';
import Exchange from './components/exchange';
import SearchBar from './components/search';
import Historical from './components/historical';
import './App.css';

function App() {
  // State to track the selected currency for conversion
  const [currencyFrom, setCurrencyFrom] = useState('');
  const [currencyTo, setCurrencyTo] = useState('');
  const [swap, setSwap] = useState(false);

  // Function to handle changes in the search bars
  const handleSearchChange = ({ sender, option }) => {
    if (sender === 'from') {
      setCurrencyFrom(option);
    } else {
      setCurrencyTo(option);
    }
  };

  const handleOnClick = () => {
    const currencyToTemp = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(currencyToTemp);
    setSwap(true)
  }

  return (
    <div className="App">
      {/* Search Bars */}
      <div className='SearchBars'>
        {/* Search Bar for currency to convert from */}
        <SearchBar
          placeholder={{ data: "Search for currency to convert from" }}
          onSearchChange={handleSearchChange}
          sender={"from"}
          swap={swap}
          currencyToSwap={currencyFrom}
        />
        <img className="switch"src='two-way-arrows.png' alt='swap' onClick={handleOnClick}/>
        {/* Search Bar for currency to convert to */}
        <SearchBar
          placeholder={{ data: "Search for currency to convert to" }}
          onSearchChange={handleSearchChange}
          sender={"to"}
          swap={swap}
          currencyToSwap={currencyTo}
        />
      </div>
      {/* Exchange Component */}
      <div className='Button'>
        <Exchange 
          data={ { from: currencyFrom, to: currencyTo, mode: 'convert' } }          
        />
      </div>
      <div className="Historical">
        <Historical currencies={ {from: currencyFrom, to: currencyTo} }/>
      </div>
    </div>
  );
}

export default App;
