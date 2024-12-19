import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterFrom.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_BASE_URL = "http://localhost:8080/api/auth";
  const navigate = useNavigate(); // React Router's navigation hook

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }

    if (username.length < 3 || username.length > 30) {
      alert("Username must be between 3 and 30 characters.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      setIsLoading(false);

      if (response.ok) {
        alert("Registration successful. OTP sent to your email.");
        setIsOtpSent(true);
      } else {
        const error = await response.text();
        alert(`Registration failed: ${error}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during registration:", error);
      alert("Registration request failed. Please try again.");
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
  
    const { email, password, username } = formData; // Extract both username and email
  
    if (otp.length !== 6) {
      alert("OTP must be 6 digits.");
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`${API_BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password, username }), // Ensure both username and email are passed
      });
  
      setIsLoading(false);
  
      if (response.ok) {
        alert("OTP verified successfully. Redirecting to login...");
        navigate("/login"); // Redirect to login page
      } else {
        const error = await response.text();
        alert(`OTP verification failed: ${error}`);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during OTP verification:", error);
      alert("OTP verification request failed. Please try again.");
    }
  };
  

  return (
    <div className="register-container">
      {!isOtpSent ? (
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username"><b>Username</b></label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              minLength={3}
              maxLength={30}
              placeholder="Enter username (3-30 characters)"
            />
          </div>
          <div>
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password"><b>Password</b></label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength={8}
              placeholder="Enter password (min 8 characters)"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              placeholder="Confirm your password"
            />
          </div>
          <button type="submit" className="register-button" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </button>

          <p>
            <b>Already have an account?</b> <Link to="/login"><b>Login here</b></Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleOtpVerification}>
          <div>
            <label htmlFor="email"><b>Email</b></label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              readOnly
              required
            />
          </div>
          <div>
            <label htmlFor="otp"><b>Enter OTP</b></label>
            <input
              type="number"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              minLength={6}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
            />
          </div>
          <button type="submit" className="otp-button" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Submit OTP"}
          </button>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
