import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 10, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h4" mb={3}>Login</Typography>

      {error && <Typography color="error" mb={2}>{error}</Typography>}

      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Button variant="contained" fullWidth onClick={handleLogin}>Sign In</Button>

      <Typography mt={2} variant="body2">
        Don’t have an account? <Link href="/register">Sign Up</Link>
      </Typography>
    </Box>
  );
};

export default LoginScreen;
