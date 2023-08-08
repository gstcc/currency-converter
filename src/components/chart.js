import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'; // Use "chart.js/auto" for Chart.js version 3

const LineChart = ({ data }) => {
    const chartRef = useRef();
    const labels = data.map(point => new Date(point.x));
    const cData = data.map(point => point.y);

    useEffect(() => {
        if (chartRef.current) {
            const myChart = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Data',
                        data: cData,
                        borderColor: 'blue',
                        fill: false,
                        pointStyle: false // Remove dots from the lines
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false // Hide the legend (box above the chart)
                        }
                    },
                    scales: {
                        x: {
                            display: true,
                            ticks: {
                                display: false // Hide x-axis ticks' text
                            }
                        },
                        y: {
                            display: true,
                            title: {
                                display: true,
                                text: 'Value'
                            }
                        }
                    }
                }
            });

            return () => {
                myChart.destroy();
            };
        }
    }, [labels, cData]);

    return <canvas ref={chartRef} />;
};

export default LineChart;
