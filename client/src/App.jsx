import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import axios from 'axios';

const App = () => {
  const [message, setMessage] = useState('');



  return (
    <div>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;