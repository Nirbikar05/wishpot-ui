import React from 'react';
import LoginForm from '../components/LoginForm';  // Adjusted path to components folder
import RegisterForm from '../components/RegisterForm';  // Adjusted path to components folder
import './AuthPage.css'; // Styling for the AuthPage

const AuthPage = () => {
  return (
    <div className="auth-container">
      <div className="form-wrapper">
        <LoginForm />
      </div>
      <div className="form-wrapper">
        <RegisterForm />
      </div>
    </div>
  );
};

export default AuthPage;
