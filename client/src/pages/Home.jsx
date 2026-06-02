import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogCard from '../components/BlogCard'
import Footer from '../components/Footer'

const Home = () => {
  useEffect(() => {
    document.title = 'HexNotes | Awesome Tech Hacks, Android, Windows & Linux Tweaks';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) {
      meta.content = 'Discover awesome tech hacks, system optimizations, registry tweaks, shell scripting guides, and custom configurations for Android, Windows, and Linux.';
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-text-main">
        <Navbar/>
        <main className="flex-grow">
          <Header />
          <BlogCard/>
         
        </main>
        <Footer />
    </div>
  )
}

export default Home