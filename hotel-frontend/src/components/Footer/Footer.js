import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => (
  <footer className="footer" id="contact">
    <div className="footer-top">
      <div className="footer-brand">
        <div className="footer-logo">
          <span>GRAND</span><span className="thin">LUXE</span>
        </div>
        <p className="footer-tagline">HOTEL & RESORTS</p>
        <p className="footer-desc">
          Experience the pinnacle of luxury hospitality. Where every stay becomes an unforgettable memory.
        </p>
        <div className="footer-social">
          <a href="#!">FB</a>
          <a href="#!">IG</a>
          <a href="#!">TW</a>
          <a href="#!">LI</a>
        </div>
      </div>

      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/rooms">Rooms & Suites</Link></li>
          <li><Link to="/register">Book Now</Link></li>
          <li><Link to="/login">Guest Login</Link></li>
        </ul>
      </div>

      <div className="footer-links">
        <h4>Room Types</h4>
        <ul>
          <li><Link to="/rooms">Standard Rooms</Link></li>
          <li><Link to="/rooms">Deluxe Rooms</Link></li>
          <li><Link to="/rooms">Executive Rooms</Link></li>
          <li><Link to="/rooms">Luxury Suites</Link></li>
          <li><Link to="/rooms">Presidential Suite</Link></li>
        </ul>
      </div>

      <div className="footer-contact">
        <h4>Contact Us</h4>
        <p>123 Luxury Boulevard<br />Beverly Hills, CA 90210</p>
        <p>✆ +1 (555) 123-4567</p>
        <p>✉ reservations@grandluxe.com</p>
        <p>Check-in: 3:00 PM | Check-out: 11:00 AM</p>
      </div>
    </div>

    <div className="footer-bottom">
      <p>© 2024 Grand Luxe Hotel & Resorts. All rights reserved.</p>
      <div>
        <a href="#!">Privacy Policy</a>
        <a href="#!">Terms of Service</a>
        <a href="#!">Cookie Policy</a>
      </div>
    </div>
  </footer>
);

export default Footer;
