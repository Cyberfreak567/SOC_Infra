import React from 'react';
import { Link } from 'react-router-dom';

const Contacts = () => {
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
      <div className="content">
        <h1>Contact Us</h1>
        <p>Email: info@relearn.com</p>
      </div>
    </div>
  );
};

export default Contacts;