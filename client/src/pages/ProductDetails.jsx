import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FaStar, FaShoppingCart } from "react-icons/fa";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import WEB_URL from "../config";
import axios from "axios";
import { PiCurrencyInrThin } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from 'antd';
import { message } from "antd";
import "../css/productdetails.css"
import { useDispatch } from "react-redux";
import { addtoCart } from "../redux/cartSlice"
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const [myPro, setMyPro] = useState({});
  const [similarPro, setSimilarPro] = useState([]);
  const [largeImg, setLargeImg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proRating, setProRating] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitRate = async () => {
    const api = `${WEB_URL}/product/productratings`;
    try {
      const response = await axios.post(api, {
        ratings: proRating,
        name: localStorage.getItem("username"),
        userid: localStorage.getItem("userid"),
      });
  
      console.log("Toast should appear now!");
      toast.success("Rating submitted successfully", { position: "bottom-right", autoClose: 3000 });
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Please login to rate products", { position: "bottom-right", autoClose: 3000 });
      // navigate("/userlogin");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const loadData = async () => {
    const api = `${WEB_URL}/product/showfullproduct/?id=${id}`;
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setMyPro(response.data);
      setLargeImg(response.data.defaultImage);
      loadData1(response.data.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
    window.scrollTo(0, 0);
  }, [id]);

  const showFullProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };

  const loadData1 = async (cate) => {
    const api1 = `${WEB_URL}/product/prolist/?cate=${cate}`;
    try {
      const response1 = await axios.get(api1);
      console.log(response1.data);
      setSimilarPro(response1.data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollLeft = () => {
    if (scrollPosition > 0) {
      setScrollPosition(scrollPosition - 250);
    }
  };

  const scrollRight = () => {
    const container = document.querySelector('.similar-products-scroll');
    if (container && scrollPosition < container.scrollWidth - container.clientWidth) {
      setScrollPosition(scrollPosition + 250);
    }
  };

  useEffect(() => {
    const container = document.querySelector('.similar-products-scroll');
    if (container) {
      container.scrollLeft = scrollPosition;
    }
  }, [scrollPosition]);

  const addToCart = () => {
    dispatch(
      addtoCart({
        id: myPro._id,
        name: myPro.name,
        brand: myPro.brand,
        price: myPro.price,
        description: myPro.description,
        category: myPro.category,
        subcategory: myPro.subcategory,
        images: myPro.images,
        defaultImage: myPro.defaultImage,
        ratings: myPro.ratings,
        status: myPro.status,
        qnty: 1,
      })
    );
    // toast.success("Added to cart!", { position: "bottom-right", autoClose: 2000 });
  };

  return (
    <div className="product-details-page">
      {/* Main Product Section */}
      <div className="product-details-container">
        {/* Product Image Gallery */}
        <div className="product-gallery">
          <div className="thumbnail-container">
            {myPro.images &&
              myPro.images.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${largeImg === img ? 'active-thumbnail' : ''}`}
                  onClick={() => setLargeImg(img)}
                >
                  <img src={`${WEB_URL}/${img}`} alt={`${myPro.name} - View ${index + 1}`} />
                </div>
              ))}
          </div>
          
          <div className="main-image-container">
            {largeImg && (
              <img 
                src={`${WEB_URL}/${largeImg}`} 
                alt={myPro.name} 
                className="main-product-image" 
              />
            )}
          </div>
        </div>

        {/* Product Information */}
        <div className="product-info-container">
          <h1 className="product-title">{myPro.name}</h1>
          
          <div className="product-meta">
            {myPro.brand && <span className="product-brand">{myPro.brand}</span>}
            <div className="product-ratings">
              <div className="stars-container">
                {[...Array(5)].map((_, index) => (
                  <FaStar 
                    key={index} 
                    className={index < myPro.ratings ? "star filled" : "star empty"} 
                  />
                ))}
              </div>
              <button className="rate-button" onClick={showModal}>
                Rate this product
              </button>
            </div>
          </div>

          <div className="product-price">
            <PiCurrencyInrThin className="currency-icon" />
            <span>{myPro.price}</span>
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{myPro.description}</p>
          </div>

          {myPro.category && (
            <div className="product-category">
              <span>Category: </span>
              <span className="category-value">{myPro.category}</span>
            </div>
          )}

          <div className="product-actions">
            <button className="buy-button" onClick={addToCart}>
              <FaShoppingCart /> Add to Cart
            </button>
            <button className="wishlist-button">
              <FaRegHeart /> Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Similar Products Section */}
      <div className="similar-products-section">
        <h2 className="section-title">Similar Products</h2>
        
        <div className="similar-products-container">
          <button 
            className="scroll-button scroll-left" 
            onClick={scrollLeft}
            style={{ visibility: scrollPosition > 0 ? 'visible' : 'hidden' }}
          >
            <BsArrowLeft />
          </button>
          
          <div className="similar-products-scroll">
            {similarPro.map((product) => (
              <div 
                key={product._id} 
                className="similar-product-card"
                onClick={() => showFullProduct(product._id)}
              >
                <div className="similar-product-image">
                  <img 
                    src={`${WEB_URL}/${product.defaultImage}`} 
                    alt={product.name} 
                  />
                </div>
                <div className="similar-product-info">
                  <h3>{product.name}</h3>
                  <div className="similar-product-price">
                    <PiCurrencyInrThin />
                    <span>{product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            className="scroll-button scroll-right" 
            onClick={scrollRight}
          >
            <BsArrowRight />
          </button>
        </div>
      </div>

      {/* Rating Modal */}
      <Modal 
        title="Rate this Product" 
        open={isModalOpen} 
        onOk={handleSubmitRate} 
        onCancel={handleCancel}
        okText="Submit Rating"
        cancelText="Cancel"
        centered
      >
        <div className="rating-modal-content">
          <p>How would you rate this product?</p>
          <div className="rating-selector">
            <select 
              value={proRating} 
              onChange={(e) => setProRating(e.target.value)}
              className="rating-dropdown"
            >
              <option value="0">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* CSS Styles */}
      <style jsx>{`
        .product-details-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          font-family: 'Poppins', sans-serif;
          color: #333;
        }

        .product-details-container {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
          margin-bottom: 60px;
          background-color: white;
          border-radius: 12px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          padding: 30px;
        }

        /* Gallery Styles */
        .product-gallery {
          flex: 1;
          min-width: 300px;
          display: flex;
          gap: 20px;
        }

        .thumbnail-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .thumbnail {
          width: 70px;
          height: 70px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: all 0.3s ease;
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .active-thumbnail {
          border-color: #3182ce;
          box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
        }

        .main-image-container {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f8fafc;
          border-radius: 12px;
          overflow: hidden;
          height: 400px;
        }

        .main-product-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        /* Product Info Styles */
        .product-info-container {
          flex: 1;
          min-width: 300px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .product-title {
          font-size: 28px;
          font-weight: 700;
          color: #1a202c;
          margin: 0;
        }

        .product-meta {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .product-brand {
          font-size: 16px;
          color: #718096;
        }

        .product-ratings {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .stars-container {
          display: flex;
          gap: 2px;
        }

        .star {
          font-size: 18px;
        }

        .filled {
          color: #f6ad55;
        }

        .empty {
          color: #e2e8f0;
        }

        .rate-button {
          background: none;
          border: none;
          color: #3182ce;
          font-size: 14px;
          cursor: pointer;
          text-decoration: underline;
          padding: 0;
        }

        .product-price {
          display: flex;
          align-items: center;
          font-size: 32px;
          font-weight: 700;
          color: #2d3748;
        }

        .currency-icon {
          font-size: 32px;
          margin-right: 4px;
        }

        .product-description {
          background-color: #f8fafc;
          padding: 20px;
          border-radius: 8px;
        }

        .product-description h3 {
          font-size: 18px;
          margin-top: 0;
          margin-bottom: 10px;
          color: #4a5568;
        }

        .product-description p {
          font-size: 16px;
          line-height: 1.6;
          color: #4a5568;
          margin: 0;
        }

        .product-category {
          font-size: 14px;
          color: #718096;
        }

        .category-value {
          font-weight: 600;
          color: #4a5568;
        }

        .product-actions {
          display: flex;
          gap: 15px;
          margin-top: 10px;
        }

        .buy-button, .wishlist-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .buy-button {
          background: linear-gradient(to right, #4CAF50, #2E7D32);
          color: white;
          flex: 1;
        }

        .buy-button:hover {
          background: linear-gradient(to right, #2E7D32, #1B5E20);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.2);
        }

        .wishlist-button {
          background-color: white;
          border: 1px solid #e2e8f0;
          color: #4a5568;
        }

        .wishlist-button:hover {
          background-color: #f7fafc;
          color: #ed64a6;
        }

        /* Similar Products Section */
        .similar-products-section {
          margin-top: 60px;
        }

        .section-title {
          font-size: 24px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          color: #2d3748;
          position: relative;
        }

        .section-title:after {
          content: '';
          position: absolute;
          width: 60px;
          height: 4px;
          background: linear-gradient(to right, #3182ce, #63b3ed);
          left: 50%;
          transform: translateX(-50%);
          bottom: -12px;
          border-radius: 2px;
        }

        .similar-products-container {
          position: relative;
          padding: 0 40px;
        }

        .similar-products-scroll {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-behavior: smooth;
          padding: 10px 5px 30px;
          scrollbar-width: none;  /* Firefox */
        }

        .similar-products-scroll::-webkit-scrollbar {
          display: none;  /* Chrome, Safari, Edge */
        }

        .scroll-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: white;
          border: 1px solid #e2e8f0;
          color: #4a5568;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          z-index: 2;
          transition: all 0.3s ease;
        }

        .scroll-button:hover {
          background-color: #f7fafc;
          color: #3182ce;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .scroll-left {
          left: 0;
        }

        .scroll-right {
          right: 0;
        }

        .similar-product-card {
          flex: 0 0 220px;
          background-color: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .similar-product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
        }

        .similar-product-image {
          height: 160px;
          background-color: #f8fafc;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .similar-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .similar-product-card:hover .similar-product-image img {
          transform: scale(1.05);
        }

        .similar-product-info {
          padding: 12px;
        }

        .similar-product-info h3 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 8px;
          color: #2d3748;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .similar-product-price {
          display: flex;
          align-items: center;
          font-size: 18px;
          font-weight: 700;
          color: #3182ce;
        }

        /* Rating Modal */
        .rating-modal-content {
          padding: 10px 0;
        }

        .rating-modal-content p {
          margin-bottom: 15px;
          color: #4a5568;
        }

        .rating-selector {
          display: flex;
          justify-content: center;
        }
        
        .rating-dropdown {
          padding: 10px;
          width: 200px;
          font-size: 16px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .product-details-container {
            flex-direction: column;
            padding: 20px;
          }

          .product-gallery {
            flex-direction: column-reverse;
          }

          .thumbnail-container {
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
          }

          .main-image-container {
            height: 300px;
          }

          .product-title {
            font-size: 24px;
          }

          .product-price {
            font-size: 26px;
          }

          .similar-products-container {
            padding: 0 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;