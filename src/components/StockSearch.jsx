import React, { useState } from 'react';
import './StockSearch.css'; // Link to the CSS file

const StockSearch = ({ onSearch }) => {
  const [symbol, setSymbol] = useState('');

  const handleSearch = () => {
    onSearch(symbol);
  };

  return (
    <div className="stock-search">
      <input
        type="text"
        placeholder="Enter stock symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default StockSearch;