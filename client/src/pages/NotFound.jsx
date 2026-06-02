import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  useEffect(() => {
    document.title = '404: Page Not Found | HexNotes';
    
    // Inject noindex to prevent Google Search Console soft 404 errors
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      robotsMeta.content = 'noindex';
      document.head.appendChild(robotsMeta);
    }

    return () => {
      // Clean up on unmount
      const robotsMeta = document.querySelector('meta[name="robots"]');
      if (robotsMeta) {
        robotsMeta.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen text-text-main bg-bg-main flex flex-col">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center gap-6 py-24 px-6 text-center">
        {/* Subtle glow background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_top,var(--color-accent-main),transparent_60%)]" />

        <div className="flex flex-col items-center gap-2">
          <span className="text-8xl font-black tracking-widest text-accent-main select-none animate-pulse">404</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">System Error: Page Not Found</h1>
        </div>

        <p className="text-sm text-text-sub max-w-md leading-relaxed">
          The address you requested does not map to any active routes. It might have been deleted, moved, or misspelled.
        </p>

        <Link 
          to="/" 
          className="mt-4 px-6 py-3 rounded-full border border-border-main bg-bg-card hover:bg-bg-main text-xs font-bold tracking-wider uppercase transition-all shadow-xs"
        >
          ← Return to Terminal
        </Link>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
