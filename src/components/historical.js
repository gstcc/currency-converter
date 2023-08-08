import React, { useState, useEffect } from "react";
import Chart from "./chart"; // Import the Chart component

const Historical = ({ currencies }) => {
    const [chartData, setChartData] = useState([]);
    const baseCase = {from : "EUR" , to : "USD"}

    useEffect(() => {
        const currentDate = new Date();
        const oneYearAgo = new Date(currentDate);
        oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
        
        const formattedCurrentDate = currentDate.toISOString().split('T')[0];
        const formattedOneYearAgo = oneYearAgo.toISOString().split('T')[0];

        const requestURL = `https://api.exchangerate.host/timeseries?start_date=${formattedOneYearAgo}&end_date=${formattedCurrentDate}
        &base=${currencies.from && currencies.to ? `${currencies.from}` : "USD"}`;

        fetch(requestURL)
            .then(response => response.json())
            .then(data => {
                if (data.rates) {
                    const selectedCurrency = (currencies.from && currencies.to) ? `${currencies.to}` : "EUR";
                    const currencyData = [];

                    for (const date in data.rates) {
                        if (data.rates[date][selectedCurrency]) {
                            currencyData.push({
                                x: date,
                                y: data.rates[date][selectedCurrency]
                            });
                        }
                    }

                    setChartData(currencyData);
                }
            });
    }, [currencies]); 

    return (
        <div>
          <h2>
            Historical Exchange For{" "}
            {(currencies.from && currencies.to) ? currencies.from : baseCase.to} to{" "}
            {(currencies.from && currencies.to) ? currencies.to : baseCase.from} 
          </h2>
          {chartData.length > 0 && <Chart data={chartData} />}
        </div>
      );
}

export default Historical;
