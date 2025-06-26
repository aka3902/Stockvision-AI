import React, { useState, useEffect } from "react";
import StockChart from "./StockChart2";

const StockPrediction = () => {
    const [symbol, setSymbol] = useState("");
    const [prediction, setPrediction] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handlePredict = async () => {
        if (!symbol) {
            setError("Please enter a stock symbol.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8080/api/stocks/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ symbol }),
            });

            if (!response.ok) {
                throw new Error("Failed to fetch prediction");
            }

            const data = await response.json();
            const formattedData = Object.entries(data).map(([date, value]) => ({ date, value }));
            console.log("Formatted data sent to chart:",formattedData);

            setPrediction(formattedData);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        console.log("Formatted Prediction Data:", prediction);
    }, [prediction]);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Stock Price Prediction</h2>
            <input
                type="text"
                placeholder="Enter stock symbol (e.g., AAPL)"
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                className="w-full p-2 border rounded-md"
            />
            <button
                onClick={handlePredict}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                Predict
            </button>

            {loading && <p className="text-gray-600 mt-3">Fetching prediction...</p>}
            {error && <p className="text-red-500 mt-3">{error}</p>}

            {prediction && prediction.length > 0 && (
                <StockChart stockData={prediction} />
            )}
        </div>
    );
};

export default StockPrediction;
