import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { username, password };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Login successful: ${JSON.stringify(result)}`);
      } else {
        const error = await response.json();
        alert(`Login failed: ${error.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login request failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username"><b>Username</b></label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password"><b>Password</b></label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="login-button">Login</button>

      <p>
        <b>Don't have an account?</b> <Link to="/register"><b>Register here</b></Link>
      </p>
    </form>
  );
};

export default LoginForm;
