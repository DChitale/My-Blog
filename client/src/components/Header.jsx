import React from 'react';

const Header = () => {
  return (
    <div className="relative pt-12 pb-16 overflow-hidden">
      {/* Subtle top glow background matching mockup */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-45 dark:opacity-20 bg-[radial-gradient(ellipse_at_top,var(--color-accent-main),transparent_60%)]" />

      <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-6">
        
       

        {/* Large Title (reverted to old style, uppercase all) */}
        <h1 className="text-4xl sm:text-6xl font-black tracking- text-text-main leading-tight sm:leading-none max-w-2xl">
          Tech Insights & Hacks
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base leading-relaxed text-text-sub max-w-xl">
          A collection of deep dives, software tutorials, and tech insights to navigate the digital landscape. Crafted for developers, engineers, and tech enthusiasts.
        </p>

      </div>
    </div>
  );
};

export default Header;