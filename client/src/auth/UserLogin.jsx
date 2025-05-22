import { Link } from "react-router-dom";
import WEB_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaLock, FaUserShield, FaEye, FaEyeSlash } from 'react-icons/fa';
// import GoogleLogin from "../pages/GoogleLogin";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("username")) {
      navigate("/home");
    }
  }, [navigate]);

  const UserAuth = async (token) => {
    if (token) {
      try {
        let api = `${WEB_URL}/admin/adminauth`;
        const tokenres = await axios.post(api, null, { headers: { "auth-token": token } });
        localStorage.setItem("adminname", tokenres.data.adminname);
        localStorage.setItem("email", tokenres.data.email);
        navigate("/admin");
      } catch (error) {
        toast.error("Admin authentication failed", { position: "bottom-right", autoClose: 3000 });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let api;
    try {
      if (userRole === "user") {
        api = `${WEB_URL}/user/userlogin`;
      } else if (userRole === "admin") {
        api = `${WEB_URL}/admin/adminlogin`;
      } else {
        toast.error("Please select a role", { position: "bottom-right", autoClose: 3000 });
        return;
      }

      const response = await axios.post(api, { email, password });
      toast.success("Login Successful!", { position: "bottom-right", autoClose: 3000 });

      localStorage.setItem("token", response.data.token);

      if (userRole === "user") {
        navigate("/home");
      } else if (userRole === "admin") {
        UserAuth(response.data.token);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data.msg : "Login failed", { position: "bottom-right", autoClose: 3000 });
    }
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: 20,
      backgroundColor: "#f5f7fa",
      marginTop: 50,
    },
    card: {
      width: "100%",
      maxWidth: 420,
      backgroundColor: "#ffffff",
      borderRadius: 12,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      padding: 50,
    },
    header: {
      textAlign: "center",
      marginBottom: 30,
    },
    headerTitle: {
      color: "#2C3E50",
      fontSize: 28,
      fontWeight: 700,
      marginBottom: 8,
    },
    headerSubtitle: {
      color: "#7f8c8d",
      fontSize: 16,
    },
    form: {
      marginBottom: 25,
    },
    formGroup: {
      marginBottom: 20,
    },
    inputWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      border: "1px solid #e0e0e0",
      borderRadius: 8,
      backgroundColor: "#f9f9f9",
      transition: "all 0.3s ease",
    },
    icon: {
      color: "#7f8c8d",
      fontSize: 18,
      margin: "0 15px",
    },
    input: {
      flex: 1,
      border: "none",
      outline: "none",
      padding: 15,
      fontSize: 16,
      backgroundColor: "transparent",
      color: "#2c3e50",
      width: "100%",
    },
    select: {
      flex: 1,
      border: "none",
      outline: "none",
      padding: 15,
      paddingRight: 30,
      fontSize: 16,
      backgroundColor: "transparent",
      color: "#2c3e50",
      width: "100%",
      appearance: "none",
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%237f8c8d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 10px center",
      backgroundSize: 20,
      cursor: "pointer",
    },
    passwordToggle: {
      position: "absolute",
      right: 15,
      color: "#7f8c8d",
      fontSize: 18,
      cursor: "pointer",
    },
    loginBtn: {
      width: "100%",
      padding: 16,
      backgroundColor: "#2C3E50",
      color: "white",
      border: "none",
      borderRadius: 8,
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    footer: {
      textAlign: "center",
      color: "#7f8c8d",
      fontSize: 15,
    },
    link: {
      color: "#3498db",
      textDecoration: "none",
      fontWeight: 600,
    },
    forgot: {
      display: "block",
      marginTop: 10,
      fontSize: 14,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.headerTitle}>Welcome Back</h2>
          <p style={styles.headerSubtitle}>Sign in to your account</p>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <div style={styles.inputWrapper}>
              <FaUser style={styles.icon} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <div style={styles.inputWrapper}>
              <FaLock style={styles.icon} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
              />
              <span style={styles.passwordToggle} onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <div style={styles.formGroup}>
            <div style={styles.inputWrapper}>
              <FaUserShield style={styles.icon} />
              <select
                name="userrole"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                required
                style={styles.select}
              >
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <button type="submit" style={styles.loginBtn}>
            Sign In
          </button>
        </form>

        <div style={styles.footer}>
          <p>Don't have an account? <Link to="/usersignup" style={styles.link}>Sign Up</Link></p>
          {/* <div><GoogleLogin /></div> */}
          <Link to="/forgot-password" style={{ ...styles.link, ...styles.forgot }}>Forgot Password?</Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
