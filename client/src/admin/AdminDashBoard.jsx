import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  FaHome, FaPlus, FaList, FaEdit, FaBars, FaTimes, 
  FaUser, FaSignOutAlt, FaChartLine, FaCalendarAlt, 
  FaFileAlt, FaUsers
} from "react-icons/fa";
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import './admin.css';

const AdminDashBoard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 768);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth > 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
 
  const AdminName = localStorage.getItem("adminname");
  
  const logout = () => {
    
    localStorage.clear();
    navigate("/home");
  };
  

  const isActive = (path) => {
    return location.pathname.includes(path);
  };
  
  
  const SampleDashboardContent = () => {
    
    if (!location.pathname.includes('createuser') && 
        !location.pathname.includes('insert') && 
        !location.pathname.includes('display') && 
        !location.pathname.includes('update')) {
      return (
        <div>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-primary">
                <h3><FaUsers /> 24</h3>
                <p>Total Users</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-success">
                <h3><FaFileAlt /> 13</h3>
                <p>Tasks Completed</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-warning">
                <h3><FaCalendarAlt /> 24</h3>
                <p>Pending Tasks</p>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="dashboard-card dashboard-card-danger">
                <h3><FaChartLine /> 75%</h3>
                <p>Performance</p>
              </div>
            </div>
          </div>
          
          {/* <div className="dashboard-card">
            <h4>Welcome to Admin Dashboard</h4>
            <p>This is a sample dashboard to showcase the styling capabilities.</p>
            <Button className="btn-gradient-primary mt-3">
              Explore Features
            </Button>
          </div> */}
        </div>
      );
    }
    return null;
  };
  
  return (
    <>
      <div id="admin-dashboard">
        {/* Header */}
        <header>
          <div className="menu-icon" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <h1 id="admin">Admin Dashboard</h1>
          <div className="header-right">
            <div className="welcome-message">
              <FaUser className="icon" /> {AdminName ? AdminName : "Guest"}
            </div>
            <Button variant="danger" className="logout-btn" onClick={logout}>
              <FaSignOutAlt /> Logout
            </Button>
          </div>
        </header>
        
        {/* Main Content */}
        <div id="main-content">
          {/* Sidebar */}
          <aside className={`sidebar ${isMenuOpen ? "active" : ""}`}>
            <nav className="navbar">
              <div className="nav-links">
                <Link to="createuser" className={`nav-link ${isActive('createuser') ? 'active' : ''}`}>
                  <FaHome className="icon" /> Home
                </Link>
                <Link to="insert" className={`nav-link ${isActive('insert') ? 'active' : ''}`}>
                  <FaPlus className="icon" /> Insert
                </Link>
                <Link to="display" className={`nav-link ${isActive('display') ? 'active' : ''}`}>
                  <FaList className="icon" /> Display
                </Link>
                <Link to="update" className={`nav-link ${isActive('update') ? 'active' : ''}`}>
                  <FaEdit className="icon" /> Update
                </Link>
              </div>
            </nav>
          </aside>
          
          
          <div id="content">
            <SampleDashboardContent />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashBoard;