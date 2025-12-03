import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/dashboard';
import SwitchRack from './components/SwitchRack';
import WorkStation from './components/WorkStation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/switch-rack" element={<SwitchRack />} />
        <Route path="/work-station" element={<WorkStation />} />
      </Routes>
    </Router>
  );
}

export default App;
