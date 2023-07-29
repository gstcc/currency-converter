import { EXCHANGE_API_URL } from "../constants"
import React, { useState } from 'react';
import './exchange.css';




const Exchange = ({ data }) => {
    const [numberValue, setNumberValue] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('')

    const handleInputChange = (event) => {
        // Ensure only numeric values are accepted
        const numericValue = event.target.value.replace(/[^0-9]/g, '');
        setNumberValue(numericValue);
    };


    const getCurrency = () => {
        const request = new XMLHttpRequest();
        request.open('GET', `${EXCHANGE_API_URL}/${data.mode}?from=${data.from}&to=${data.to}&amount=${numberValue}&places=2`);
        request.responseType = 'json';
        request.send();

        request.onload = function () {
            const response = request.response;
            setConvertedAmount(response.result);
        }

    }
    return (
        <div className="Exchange">
            <div>
                <label>Enter the total amount to be converted:</label>
                <input
                    type="number"
                    value={numberValue}
                    onChange={handleInputChange}
                />
            </div>
            <button className="button"
                onClick={getCurrency}>
                {data.mode}
            </button>
            { numberValue && data.from && convertedAmount && data.to && (
                <h1>{numberValue} {data.from} is {convertedAmount} {data.to}</h1>
            )}
        </div>

    )
}


export default Exchange;

