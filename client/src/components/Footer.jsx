import React from 'react';
import "../components/footer.css";

const Footer = () => {
  return (
    <footer className="footer" style={{padding: "30px 0px 30px 0px"}}>
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-logo">E- Store</h3>
          <p className="footer-description">
            Explore the best  smartphones, Fashion and accessories. Get the latest tech delivered to your doorstep.
          </p>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/share/1Zg5anvuyD/" target="_blank" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul>
            <li>Email: support@estore.com</li>
            <li>Phone: +1 800 123 4567</li>
            <li>Address: 123 estore Street, Tech City</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 E - Store. All Rights Reserved.</p>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: #212121;
          color: white;
          padding: 40px 0;
          font-family: 'Arial', sans-serif;
          margin: 0;
          width: 100%;
        }
        
        .footer-container {
          display: flex;
          justify-content: flex-start;
          max-width: 100%;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
        }
        
        .footer-section {
          flex: 1;
          margin: 0;
          padding-left: 0;
          min-width: 250px;
        }
        
        .footer-logo {
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 15px;
        }
        
        .footer-description {
          font-size: 16px;
          line-height: 1.5;
          color: #ccc;
        }
        
        .footer-section h4 {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        
        .footer-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .footer-section ul li {
          margin: 8px 0;
        }
        
        .footer-section ul li a {
          text-decoration: none;
          color: #ccc;
          font-size: 16px;
        }
        
        .footer-section ul li a:hover {
          color: #4caf50;
        }
        
        .footer-social-icons {
          margin-top: 15px;
        }
        
        .social-icon {
          color: white;
          font-size: 20px;
          margin-right: 15px;
          transition: color 0.3s ease;
        }
        
        .social-icon:hover {
          color: #4caf50;
        }
        
        .footer-bottom {
          background-color: #1a1a1a;
          text-align: center;
          padding: 20px 0;
          margin-top: 40px;
          width: 100%;
        }
        
        .footer-bottom p {
          font-size: 14px;
          color: #ccc;
        }
        
        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .footer-section {
            margin: 20px 0;
            text-align: left;
            padding-left: 0;
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;