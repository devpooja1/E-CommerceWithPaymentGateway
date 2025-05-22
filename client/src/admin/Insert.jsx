import React, { useState } from 'react';
import { Form, Button, Card, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import WEB_URL from '../config';

import '../admin/insert.css';
const Insert = () => {
    const [input, setInput] = useState({});
    const [images, setImages] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategories, setSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState('');

    const categories = {
        Electronics: ['Mobile', 'Tablet', 'Laptop', 'Smart TV'],
        Fashion: ['Jeans', 'Top', 'Kurta Set', 'Saree'],
        Makeup: ['Lipstick', 'Foundation', 'Eye Liner', 'Serum'],
        Decor: ['Curtains', 'Lamps', 'Wall Hanging', 'Show Pieces', 'Wall Decor', 'wall Watch'],
    };

    const handleCategory = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        setSubcategories(categories[category]);
        setSelectedSubcategory('');
    };

    const handleSubcategory = (e) => {
        setSelectedSubcategory(e.target.value);
    };

    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput((values) => ({ ...values, [name]: value }));
    };

    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        
        for (let key in input) {
            formData.append(key, input[key]);
        }
        formData.append('category', selectedCategory);
        formData.append('subcategory', selectedSubcategory);

        // Add files
        for (let i = 0; i < images.length; i++) {
            formData.append('files', images[i]);
        }

        try {
            const api = `${WEB_URL}/admin/saveproduct`;
            const response = await axios.post(api, formData);
            console.log(response.data);
            alert('File uploaded successfully');
        } catch (error) {
            console.log(error);
            alert('Error uploading file');
        }
    };

    return (
        <div className="form-container">
            <Card className="card p-4 shadow-custom">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Select Product Category:</Form.Label>
                        <Form.Select value={selectedCategory} onChange={handleCategory}>
                            <option value="">Select Category</option>
                            {Object.keys(categories).map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Select Subcategory:</Form.Label>
                        <Form.Select value={selectedSubcategory} onChange={handleSubcategory} disabled={!selectedCategory}>
                            <option value="">Select Subcategory</option>
                            {subcategories.map((sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label className="fw-bold">Product Name</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                className="form-control"
                                name="name"
                                value={input.name}
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBrand">
                        <Form.Label className="fw-bold">Brand</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                className="form-control"
                                name="brand"
                                value={input.brand}
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label className="fw-bold">Description</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                className="form-control"
                                name="description"
                                value={input.description}
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label className="fw-bold">Price</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="text"
                                className="form-control"
                                name="price"
                                value={input.price}
                                onChange={handleInput}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label className="fw-bold">Upload File</Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="file"
                                className="form-control"
                                name="file"
                                multiple
                                onChange={handleFileChange}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Button
                        variant="primary"
                        className="w-100"
                        type="button"
                        style={{ background: '#0FA4AF', border: 'none' }}
                        onClick={handleSubmit}
                    >
                        Insert
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default Insert;

<style jsx>{`
  .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 20px;
  }

  .card {
      width: 100%;
      max-width: 500px;
      border-radius: 10px;
      padding: 20px;
      background-color: #fff;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1), 0px 6px 20px rgba(0, 0, 0, 0.1); /* Pure Box Shadow */
  }

  .form-control {
      border-radius: 5px;
  }

  .btn-primary {
      background-color: #0fa4af;
      border: none;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
      .form-container {
          padding: 10px;
      }

      .card {
          max-width: 100%;
      }
  }
`}</style>
