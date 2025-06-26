import React, { useState } from 'react';
import './ChatbotComponent.css';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setMessages([...messages, { user: true, text: input }]); 
    setInput(''); 

    try {
      const res = await fetch('http://localhost:8080/api/stocks/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }), 
      });

      if (!res.ok) throw new Error("Failed to fetch chatbot response");

      const data = await res.json();
      setResponse(data,response);
      setMessages((prev) => [...prev, { user: false, text: data.response }]); 
    } catch (error) {
      console.error("Chatbot Error:", error);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen ? (
        <button className="chatbot-button" onClick={() => setIsOpen(true)}>
          <img src="/chatbot-icon.png" alt="Chatbot Icon" className="chatbot-icon" />
        </button>
      ) : (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Stock Vision AI Chatbot</h3>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>X</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.user ? 'chatbot-message user' : 'chatbot-message bot'}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotComponent;
