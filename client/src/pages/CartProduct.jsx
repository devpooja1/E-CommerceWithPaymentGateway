import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaTrash, FaShoppingCart, FaCreditCard, FaStoreAlt } from "react-icons/fa";
import { PiCurrencyInr } from "react-icons/pi";
import { qntyIncrease, qntyDecrease, productRemove } from "../redux/cartSlice";
import WEB_URL from "../config";
import "../css/cart.css";

const Cart = () => {
  const proData = useSelector(state => state.mycart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  
  useEffect(() => {
    setIsCartEmpty(proData.length === 0);
    
    const timer = setTimeout(() => {
      const items = document.querySelectorAll('.cart-item');
      items.forEach(item => {
        item.classList.add('show');
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [proData]);
  
  const handleQuantityChange = (id, action) => {
    if (action === 'increase') {
      dispatch(qntyIncrease({id}));
    } else {
      dispatch(qntyDecrease({id}));
    }
    
    const priceElement = document.getElementById(`total-price-${id}`);
    if (priceElement) {
      priceElement.classList.add('price-update');
      setTimeout(() => {
        priceElement.classList.remove('price-update');
      }, 500);
    }
  };
  
  const handleRemove = (id) => {
    const item = document.getElementById(`cart-item-${id}`);
    if (item) {
      item.classList.add('remove-animation');
      setTimeout(() => {
        dispatch(productRemove({id}));
      }, 300);
    } else {
      dispatch(productRemove({id}));
    }
  };

  // Calculate total amount
  const totalAmount = proData.reduce((total, item) => total + item.price * item.qnty, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2><FaShoppingCart /> My Shopping Bag</h2>
          <span className="item-count">{proData.length} {proData.length === 1 ? 'item' : 'items'}</span>
        </div>

        {isCartEmpty ? (
          <div className="empty-cart">
            <FaShoppingCart className="empty-icon" />
            <h3>Your shopping bag is empty</h3>
            <p>Looks like you haven't added anything to your bag yet.</p>
            <button className="shop-now-btn" onClick={() => navigate("/home")}>
              <FaStoreAlt /> Shop Now
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {proData.map((item) => (
                <div key={item.id} id={`cart-item-${item.id}`} className="cart-item">
                  <div className="item-image">
                    <img src={`${WEB_URL}/${item.defaultImage}`} alt={item.name} />
                  </div>
                  
                  <div className="item-content">
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <div className="item-meta">
                        <span className="brand">{item.brand}</span>
                        <div className="item-price">
                          <PiCurrencyInr />
                          <span>{item.price.toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="item-desc">{item.description}</p>
                    </div>
                    
                    <div className="item-actions">
                      <div className="quantity-wrapper">
                        <button 
                          className="qty-btn minus"
                          onClick={() => handleQuantityChange(item.id, 'decrease')}
                          disabled={item.qnty <= 1}
                        >
                          <FaMinus />
                        </button>
                        <span className="qty-value">{item.qnty}</span>
                        <button 
                          className="qty-btn plus"
                          onClick={() => handleQuantityChange(item.id, 'increase')}
                        >
                          <FaPlus />
                        </button>
                      </div>
                      
                      <div className="price-total" id={`total-price-${item.id}`}>
                        <PiCurrencyInr />
                        <span>{(item.price * item.qnty).toLocaleString()}</span>
                      </div>
                      
                      <button 
                        className="remove-item"
                        onClick={() => handleRemove(item.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-summary-panel">
              <div className="summary-header">
                <h3>Order Summary</h3>
              </div>
              
              <div className="summary-content">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <div className="summary-price">
                    <PiCurrencyInr />
                    <span>{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="summary-row">
                  <span>Shipping</span>
                  <div className="shipping-price">
                    {totalAmount > 1000 ? 'Free' : (
                      <div className="summary-price">
                        <PiCurrencyInr />
                        <span>99</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="summary-row total">
                  <span>Total</span>
                  <div className="summary-price">
                    <PiCurrencyInr />
                    <span>{(totalAmount > 1000 ? totalAmount : totalAmount + 99).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <button 
                className="checkout-button"
                onClick={() => {navigate("/checkout")}}
                disabled={isCartEmpty}
              >
                <FaCreditCard /> Checkout Now
              </button>
              
              <button 
                className="continue-shopping"
                onClick={() => navigate("/home")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;