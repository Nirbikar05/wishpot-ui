import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';  // HomePage component
import LoginForm from './components/LoginForm';  // LoginForm component
import RegisterForm from './components/RegisterForm';  // RegisterForm component
import './App.css';  // Global styles

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* HomePage is the landing page */}
          <Route path="/" element={<HomePage />} />
          {/* Define Routes for login and register */}
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
