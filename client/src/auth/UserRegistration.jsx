import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import WEB_URL from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  FaUser, FaMapMarkerAlt, FaCity, FaPhone, FaEnvelope, FaLock, FaCheck, FaEye, FaEyeSlash 
} from 'react-icons/fa';

const UserRegistration = () => {
  const [input, setInput] = useState({});
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/home");
    }
  }, []);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const api = `${WEB_URL}/user/usersave`;

    try {
      const response = await axios.post(api, input);
      toast.success("Registration Successful!", { position: "bottom-right", autoClose: 3000 });
      navigate("/userlogin");
    } catch (error) {
      toast.error("Registration Failed", { position: "bottom-right", autoClose: 3000 });
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="registration-header">
          <h2>Create Account</h2>
          <p>Join E-Store </p>
        </div>
        
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group full-width">
              <div className="input-icon-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={input.name || ""}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <div className="input-icon-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="address"
                  placeholder="Shipping Address"
                  value={input.address || ""}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row two-column">
            <div className="form-group">
              <div className="input-icon-wrapper">
                <FaCity className="input-icon" />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={input.city || ""}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon-wrapper">
                <FaPhone className="input-icon" />
                <input
                  type="text"
                  name="contact"
                  placeholder="Contact No."
                  value={input.contact || ""}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <div className="input-icon-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={input.email || ""}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="form-row">
            <div className="form-group full-width">
              <div className="input-icon-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={input.password || ""}
                  onChange={handleInput}
                  required
                />
                <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="form-row">
            <div className="form-group full-width">
              <div className="input-icon-wrapper">
                <FaCheck className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={input.confirmPassword || ""}
                  onChange={handleInput}
                  required
                />
                <span className="password-toggle-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>

          <button type="submit" className="registration-button">
            Create Account
          </button>
        </form>

        <div className="registration-footer">
          <p>Already have an account? <Link to="/userlogin">Sign In</Link></p>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
        .registration-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          padding: 20px;
          background-color: #f5f7fa;
          margin-top:50px;
        }

        .registration-card {
          width: 100%;
          max-width: 520px;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          padding: 40px;
        }

        .registration-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .registration-header h2 {
          color: #2C3E50;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .registration-header p {
          color: #7f8c8d;
          font-size: 16px;
        }

        .registration-form {
          margin-bottom: 25px;
        }

        .form-row {
          margin-bottom: 15px;
          display: flex;
          flex-direction: column;
        }

        .two-column {
          flex-direction: row;
          gap: 15px;
        }

        .form-group {
          margin-bottom: 5px;
          flex: 1;
        }

        .full-width {
          width: 100%;
        }

        .input-icon-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          background-color: #f9f9f9;
          transition: all 0.3s ease;
        }

        .input-icon-wrapper:focus-within {
          border-color: #3498db;
          box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
          background-color: #fff;
        }

        .input-icon {
          color: #7f8c8d;
          font-size: 18px;
          margin: 0 15px;
        }

        .input-icon-wrapper input {
          flex: 1;
          border: none;
          outline: none;
          padding: 15px;
          font-size: 16px;
          background-color: transparent;
          color: #2c3e50;
          width: 100%;
        }

        ::placeholder {
          color: #95a5a6;
        }

        .registration-button {
          width: 100%;
          padding: 16px;
          background-color: #2C3E50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 10px;
        }

        .registration-button:hover {
          background-color: #1a2530;
        }

        .registration-footer {
          text-align: center;
          color: #7f8c8d;
          font-size: 15px;
        }

        .registration-footer a {
          color: #3498db;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .registration-footer a:hover {
          color: #2980b9;
        }

        .password-toggle-icon {
          position: absolute;
          right: 15px;
          cursor: pointer;
          color: #7f8c8d;
          font-size: 18px;
        }

        .password-toggle-icon:hover {
          color: #2C3E50;
        }

        @media (max-width: 768px) {
          .two-column {
            flex-direction: column;
            gap: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default UserRegistration;
