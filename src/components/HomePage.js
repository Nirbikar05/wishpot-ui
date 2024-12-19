import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';  // Custom styles for the homepage

const HomePage = () => {
  // Use useEffect to dynamically add the home-page class to the body element
  useEffect(() => {
    document.body.classList.add('home-page'); // Add the 'home-page' class to body

    // Cleanup: remove the class when this component is unmounted
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  return (
    <div className="home-page">
      {/* Navbar Section */}
      <nav className="navbar">
        {/* Navbar Links */}
        <ul className="navbar-nav">
          <li><Link to="/" className="nav-link">Home</Link></li>
          <li><Link to="/services" className="nav-link">Services</Link></li>
          <li><Link to="/progress" className="nav-link">Progress</Link></li>
          <li><Link to="/about-us" className="nav-link">About Us</Link></li>
          <li><Link to="/contact-us" className="nav-link">Contact Us</Link></li>
          <li><Link to="/query" className="nav-link">Query</Link></li>
        </ul>
        
        {/* Login Button */}
        <Link to="/login" className="login-button">Login / Register</Link>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <h1>Welcome to Our Website</h1>
        <p>Explore our services, progress, and much more!</p>
      </div>
    </div>
  );
};

export default HomePage;
