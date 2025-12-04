import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validation
    if (!name || !email || !password) {
      setError('Name, email, and password are required');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      if (!API_BASE_URL) {
        // Offline mode - store in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
          setError('Email already exists');
          return;
        }
        users.push({ name, email, password, phone, id: Date.now() });
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({ name, email }));
        alert('Registration successful! (Offline mode)');
        navigate('/dashboard');
        return;
      }
      
      const response = await axios.post(`${API_BASE_URL}/api/register`, { name, email, password, phone });
      alert('Registration successful!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err);
      // Fallback to offline mode
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.find(u => u.email === email)) {
        setError('Email already exists');
        return;
      }
      users.push({ name, email, password, phone, id: Date.now() });
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify({ name, email }));
      alert('Registration successful! (Offline mode)');
      navigate('/dashboard');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h4" mb={3}>Sign Up</Typography>

      {error && <Typography color="error" mb={2}>{error}</Typography>}

      <TextField fullWidth label="Name" value={name} onChange={e => setName(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Email" value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Phone" value={phone} onChange={e => setPhone(e.target.value)} sx={{ mb: 3 }} />

      <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
    </Box>
  );
};

export default RegisterScreen;
