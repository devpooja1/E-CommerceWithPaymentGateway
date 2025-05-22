import "../components/Header.css";
import { FaShoppingCart, FaSearch, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from 'react-bootstrap';  
import { useEffect } from "react";
const Header = () => {
  const ProductData = useSelector(state => state.mycart.cart);
  const proLength = ProductData.length;
  const navigate = useNavigate();
  
  const [showDropdown, setShowDropdown] = useState(false); 
  const [isLogedIn, setIsLogedIn] = useState(!!localStorage.getItem("username"));
  const [isLoggedOut, setIsLoggedOut] = useState(true); 

useEffect(() => {
  setIsLogedIn(!!localStorage.getItem("username"));
}, [isLoggedOut]);

  const handleSubmit = () => {
    navigate("/admin");
  }

  const handleSubmit1 = () => {
    navigate("/registration");
  }

  const logout = () => {
    localStorage.removeItem("username");
    setIsLoggedOut(false); 
    setShowDropdown(false); 
    navigate("/"); 
  };

  return (
    <>
      <div id="header">
        <div className="header-center">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
            <a href="#">
              <FaSearch className="search-icon-inside" size={20} color="black" />
            </a>
          </div>
        </div>

        <div className="header-right">
          <Nav.Link as={Link} to="/cart" className="d-flex align-items-center">
            <FaShoppingCart size={20} /> 
            <sup className="myitem">{proLength}</sup>
          </Nav.Link>

          <Nav className="d-flex gap-3">
            {/* DROPDOWN */}
            <Dropdown
              show={showDropdown}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Nav.Link className="d-flex align-items-center" onClick={() => setShowDropdown(!showDropdown)}>
                <FaUser size={20} className="cursor-pointer mt-1" />
              </Nav.Link>
              <Dropdown.Menu>
  {isLogedIn ? (
    <>
      <Dropdown.Item as={Link} to="/profile">
        Welcome, {localStorage.getItem("username")}!
      </Dropdown.Item>
      <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
    </>
  ) : (
    <>
      <Dropdown.Item as={Link} to="/userlogin">Login</Dropdown.Item>
      <Dropdown.Item as={Link} to="/usersignup">Signup</Dropdown.Item>
    </>
  )}
</Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </div>
    </>
  );
};

export default Header;
