import React from 'react';
import './Header.css'; // Link to the CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>StockVision AI</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Stock Search</a></li>
          <li><a href="#">About Us</a></li>
        </ul>
      </nav>
      <div className="auth">
        <button>Login</button>
        <button>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
