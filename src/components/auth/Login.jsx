import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import './Login.css';
import logo from '../../assets/social-sphere-logo.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') {
      dispatch(login({ username }));
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className='loginStyle'>
      <div className="logo-container">
        <img src={logo} alt="Social Sphere" className="logo" />
      </div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="login-button">Login</button>
    </div>
  );
};

export default Login;
