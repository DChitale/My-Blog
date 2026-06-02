import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));

const App = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#111] text-text-primary flex flex-col items-center justify-center gap-4">
        {/* Sleek Minimal Loading Indicator */}
        <div className="w-8 h-8 rounded-full border-2 border-orange-500/20 border-t-orange-500 animate-spin"></div>
        <span className="text-xs font-semibold tracking-wider uppercase text-text-sub select-none">Loading...</span>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  );
};

export default App;