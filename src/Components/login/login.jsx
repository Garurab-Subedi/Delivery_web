import React, { useState } from "react";
import "./Login.css";
import BackgroundImg from "../../Photos/backgroundimg.png";

const Login = () => {
  const [isExistingUser, setIsExistingUser] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  //user check
  const checkUserExists = (username) => username === "testuser";

  // Handle login/registration
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isExistingUser) {
      if (name && password) {
        if (checkUserExists(name)) {
          alert("Login successful!");
          window.location.href = "/";
        } else {
          alert("Invalid username or password.");
        }
      } else {
        alert("Please enter username and password.");
      }
    } else {
      if (name && password && email && address) {
        alert(`Registration successful!\nWelcome, ${name}!`);
        window.location.href = "/";
      } else {
        alert("Please fill in all fields.");
      }
    }
  };

  return (
    <div className="login-container">
      <img src={BackgroundImg} alt="Background" className="background-image" />

      <div className="login-box">
        <h2>{isExistingUser ? "Login" : "New User Registration"}</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Password */}
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Forgot password */}
          {isExistingUser && (
            <p
              className="forgot-password"
              onClick={() => alert("Password reset feature coming soon!")}
            >
              Forgot Password?
            </p>
          )}

          {/* Registration fields for new user */}
          {!isExistingUser && (
            <>
              <label>Address</label>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />

              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="login-btn">
            {isExistingUser ? "Login" : "Register"}
          </button>

          <p className="toggle-text">
            {isExistingUser ? "New user? " : "Already have an account? "}
            <span
              className="toggle-link"
              onClick={() => {
                setIsExistingUser(!isExistingUser);
              }}
            >
              {isExistingUser ? "Register" : "Login"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
