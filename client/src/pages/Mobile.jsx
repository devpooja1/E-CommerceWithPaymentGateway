import React, { useEffect, useState } from "react";
import axios from "axios";
import WEB_URL from "../config";
import { Card } from "react-bootstrap"; 
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Shopcart from "./shopCart";

const Mobile = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
    
    window.addEventListener('resize', AOS.refresh);
    return () => window.removeEventListener('resize', AOS.refresh);
  }, []);
  
  const loadData = async () => {
    try {
      const api = `${WEB_URL}/product/mobile?category=Mobile`;
      const response = await axios.get(api);
      console.log(response.data);  
      setData(response.data);      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFullProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };

  return (
    <div className="mobile-container">
      <div className="section-header" data-aos="fade-up">
        <h2>Latest Smart Phones</h2>
        <div className="title-underline"></div>
        <p className="section-description">Explore the latest mobile phones from  India</p>
      </div>

      <div className="product-grid" data-aos="fade-up">
        {data.map((product) => (
          <div className="product-card-wrapper" key={product._id} data-aos="fade-up">
            <Card className="product-card">
              <div className="image-container" onClick={() => showFullProduct(product._id)}>
                <img
                  src={`${WEB_URL}/${product.defaultImage}`}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-overlay">
                  <span>View Details</span>
                </div>
              </div>
              <Card.Body>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">{product.brand}</p>
                <div className="card-footer">
                  <span className="product-price">₹{product.price}/-</span>
                  <button
                    className="buy-button"
                    onClick={() => {
                      dispatch(
                        addtoCart({
                          id: product._id,
                          name: product.name,
                          brand: product.brand,
                          price: product.price,
                          description: product.description,
                          category: product.category,
                          subcategory: product.subcategory,
                          images: product.images,
                          defaultImage: product.defaultImage,
                          ratings: product.ratings,
                          status: product.status,
                          qnty: 1,
                        })
                      );
                    }}
                  >
                    Buy Now
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* cart icon */}
<Shopcart/>

      {/* Add CSS styles */}
      <style jsx>{`
        .mobile-container {
          font-family: 'Poppins', sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          margin-top: 80px;
        }

        .section-header {
          text-align: center;
          margin: 30px 0;
        }

        .section-header h2 {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          position: relative;
          display: inline-block;
          margin-bottom: 10px;
        }

        .title-underline {
          height: 4px;
          width: 80px;
          background: linear-gradient(to right, #ff9966, #ff5e62);
          margin: 10px auto 20px;
          border-radius: 2px;
        }

        .section-description {
          font-size: 16px;
          color: #666;
          margin-bottom: 30px;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 30px;
          margin-top: 30px;
        }

        .product-card {
          border: none;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 100%;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .image-container {
          position: relative;
          background-color: #f8f8f8;
          overflow: hidden;
          cursor: pointer;
          aspect-ratio: 1 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .product-card:hover .product-image {
          transform: scale(1.05);
        }

        .product-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-overlay span {
          color: white;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 30px;
          background-color: rgba(0, 0, 0, 0.6);
        }

        .product-card:hover .product-overlay {
          opacity: 1;
        }

        .card-body {
          padding: 20px;
          text-align: left;
          display: flex;
          flex-direction: column;
          height: calc(100% - 280px);
        }

        .product-name {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 5px;
          color: #333;
        }

        .product-brand {
          color: #777;
          font-size: 14px;
          margin-bottom: 15px;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .product-price {
          font-size: 20px;
          font-weight: 700;
          color: #333;
        }

        .buy-button {
          background: linear-gradient(to right, #4CAF50, #2E7D32);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .buy-button:hover {
          background: linear-gradient(to right, #2E7D32, #1B5E20);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
          }
          
          .section-header h2 {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
};

export default Mobile;