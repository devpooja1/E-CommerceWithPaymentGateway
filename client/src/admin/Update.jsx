import { useEffect, useState } from "react";
import WEB_URL from "../config";
import axios from "axios";
import "./update.css";
import Button from 'react-bootstrap/Button';
import { Badge, Spinner } from 'react-bootstrap';

const Update = () => {
    const [mydata, setMydata] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    
    const loadData = async () => {
        try {
            setLoading(true);
            let api = `${WEB_URL}/admin/productdisplay`;
            const response = await axios.get(api);
            console.log(response.data);
            setMydata(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        loadData();
    }, []);
    
    const handlePrimary = async (e, id) => {
        e.preventDefault();
        setProcessingId(id);
        const api = `${WEB_URL}/admin/productmakeprimary`;
        try {
            const response = await axios.post(api, { id: id });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        await loadData();
        setProcessingId(null);
    }
    
    const handleNormal = async (e, id) => {
        e.preventDefault();
        setProcessingId(id);
        const api = `${WEB_URL}/admin/productmakenormal`;
        try {
            const response = await axios.post(api, { id: id });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        await loadData();
        setProcessingId(null);
    }
    
    const truncateText = (text, maxLength) => {
        if (text && text.length > maxLength) {
            return text.substring(0, maxLength) + '...';
        }
        return text;
    };

    const RemoveProduct = async (id) => {
        let api = `${WEB_URL}/admin/removedelete`;
        try {
            const response = await axios.post(api, { id: id });
            alert("Product Deleted Successfully");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
        loadData();
    };

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
                                <th>Status</th>
                                <th>Action</th>
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
                                    <td className="action-column">
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
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <style jsx>{`
                .product-manager-container {
                    background-color: #f8f9fa;
                    padding: 25px;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }

                .header-section {
                    margin-bottom: 25px;
                    border-bottom: 1px solid #e9ecef;
                    padding-bottom: 15px;
                }

                .header-section h2 {
                    color: #2C3E50;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .header-section p {
                    color: #6c757d;
                    font-size: 14px;
                }

                .custom-table-container {
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                }

                .product-table {
                    margin-bottom: 0;
                }

                .product-table thead {
                    background-color: #f0f2f5;
                }

                .product-table thead th {
                    font-weight: 600;
                    text-transform: uppercase;
                    font-size: 12px;
                    letter-spacing: 0.5px;
                    color: #495057;
                    padding: 14px;
                    border-bottom: 2px solid #dee2e6;
                }

                .product-row {
                    transition: all 0.2s ease;
                }

                .product-row:hover {
                    background-color: #f8f9fa;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .product-image {
                    width: 80px;
                }

                .img-container {
                    width: 60px;
                    height: 60px;
                    overflow: hidden;
                    border-radius: 6px;
                    background-color: #f8f8f8;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                .img-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .product-info {
                    max-width: 250px;
                }

                .product-info h6 {
                    margin-bottom: 5px;
                    font-weight: 600;
                    color: #212529;
                }

                .brand-badge {
                    display: inline-block;
                    font-size: 11px;
                    background-color: #e9ecef;
                    color: #495057;
                    padding: 2px 8px;
                    border-radius: 12px;
                    margin-bottom: 6px;
                }

                .description {
                    font-size: 12px;
                    color: #6c757d;
                    margin: 0;
                    line-height: 1.4;
                }

                .category-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .main-category {
                    font-weight: 500;
                    color: #495057;
                    font-size: 13px;
                }

                .sub-category {
                    font-size: 11px;
                    color: #6c757d;
                }

                .price-column {
                    text-align: right;
                }

                .price-tag {
                    font-weight: 600;
                    color: #212529;
                    font-size: 16px;
                }

                .ratings {
                    display: flex;
                    align-items: center;
                    justify-content: flex-end;
                    gap: 4px;
                    margin-top: 4px;
                }

                .stars {
                    color: #ffc107;
                    letter-spacing: -2px;
                    font-size: 12px;
                }

                .rating-value {
                    font-size: 11px;
                    color: #6c757d;
                }

                .status-badge {
                    padding: 6px 10px;
                    font-size: 11px;
                    font-weight: 600;
                    letter-spacing: 1px;
                }

                .action-column {
                    text-align: center;
                }

                .action-btn {
                    white-space: nowrap;
                    font-weight: 500;
                    padding: 4px 12px;
                    transition: all 0.2s ease;
                }

                .action-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
            `}</style>
        </div>
    );
};

export default Update;