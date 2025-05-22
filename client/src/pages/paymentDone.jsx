import { useState, useEffect } from "react";
import { CheckCircle, Package, Calendar } from "lucide-react";
import "../pages/PaymentDone.css";
import { useNavigate } from "react-router-dom";

const PaymentDone = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
    // Set timeout for loader
    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Add fade-in effect after loader disappears
    const fadeTimer = setTimeout(() => {
      setFadeIn(true);
    }, 2100);
    
    return () => {
      clearTimeout(loaderTimer);
      clearTimeout(fadeTimer);
    };
  }, []);

  const continueShoping=()=>{
    navigate("/home")
  }
  return (
    <div className="payment-container">
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : (
        <div className={`success-card ${fadeIn ? 'fade-in' : ''}`}>
          <div className="card-header">
            <CheckCircle className="header-icon" />
          </div>
          
          <div className="card-body">
            <h2 className="card-title">
              Payment Successful!
            </h2>
            <p className="card-subtitle">
              Thank you for your order. Your transaction has been completed.
            </p>
            
            <div className="info-section">
              <div className="info-item">
                <Package className="info-icon" />
                <span>Your order will be shipped within 6-7 working days</span>
              </div>
              
              <div className="info-item">
                <Calendar className="info-icon" />
                <span>Order confirmation sent to your email</span>
              </div>
            </div>
            
            <div className="button-group">
              <button className="primary-button">
                View Order Details
              </button>
              
              <button className="secondary-button" onClick={continueShoping}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDone;