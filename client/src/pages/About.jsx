import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Github, Twitter, Mail, Smartphone, Monitor, Terminal, Cpu } from 'lucide-react';

const About = () => {
  useEffect(() => {
    document.title = 'About HexNotes | Tech Hacks & System Optimization';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content = 'Learn about HexNotes, our mission to share awesome tech hacks, customized system modifications, and power-user guides for Android, Windows, and Linux.';
    }
  }, []);

  return (
    <div className="min-h-screen text-text-main bg-bg-main flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-6 py-16">
        {/* Subtle top glow background matching mockup */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 pointer-events-none opacity-45 dark:opacity-20 bg-[radial-gradient(ellipse_at_top,var(--color-accent-main),transparent_60%)]" />

        {/* Hero Section */}
        <div className="flex flex-col items-center text-center gap-6 mb-16">
         
          
          <h1 className="text-4xl sm:text-5xl font-black ">
            About HexNotes
          </h1>
          
          <p className="text-sm sm:text-base leading-relaxed text-text-sub max-w-xl">
            A tech hub dedicated to discovering awesome tech hacks, system optimizations, customization tricks, and powerful workarounds across Android, Windows, and Linux.
          </p>

          {/* Social Badges */}
          {/* <div className="flex items-center gap-4 text-text-sub mt-2">
            <a href="https://github.com/DChitale" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-main bg-bg-card hover:bg-bg-main text-xs font-semibold hover:text-accent-main transition-all shadow-xs">
              <Github size={14} /> GitHub
            </a>
            <a href="https://x.com/DChitale91431" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-main bg-bg-card hover:bg-bg-main text-xs font-semibold hover:text-accent-main transition-all shadow-xs">
              <Twitter size={14} /> Twitter
            </a>
            <a href="mailto:chitaledhananjay70@gmail.com" className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-main bg-bg-card hover:bg-bg-main text-xs font-semibold hover:text-accent-main transition-all shadow-xs">
              <Mail size={14} /> Email
            </a>
          </div> */}
        </div>

        {/* Content Body */}
        <div className="space-y-12">
          
          {/* Biography Paragraphs */}
          <section className="prose dark:prose-invert max-w-none text-text-sub leading-relaxed text-base">
            <h2 className="text-xl font-bold text-text-main mb-4  uppercase">The Mission & Journey</h2>
            <p className="mb-4">
              Welcome to <strong>HexNotes</strong>! This platform is dedicated to sharing awesome tech hacks, customized system modifications, and power-user guides to help you fully command your hardware. We believe that technology shouldn't just be used out-of-the-box—it should be tailored, optimized, and pushed to its absolute limits.
            </p>
            <p>
              From debloating operating systems and tweaking registries to automating tasks and sideloading custom utilities, HexNotes provides clean, straightforward, and actionable walkthroughs. No matter your level of experience, you'll discover useful tricks to master your devices.
            </p>
          </section>

          {/* What I Cover Section */}
          <section>
            <h2 className="text-xl font-bold text-text-main mb-6 tracking-tight uppercase">What I Cover</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Card 1 */}
              <div className="p-5 rounded-2xl border border-border-main bg-bg-card flex gap-4">
                <div className="text-orange-500 shrink-0 mt-1">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Android Tweaks</h3>
                  <p className="text-xs text-text-sub leading-relaxed">
                    Sideloading custom tools, debloating mobile layouts, automation setups, and maximizing mobile workflow efficiency.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="p-5 rounded-2xl border border-border-main bg-bg-card flex gap-4">
                <div className="text-orange-500 shrink-0 mt-1">
                  <Monitor size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Windows Optimization</h3>
                  <p className="text-xs text-text-sub leading-relaxed">
                    Registry adjustments, performance enhancements, script-based cleanup tools, and power-user customization.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="p-5 rounded-2xl border border-border-main bg-bg-card flex gap-4">
                <div className="text-orange-500 shrink-0 mt-1">
                  <Terminal size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Linux Automation</h3>
                  <p className="text-xs text-text-sub leading-relaxed">
                    Shell scripting guides, dotfile configurations, command-line utilities, and custom desktop workspace tweaking.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="p-5 rounded-2xl border border-border-main bg-bg-card flex gap-4">
                <div className="text-orange-500 shrink-0 mt-1">
                  <Cpu size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-text-main mb-1.5">Hardware & Tweaks</h3>
                  <p className="text-xs text-text-sub leading-relaxed">
                    Home lab networking tricks, hardware modding tips, custom firmware flashes, and security workarounds.
                  </p>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
