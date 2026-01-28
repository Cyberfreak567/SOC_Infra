import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
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
        <h1>About Us</h1>
        <p>Relearn is a platform for online learning.</p>
      </div>
    </div>
  );
};

export default About;