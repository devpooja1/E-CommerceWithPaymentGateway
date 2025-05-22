import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaUser } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap'; 
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import logo from "../images/logo.png"
const TopMenu = () => {
  const ProductData = useSelector(state => state.mycart.cart);
  const proLength = ProductData.length;

  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false); 
  const [isLogedIn, setIsLogedIn] = useState(!!localStorage.getItem("username")); 
  const [isLoggedOut, setIsLoggedOut] = useState(true); 
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setIsLogedIn(!!localStorage.getItem("username")); 
  }, [isLoggedOut]);
  
  const logout = () => {
    localStorage.clear("username");
    setIsLoggedOut(false); 
    setShowDropdown(false); 
    toast.success("logout!", { position: "bottom-right", autoClose: 3000 });
    navigate("/home"); 
  };

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top" 
        className="navcolor shadow-sm"
        expanded={expanded}
        onToggle={(expanded) => setExpanded(expanded)}
        style={{
          backgroundColor:"#212121",
          padding: "12px 0",
          zIndex: 9999 
        }}
      >
        <Container className="nav-container">
          {/* Brand always stays visible */}
          <Navbar.Brand
            as={Link}
            to="/"
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "700",
              letterSpacing: "0.5px"
            }}
          >
          <img src={logo} style={{width:"100px", borderRadius:"20%"}}/>
          </Navbar.Brand>
          
          {/* Icons that stay visible in mobile view */}
          <div className="d-flex d-lg-none mobile-icons">
            <Nav.Link as={Link} to="search" style={{color: "#ffffff", marginLeft: "10px"}}>
              <FaSearch/>
            </Nav.Link>
            <Nav.Link as={Link} to="cart" style={{color: "#ffffff", marginLeft: "10px"}}>
              <FaShoppingCart size={20} />
              <sup className="myitem">{proLength}</sup>
            </Nav.Link>
            <Nav.Link style={{color: "#ffffff", marginLeft: "10px"}} onClick={() => navigate(isLogedIn ? "/profile" : "/userlogin")}>
              <FaUser size={20} />
            </Nav.Link>
          </div>

          {/* Toggle button for menu */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Collapsible content */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link 
                as={Link} 
                to="home" 
                style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} 
                className="nav-link-hover"
                onClick={() => setExpanded(false)}
              >
                Home
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="mobile" 
                style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} 
                className="nav-link-hover"
                onClick={() => setExpanded(false)}
              >
                Electronics
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="tablet" 
                style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} 
                className="nav-link-hover"
                onClick={() => setExpanded(false)}
              >
                Fashion
              </Nav.Link>
              <Nav.Link 
                as={Link} 
                to="audio" 
                style={{color: "#ffffff", marginLeft: "15px", fontWeight: "500", transition: "all 0.3s ease"}} 
                className="nav-link-hover"
                onClick={() => setExpanded(false)}
              >
                Makeup
              </Nav.Link>
            </Nav>

            {/* Desktop view icons */}
            <Nav className="d-none d-lg-flex">
              <Nav.Link as={Link} to="search" style={{color: "#ffffff", marginLeft: "10px"}}>
                <FaSearch/>
              </Nav.Link>
              <Nav.Link as={Link} to="cart" style={{color: "#ffffff", marginLeft: "10px"}}>
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
                  <Nav.Link className="d-flex align-items-center" onClick={() => setShowDropdown(!showDropdown)} style={{ marginRight: "30px" }}>
                    <FaUser size={20} className="cursor-pointer mt-1" style={{color: "#ffffff",}} />
                  </Nav.Link>
                  <Dropdown.Menu align="end" className="user-dropdown-menu">
                    {isLogedIn ? (
                      <>
                        <Dropdown.Item as={Link} to="/profile" className="welcome-text">
                          Welcome,<br /> {localStorage.getItem("username")}!
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Add spacing to prevent content from hiding under fixed navbar */}
     

      <style jsx>{`
        .nav-link-hover:hover {
          color: #3498DB !important;
        }

        .user-dropdown-menu {
          padding: 0;
          min-width: 180px;
        }

        .welcome-text {
          font-weight: bold;
          color: #2C3E50;
        }
        
        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .mobile-icons {
          display: flex;
          align-items: center;
        }
        
        @media (max-width: 991px) {
          .navbar-collapse {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #2C3E50;
            padding: 10px 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 999;
          }
        }
      `}</style>
    </>
  );
};

export default TopMenu;