import { EXCHANGE_API_URL } from "../constants";
import React, { useState } from 'react';
import './exchange.css';

const Exchange = ({ data }) => {

  // State to store the input value for conversion
  const [numberValue, setNumberValue] = useState('');
  // State to store the converted amount
  const [convertedAmount, setConvertedAmount] = useState('');
  // States to display conversion
  const [text, setText] = useState({})

  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    // Ensure only numeric values are accepted
    const numericValue = event.target.value.replace(/[^0-9]/g, '');
    setNumberValue(numericValue);
  };

  // Function to fetch the converted currency data
  const getCurrency = () => {
    console.log(data)
    const request = new XMLHttpRequest();
    request.open('GET', `${EXCHANGE_API_URL}/${data.mode}?from=${data.from}&to=${data.to}&amount=${numberValue}&places=2`);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
      const response = request.response;
      console.log(response)
      setConvertedAmount(response.result);

      setText({
        "dataFrom": data.from,
        "numberValue": numberValue,
        "convertedAmount": response.result,
        "dataTo": data.to
      });
    }
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
      {text.dataFrom && text.numberValue && text.convertedAmount && text.dataTo && (
        <h1>
          {text.numberValue} {text.dataFrom} is {text.convertedAmount} {text.dataTo}
        </h1>
      )}
    </div>
  );
};

export default Exchange;
