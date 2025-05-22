import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../redux/cartSlice";
// import { FaShoppingCart } from 'react-icons/fa';
import WEB_URL from "../config";
import axios from 'axios';
// import AutoPlayVideo from './AutoPlayVideo';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { LoginContext } from '../LoginContext';
import Allcategory from './Allcategory';

// Import images directly
import coro2 from "../images/ban1.avif";
import coro1 from "../images/ban2.avif";
import coro from "../images/ban3.webp";
import Shopcart from './shopCart';

const Home = () => {


  // Custom carousel state
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [coro, coro1, coro2];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });

    window.addEventListener('resize', AOS.refresh);
    return () => window.removeEventListener('resize', AOS.refresh);
  }, []);

  // Auto advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const [mydata, setMydata] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setIsLogedIn } = useContext(LoginContext);

  const loadData = () => {
    let api = `${WEB_URL}/product/displayproduct`;
    axios.get(api).then((res) => {
      setMydata(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const showFullProduct = (id) => {
    navigate(`/productdetails/${id}`);
  };

  const getProfile = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${WEB_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
    localStorage.setItem("userid", response.data._id);
    localStorage.setItem("username", response.data.name);
    setIsLogedIn(true);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getProfile();
    }
  }, []);

  return (


    <div className="home-container">

      {/* Hero Video Section */}
      {/* <div className="hero-video" data-aos="fade-up">
        <AutoPlayVideo />
      </div> */}
      
      {/* Cart Icon */}
      <Shopcart />
      {/* Custom Carousel */}
      <div className="carousel-container" data-aos="fade-up" style={{marginTop:"60px"}}>
        <div className="carousel">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}
            >
              <img src={slide} alt={`Banner ${index + 1}`} />
            </div>
          ))}

          <div className="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`indicator ${index === activeSlide ? 'active' : ''}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          <button
            className="carousel-control prev"
            onClick={() => setActiveSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
          >
            &lt;
          </button>

          <button
            className="carousel-control next"
            onClick={() => setActiveSlide((prev) => (prev + 1) % slides.length)}
          >
            &gt;
          </button>
        </div>
      </div>

        <div style={{marginTop:"40px", display:'flex', gap:'20px', borderRadius:"40px"}}>
          <iframe width="660" height="315" src="https://www.youtube.com/embed/W5Ww0MUg3iM?si=6FORKyFKT5z7oB5c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <iframe width="660" height="315" src="https://www.youtube.com/embed/eDqfg_LexCQ?si=jeNRzYkSXTIt24s-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      {/* New Arrivals Section */}
      <div className="section-title" data-aos="fade-up">
        <h2>New Arrivals</h2>
        <div className="title-underline"></div>
      </div>

      

      {/* Categories Section */}
      <div className="categories-section" data-aos="fade-up">
        <Allcategory />
      </div>

      {/* Featured Products Section */}
      <div className="featured-products" data-aos="fade-up">
        <h2>Featured Products</h2>
        <div className="title-underline"></div>
        <div className="product-grid">
          {mydata.map((product) => (
            <div className="product-card-wrapper" key={product._id} data-aos="fade-up">
              <div className="product-card">
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
                <div className="card-body">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* Global Styles */
        .home-container {
          font-family: 'Poppins', sans-serif;
          color: #333;
          max-width: 1200px;
          margin: 0 auto;
         
          position: relative;
        }

 

.hero-video {
  margin-left: -20px;
  margin-right: -20px;
}

        /* Section Title */
        .section-title {
          text-align: center;
          margin: 50px 0 30px;
        }

        .section-title h2 {
          font-size: 32px;
          font-weight: 700;
          color: #333;
          position: relative;
          display: inline-block;
          margin: 0;
        }

        .title-underline {
          height: 4px;
          width: 80px;
          background: linear-gradient(to right, #ff9966, #ff5e62);
          margin: 10px auto 30px;
          border-radius: 2px;
        }

        /* Custom Carousel */
        .carousel-container {
          margin: 30px 0;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
        }

        .carousel {
          position: relative;
          width: 100%;
          height: auto;
        }

        .carousel-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }

        .carousel-slide.active {
          opacity: 1;
          z-index: 2;
          position: relative;
        }

        .carousel-slide img {
          width: 100%;
          height: auto;
          display: block;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 12px;
          z-index: 3;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.6);
          border: none;
          cursor: pointer;
          padding: 0;
        }

        .indicator.active {
          background-color: #fff;
        }

        .carousel-control {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 3;
          background-color: rgba(255, 255, 255, 0.5);
          border: none;
          color: #333;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 24px;
          font-weight: bold;
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .carousel-control:hover {
          opacity: 1;
        }

        .prev {
          left: 20px;
        }

        .next {
          right: 20px;
        }

        /* Categories Section */
        .categories-section {
          margin: 50px 0;
        }

        /* Featured Products */
        .featured-products {
          margin: 50px 0;
          text-align: center;
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
          background-color: #fff;
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
          margin-top: 15px;
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

        /* Responsive Styles */
        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
          }
          
          .section-title h2 {
            font-size: 26px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;