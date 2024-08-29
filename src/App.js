import React from 'react';
import { useSelector } from 'react-redux';
import Login from './components/auth/Login';
import Reels from './components/Reels/Reels';
import Chat from './components/Chat/Chat';
import './App.css'
import {  Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/NavBar';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login />
      ) : (
        <>
        <Navbar/>
         <Routes>
             <Route path="/" element={<Home />} />
              <Route path="/reels" element={<Reels />} />
              <Route path="/chats" element={<Chat />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
