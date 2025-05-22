import { useEffect, useState } from "react";
import WEB_URL from "../config";
import axios from "axios";
import "./display.css";
// import Button from 'react-bootstrap/Button';
import { Badge, Spinner } from 'react-bootstrap';

const Display = () => {
    const pid = localStorage.getItem("pid");
    const [mydata, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    
    const loadData = async () => {
        try {
            setLoading(true);
            let api = `${WEB_URL}/admin/productdisplay`;
            // const response = await axios.get(api);
            const response = await axios.get(api,{pid:pid});
            console.log(response.data);
            setMydata(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        loadData()
    }, []);
    
    // const handlePrimary = async (e, id) => {
    //     e.preventDefault();
    //     setProcessingId(id);
    //     const api = `${WEB_URL}/admin/productmakeprimary`;
    //     try {
    //         const response = await axios.post(api, { id: id });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     await loadData();
    //     setProcessingId(null);
    // }
    
    // const handleNormal = async (e, id) => {
    //     e.preventDefault();
    //     setProcessingId(id);
    //     const api = `${WEB_URL}/admin/productmakenormal`;
    //     try {
    //         const response = await axios.post(api, { id: id });
    //         console.log(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    //     await loadData();
    //     setProcessingId(null);
    // }
    
    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    // const RemoveProduct = async (id) => {
    //     let api = `${WEB_URL}/admin/removedelete`;
    //     try {
    //         const response = await axios.post(api, { id: id });
    //         alert("Product Deleted Successfully");
    //     } catch (error) {
    //         console.error("Error deleting product:", error);
    //     }
    //     loadData();
    // };

    return (
        <div className="product-manager-container">
            <div className="header-section">
                <h2>Product Management</h2>
                <p>Update product status and information</p>
            </div>

            {loading ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Loading products...</p>
                </div>
            ) : (
                <div className="table-responsive custom-table-container" style={{overflow:"scroll"}}>
                    <table className="table table-hover product-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Price</th>
                                {/* <th>Status</th> */}
                                {/* <th>Action</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {mydata.map((product) => (
                                <tr key={product._id} className="product-row">
                                    <td className="product-image">
                                        <div className="img-container">
                                            <img 
                                                src={`${WEB_URL}/${product.defaultImage}`} 
                                                alt={product.name}
                                            />
                                        </div>
                                    </td>
                                    <td className="product-info">
                                        <h6>{product.name}</h6>
                                        <span className="brand-badge">{product.brand}</span>
                                        <p className="description">{truncateText(product.description, 60)}</p>
                                    </td>
                                    <td>
                                        <div className="category-info">
                                            <span className="main-category">{product.category}</span>
                                            <span className="sub-category">{product.subcategory}</span>
                                        </div>
                                    </td>
                                    <td className="price-column">
                                        <div className="price-tag">₹{Number(product.price).toLocaleString()}</div>
                                        <div className="ratings">
                                            <span className="stars">{'★'.repeat(Math.round(product.ratings || 0))}</span>
                                            <span className="rating-value">({product.ratings || 0})</span>
                                        </div>
                                    </td>
                                    <td>
                                        <Badge bg={product.status === "primary" ? "success" : "warning"} className="status-badge">
                                            {product.status === "primary" ? "FEATURED" : "NORMAL"}
                                        </Badge>
                                    </td>
                                    {/* <td className="action-column">
                                        {processingId === product._id ? (
                                            <Button variant="secondary" size="sm" disabled>
                                                <Spinner as="span" animation="border" size="sm" /> 
                                                Processing...
                                            </Button>
                                        ) : product.status === "normal" ? (
                                            <Button 
                                                variant="outline-success" 
                                                size="sm" 
                                                className="action-btn"
                                                onClick={(e) => handlePrimary(e, product._id)}
                                            >
                                                Make Featured
                                            </Button>
                                        ) : (
                                            <Button 
                                                variant="outline-warning" 
                                                size="sm" 
                                                className="action-btn"
                                                onClick={(e) => handleNormal(e, product._id)}
                                            >
                                                Remove Featured
                                            </Button>
                                        )}
                                    </td>
                                    <td>
                                        <Button variant="danger" onClick={()=>{RemoveProduct(product._id)}}>Delete</Button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default Display;