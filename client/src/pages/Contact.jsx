import React, { useState } from "react";
import "../css/Contact.css"; 
import axios from "axios";
import WEB_URL from "../config";
const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSubmitted(true);
    let api=`${WEB_URL}/user/helpsupport`;
    try {
        const response=await axios.post(api,{formData:formData});
        alert("msg successfully send");
        console.log(response.data)
    } catch (error) {
        console.log(error)
    }
    
  };

  return (
    <div className="contact-container">
      <div className="form-wrapper">
        <div className="form-card">
          <h2 className="form-title">Help & Support</h2>
          
          {submitted && (
            <div className="success-alert">
              Your message has been sent!
            </div>
          )}
          
          <form >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Describe your issue"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <button className="submit-button" type="button" onClick={handleSubmit}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;