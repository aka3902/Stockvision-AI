
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StockChart = ({ stockData }) => {
    console.log("Stock Data for Chart:", stockData);

    if (!stockData || stockData.length === 0) {
        return <p>No data available to display the chart.</p>;
    }

    return (
        <div style={{ width: '100%', height: 400 }}>
            <h3>Stock Price Prediction</h3>
            <ResponsiveContainer>
                <LineChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date" 
                        tickFormatter={(tick) => new Date(tick).toLocaleDateString()} 
                        angle={-45} 
                        textAnchor="end"
                    />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                </LineChart> 
            </ResponsiveContainer>
        </div>
    );
};

export default StockChart;
