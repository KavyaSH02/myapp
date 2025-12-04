import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import SwitchRack from './components/SwitchRack';
import WorkStation from './components/WorkStation';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/switch-rack" element={<ProtectedRoute><SwitchRack /></ProtectedRoute>} />
        <Route path="/work-station" element={<ProtectedRoute><WorkStation /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
