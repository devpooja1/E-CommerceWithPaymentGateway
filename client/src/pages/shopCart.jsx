import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaShoppingCart } from 'react-icons/fa';

const Shopcart = () => {
    const ProductData = useSelector(state => state.mycart.cart);
    const proLength = ProductData.length;
  return (
    <>
      <Link to="/cart" className="cart-link">
        <FaShoppingCart size={20} />
        <span className="item-count">{proLength}</span>
      </Link>

      <style>{`
        .cart-link {
          position: fixed;
          top: 250px;
          right: 0;
          background-color: #fff;
          padding: 10px 15px;
          border-radius: 30px 0 0 30px;
          box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          text-decoration: none;
          color: #333;
          display: flex;
          align-items: center;
        }

        .item-count {
          background-color: #4CAF50;
          color: white;
          border-radius: 50%;
          padding: 2px 6px;
          font-size: 12px;
          margin-left: 5px;
        }
      `}</style>
    </>
  );
};

export default Shopcart;
