import { useContext, useState } from "react";
import axiosInstance from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

export default function Login() {
  const { login } = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  // Login states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register states
  const [name, setName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");

const handleLogin = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);

  try {
    const res = await axiosInstance.post("/auth/login.php", formData);

    if (!res.data.success) {
      alert(res.data.message);
      return;
    }

    const userObj = {
      name: "User",
      role: res.data.role,
    }
    login(res.data.token, userObj);
    
    alert("Login Successful");
    window.location.href = "/";
  } catch (err) {
    alert("Login Failed");
  }
};


  /* ------------------- REGISTER ------------------- */
const handleRegister = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("fullName", name);
  formData.append("email", regEmail);
  formData.append("password", regPassword);

  try {
    const res = await axiosInstance.post("/auth/register.php", formData);

    alert(res.data.message);

    if (res.data.success) setIsLoginMode(true);
  } catch (err) {
    alert("Registration failed");
  }
};


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">
          {isLoginMode ? "Welcome Back 👋" : "Create Account 🎉"}
        </h2>
        <p className="auth-subtitle">
          {isLoginMode
            ? "Login to continue your journey"
            : "Register to get started"}
        </p>

        {/* LOGIN FORM */}
        {isLoginMode && (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="auth-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-btn">Login</button>

            <p className="toggle-text">
              Don't have an account?
              <span onClick={() => setIsLoginMode(false)}> Register</span>
            </p>
          </form>
        )}

        {/* REGISTER FORM */}
        {!isLoginMode && (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="auth-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="auth-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create Password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <button className="auth-btn">Register</button>

            <p className="toggle-text">
              Already have an account?
              <span onClick={() => setIsLoginMode(true)}> Login</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
