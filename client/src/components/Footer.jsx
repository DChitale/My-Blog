import React from "react";
import { Link } from "react-router-dom";
import { Github, Twitter, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full max-w-7xl mx-auto px-6 pt-16 pb-8 border-t border-border-main text-text-main">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12 mb-12">
        
        {/* Brand Column (Left) */}
        <div className="md:col-span-2 flex flex-col gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5">
            
            <span className="text-xl font-bold tracking-tight text-text-main">Hex {'>'} Notes</span>
          </div>
          
          {/* Brand Description */}
          <p className="text-xs text-text-sub leading-relaxed max-w-sm">
            Discover technical articles, software tutorials, and engineering insights on HexNotes. A platform designed for developers, students, and tech enthusiasts.
          </p>
          
          {/* Social Icons
          <div className="flex items-center gap-4 mt-2 text-text-sub">
            <a href="https://github.com/DChitale" target="_blank" rel="noopener noreferrer" className="hover:text-accent-main transition-colors">
              <Github size={18} />
            </a>
            <a href="https://x.com/DChitale91431" target="_blank" rel="noopener noreferrer" className="hover:text-accent-main transition-colors">
              <Twitter size={18} />
            </a>
            <a href="mailto:chitaledhananjay70@gmail.com" className="hover:text-accent-main transition-colors">
              <Mail size={18} />
            </a>
            <a href="#" className="hover:text-accent-main transition-colors">
              <Linkedin size={18} />
            </a>
          </div> */}

        </div>

        {/* Column 1: Explore */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">Explore</h4>
          <div className="flex flex-col gap-2.5 text-xs text-text-sub">
            <Link to="/" className="hover:text-accent-main transition-colors">Home</Link>
            <a href="/#articles" className="hover:text-accent-main transition-colors">Articles</a>
            <Link to="/about" className="hover:text-accent-main transition-colors">About</Link>
          </div>
        </div>

        {/* Column 2: Categories */}
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-text-main">Categories</h4>
          <div className="flex flex-col gap-2.5 text-xs text-text-sub">
            <a href="/#articles" className="hover:text-accent-main transition-colors">Android</a>
            <a href="/#articles" className="hover:text-accent-main transition-colors">Windows</a>
            <a href="/#articles" className="hover:text-accent-main transition-colors">Linux</a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright Area */}
      <div className="flex flex-col sm:flex-row items-center justify-between border-t border-border-main/50 pt-8 text-[11px] text-text-muted">
        <span>© {new Date().getFullYear()} HexNotes. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;