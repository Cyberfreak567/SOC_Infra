import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Relearn</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contacts">Contacts</Link></li>
        </ul>
        <div className="auth-links">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/signup" className="btn">Signup</Link>
        </div>
      </nav>
      <div className="home-content">
        <h1>Welcome to Relearn</h1>
        <p>Your gateway to online learning. Signup or login to access courses.</p>
      </div>
    </div>
  );
};

export default Home;