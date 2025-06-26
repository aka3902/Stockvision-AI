import React, { useState } from 'react';
import Header from './components/Header';
import StockSearch from './components/StockSearch';
import StockData from './components/StockData';
import ChatbotComponent from './components/ChatbotComponent';
import StockPrediction from './components/StockPrediction';

const App = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('');

  return (
    <div>
      <Header />
      <StockSearch onSearch={(symbol) => setSelectedSymbol(symbol)} />
      {selectedSymbol && <StockData symbol={selectedSymbol} />}
      <ChatbotComponent/>
      <StockPrediction />
    </div>

  );
};

export default App;
