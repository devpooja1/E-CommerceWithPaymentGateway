import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import WEB_URL from "../config";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Spinner } from 'react-bootstrap'; 

const Search = () => {
  const [serchProduct, setSerchProduct] = useState("");
  const [mydata, setmydata] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

 
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(serchProduct);
    }, 500); 

    return () => clearTimeout(timer); 
  }, [serchProduct]);

  
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearchTerm.trim()) {
        setmydata([]); 
        return;
      }

      setLoading(true); 
      let api = `${WEB_URL}/product/search_Product`;
      try {
        const response = await axios.post(api, { serchProduct: debouncedSearchTerm });
        console.log(response.data);
        setmydata(response.data);
        setLoading(false); 
      } catch (error) {
        console.error(error);
        setLoading(false); 
      }
    };

    fetchData();
  }, [debouncedSearchTerm]); 

  const ans = mydata.map((key) => (
    <div key={key._id} data-aos="fade-up" style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: "350px",
          margin: "20px",
          boxSizing: "border-box",
          borderRadius: "15px", 
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        className="product-card"
      >
        <div className="image-container" style={{ position: "relative", backgroundColor: "#E0E8EA", borderRadius: "15px 15px 0 0" }}>
          <img
            src={`${WEB_URL}/${key.defaultImage}`}
            alt={key.name}
            className="product-image"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "15px 15px 0 0",
              cursor: "pointer",
              transition: "transform 0.3s ease",
            }}
          />
        </div>
        <Card.Body style={{ display: "flex", justifyContent: "space-between", padding: "15px", borderRadius: "0 0 15px 15px" }}>
          <div>
            <Card.Text style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#333", lineHeight: "1.5" }}>
              <span style={{ fontWeight: "bold", color: "#000", fontSize: "18px" }}>
                ₹ {key.price}/-
              </span>
            </Card.Text>
          </div>
          <button
            className="add-to-cart"
            style={{
              backgroundColor: "#28a745",
              color: "#fff",
              border: "none",
              padding: "12px 18px",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            onClick={() => {
              dispatch(
                addtoCart({
                  id: key._id,
                  name: key.name,
                  brand: key.brand,
                  price: key.price,
                  description: key.description,
                  category: key.category,
                  subcategory: key.subcategory,
                  images: key.images,
                  defaultImage: key.defaultImage,
                  ratings: key.ratings,
                  status: key.status,
                  qnty: 1,
                })
              );
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#218838"}
            onMouseLeave={(e) => e.target.style.backgroundColor = "#28a745"}
          >
            Buy Now
          </button>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <>
      <div style={{ marginTop: "90px", marginBottom: "25px", textAlign: "center" }}>
        <input
          type="text"
          value={serchProduct}
          onChange={(e) => setSerchProduct(e.target.value)}
          className="form-control"
          placeholder="Search for products..."
          style={{
            padding: "12px 20px",
            borderRadius: "30px",
            border: "1px solid #ccc",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "80%",
            transition: "border 0.3s ease",
            margin: "auto"
          }}
        />
      </div>
      <div className="row">
        {mydata.length === 0 && !loading ? (
          <p style={{ textAlign: "center", width: "100%" }}>
            {serchProduct ? "No products found." : "Start typing to search for products."}
          </p>
        ) : (
            <div className='product-list' data-aos="fade-down">
            {ans}
          </div>
        )}
      </div>
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export default Search;
