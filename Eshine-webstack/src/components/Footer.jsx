import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3>ESHINE</h3>
            <p>
              Premium fashion e-commerce redefining minimalism and editorial design. 
            </p>
          </div>
          <div className="footer-col">
            <h3>SHOP</h3>
            <Link to="/men" className="social-link" style={{ marginBottom: '5px' }}>Men</Link>
            <Link to="/women" className="social-link" style={{ marginBottom: '5px' }}>Women</Link>
            <Link to="/new-arrival" className="social-link" style={{ marginBottom: '5px' }}>New Arrivals</Link>
            <Link to="/collections" className="social-link" style={{ marginBottom: '5px' }}>Collections</Link>
          </div>
          <div className="footer-col">
            <h3>SOCIALS</h3>
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Twitter</a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">TikTok</a>
          </div>
          <div className="footer-col">
            <h3>CONTACT</h3>
            <p className="phone">+91 99999 99999</p>
            <p className="small-desc">
              Available 24/7 for customer support and any queries you may have regarding our products or shipping.
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Eshine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
