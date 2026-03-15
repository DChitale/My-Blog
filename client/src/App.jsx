import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');



  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;