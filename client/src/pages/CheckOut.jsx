import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

import WEB_URL from "../config";

const CheckOut = () => {
  const [mydata, setMydata] = useState({});
  const navigate = useNavigate();
  const proData = useSelector(state => state.mycart.cart);

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/userlogin");
    }
    loadData();
  }, []);

  const loadData = async () => {
    const api = `${WEB_URL}/user/getuserdetail`;
    const response = await axios.post(api, { id: localStorage.getItem("userid") });
    setMydata(response.data);
  };

  let totalAmount = 0;
  let myProImg = "";
  let myProList = "";
  
  const ans = proData.map((key) => {
    totalAmount += key.price * key.qnty;
    myProImg = `${WEB_URL}/${key.defaultImage}`;
    myProList += key.name + ", ";
    return (
      <tr key={key.id}>
        <td><img src={myProImg} style={{ width: 50, height: 50 }} alt="Product" /></td>
        <td>{key.name}</td>
        <td>{key.brand}</td>
        <td>{key.price}</td>
        <td>{key.qnty}</td>
        <td>{key.price * key.qnty}</td>
      </tr>
    );
  });

  const initPay = (data) => {
    const options = {
      key: "rzp_test_kDhR9S2dT4FiqU",
      amount: data.amount,
      currency: data.currency,
      name: myProList,
      description: "Test",
      image: myProImg,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyURL = `${WEB_URL}/api/payment/verify`;
          await axios.post(verifyURL, response);
        } catch (error) {
          console.log(error);
        }
      },
      theme: { color: "#3399cc" },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePay = async () => {
    try {
      const orderURL = `${WEB_URL}/api/payment/orders`;
      const { data } = await axios.post(orderURL, {
        amount: totalAmount,
        customername: mydata.name,
        product: myProList,
        address: mydata.address,
        city: mydata.city,
        email: mydata.email,
        contact: mydata.contact
      });
      initPay(data.data);
      navigate("/paymentdone")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 align="center" style={{ marginTop: "90px" }}>Check out Page</h1>
      <div className="container">
        <div className="form-section">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" value={mydata.name} readOnly style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control type="text" value={mydata.contact} readOnly style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" value={mydata.email} readOnly style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={mydata.address} readOnly style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={mydata.city} readOnly style={{ backgroundColor: "#f4eded" }} />
            </Form.Group>
          </Form>
        </div>

        <div className="table-section">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {ans}
              <tr>
                <th colSpan="5">Net Amount:</th>
                <th>{totalAmount}</th>
              </tr>
              <tr>
                <th colSpan="6">
                  <Button variant="primary" onClick={handlePay}>Pay Now!</Button>
                </th>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
