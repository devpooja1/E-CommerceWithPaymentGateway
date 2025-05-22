import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from '../config';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const CustomerOrder=()=>{
    const [mydata, setMydata]= useState([]);

    
    const loadData=async()=>{
        const api=`${BASE_URL}/admin/customerorder`;
        try {
             const response= await axios.get(api);
             console.log(response.data);
             setMydata(response.data);
        } catch (error) {
             console.log(error);
        }
       }

       useEffect(()=>{
        loadData();
    }, []);
    
    let sno=0;
    const ans=mydata.map((key)=>{
         sno++;
        return(
           <>
            <tr>
               <td> Cust_order_00{sno} </td>
               <td>{key.customername} </td>
               <td> {key.product} </td>
               <td> {key.amount} </td>
               <td> {key.address} </td>
               <td> {key.city} </td>
               <td> {key.email} </td>
               <td> {key.contact} </td>
               <td> {key.createdAt} </td>
             </tr>
           </>
        )
   })





    return(
        <>
          <h4> Customer Order Detail </h4>

          <Table striped bordered hover style={{fontSize:"12px"}}>
      <thead>
        <tr>
          <th>Order No.</th>
          <th>Customer Name</th>
          <th>Product</th>
          <th>Amount</th>
          <th>Shipping Address</th>
          <th>City</th>
          <th>Email</th>
          <th>Contact No.</th>
          <th>Order Date</th>
        
        </tr>
      </thead>
      <tbody>
       {ans}
      </tbody>
      </Table>
        </>
    )
}

export default CustomerOrder;