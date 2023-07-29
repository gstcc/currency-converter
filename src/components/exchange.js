import { EXCHANGE_API_URL } from "../constants";
import React, { useState } from 'react';
import './exchange.css';

const Exchange = ({ data }) => {
  // State to store the input value for conversion
  const [numberValue, setNumberValue] = useState('');
  
  // State to store the converted amount
  const [convertedAmount, setConvertedAmount] = useState('');

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    // Ensure only numeric values are accepted
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    setNumberValue(numericValue);
  };

  // Function to fetch the converted currency data
  const getCurrency = () => {
    const request = new XMLHttpRequest();
    request.open('GET', `${EXCHANGE_API_URL}/${data.mode}?from=${data.from}&to=${data.to}&amount=${numberValue}&places=2`);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      const response = request.response;
      setConvertedAmount(response.result);
    };
  };

  return (
    <div className="Exchange">
      <div>
        <label> Enter the total amount to be converted:</label>
        {/* Input field for the amount */}
        <input
          type="number"
          value={numberValue}
          onChange={handleInputChange}
        />
      </div>
      {/* Button to initiate conversion */}
      <button className="button" onClick={getCurrency}>
        {data.mode}
      </button>
      {/* Display the converted amount if all required data is available */}
      {numberValue && data.from && convertedAmount && data.to && (
        <h1>
          {numberValue} {data.from} is {convertedAmount} {data.to}
        </h1>
      )}
    </div>
  );
};

export default Exchange;
