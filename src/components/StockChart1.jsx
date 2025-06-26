import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = ({ stockData }) => {
  if (!stockData || stockData.length === 0) {
    return <p>No data available to display the chart.</p>;
  }


  return (
    <div style={{ width: '100%', height: 400 }}>
      <h3>Stock Price Trend</h3>
      <ResponsiveContainer>
        <LineChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="open" stroke="#88848d"/>
          <Line type="monotone" dataKey="high" stroke="#82ca9d" />
          <Line type="monotone" dataKey="low" stroke="#ff7300" />
          <Line type="monotone" dataKey="close" stroke="#8884d8" />
        </LineChart> 
      </ResponsiveContainer>
    </div>
  );
};

export default StockChart;

