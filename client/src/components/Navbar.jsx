import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    
    // Toggle corresponding classes
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 py-4 bg-transparent">
      {/* Floating capsule container */}
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl border border-border-main bg-bg-card/85 backdrop-blur-md transition-all duration-300 shadow-sm">
        
        {/* Brand Logo (Orange icon container + brand text) */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          
          <span className="text-xl font-bold tracking-tight text-text-main">Hex {'>'} Notes</span>
        </div>

        {/* Central Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="text-text-main hover:text-accent-main transition-colors">Home</Link>
          <a href="/#articles" className="text-text-sub hover:text-text-main transition-colors">Articles</a>
          <Link to="/about" className="text-text-sub hover:text-text-main transition-colors">About</Link>
        </div>

        {/* Action Buttons (Desktop Theme Switcher + Newsletter Button) */}
        <div className="hidden md:flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full border border-border-main bg-bg-card hover:bg-bg-main text-text-sub hover:text-text-main transition-all cursor-pointer shadow-2xs"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          
         
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-lg text-text-sub hover:text-text-main hover:bg-bg-card transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl px-2">
          <div className="bg-bg-card border border-border-main rounded-2xl p-4 shadow-lg flex flex-col gap-3 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-text-main hover:bg-bg-main transition-all">Home</Link>
            <a href="/#articles" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-text-sub hover:bg-bg-main hover:text-text-main transition-all">Articles</a>
            <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-text-sub hover:bg-bg-main hover:text-text-main transition-all">About</Link>
            
            <hr className="border-border-main my-1" />
            
            {/* Mobile Theme Toggle */}
            <div className="flex items-center justify-between px-3 py-2 text-text-sub">
              <span>Theme</span>
              <button 
                onClick={toggleTheme}
                className="p-2 rounded-full border border-border-main bg-bg-main text-text-sub hover:text-text-main transition-all cursor-pointer"
              >
                {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
