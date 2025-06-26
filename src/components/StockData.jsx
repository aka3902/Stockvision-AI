import React, { useEffect, useState } from 'react';
import StockChart from './StockChart1';
const url='http://localhost:8080/api/stocks';

const StockData = ({ symbol }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [timeRange, setTimeRange] = useState('1m'); // Default to 1 month

  useEffect(() => {
    const fetchHistoricalData = async () => {

      try {
        console.log(`Fetching data from: ${url}/${symbol}`); // Log API call
      
        const response = await fetch(`${url}/${symbol}`);
        if(!response.ok){       
          throw new Error(`HTTP error! Status: ${response.status}`);   //added later for server check
        }
        const data = await response.json();

        console.log("Fetched data:",data); //debugging line
        let parsedData=[];
        if(Array.isArray(data)){
          parsedData=data;
          console.log("hello");
        }
          const currentDate = new Date();
          let filteredData = [];

          if (timeRange === '1m') {
            const oneMonthAgo = new Date(currentDate);
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            filteredData = parsedData.filter(({ date }) => new Date(date) >= oneMonthAgo);
          } else if (timeRange === '3m') {
            const threeMonthsAgo = new Date(currentDate);
            threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
            filteredData = parsedData.filter(({ date }) => new Date(date) >= threeMonthsAgo);
          } else if (timeRange === '1y') {
            const oneYearAgo = new Date(currentDate);
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
            filteredData = parsedData.filter(({ date }) => new Date(date) >= oneYearAgo);
          }

          setHistoricalData(filteredData);
        }
       catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    fetchHistoricalData();
  }, [symbol, timeRange]);

  return (
    <div>
      <h2>Historical Data for {symbol}</h2>
      <div>
        <label htmlFor="timeRange">Select Time Range: </label>
        <select id="timeRange" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
          <option value="1m">1 Month</option>
          <option value="3m">3 Months</option>
          <option value="1y">1 Year</option>
        </select>
      </div>
      {historicalData.length > 0 ? (
        <StockChart stockData={historicalData} />
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default StockData;