import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';
import { Coffee, Lock, User } from 'lucide-react';
import './LoginPage.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore(state => state.setUser);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const normalizedUsername = username.trim().toLowerCase();
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: normalizedUsername, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Invalid username or password.');
        return;
      }

      localStorage.setItem('token', data.token);
      
      const userToStore = {
        ...data.user,
        name: data.user.username.charAt(0).toUpperCase() + data.user.username.slice(1)
      };

      login(userToStore);
      
      if (data.user.role === 'Barista') {
        navigate('/orders');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Cannot connect to server');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <Coffee size={40} className="login-icon" />
          <h2>BrewPOS</h2>
          <p>Login to your account</p>
        </div>

        {error && <p className="login-error">{error}</p>}
        {!error && <p className="login-hint">Try: admin/admin123, cashier/cashier123, barista/barista123</p>}

        <form onSubmit={handleLogin} className="login-form">
          <div className="input-group">
            <User size={20} className="input-icon" />
            <input 
              type="text" 
              placeholder="Username" 
              value={username}
              onChange={(e) => {setUsername(e.target.value); setError('');}}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              required
            />
          </div>
          <div className="input-group">
            <Lock size={20} className="input-icon" />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => {setPassword(e.target.value); setError('');}}
              required
            />
          </div>
          <button type="submit" className="login-btn">Log In</button>
        </form>
      </div>
    </div>
  );
}
