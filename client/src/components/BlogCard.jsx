import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Globe, Terminal, Cpu, Search, FileText, Sparkles, Zap, Shield, ArrowRight, ChevronDown, Clock } from "lucide-react";

const getTagIcon = (tag) => {
  const t = tag.toLowerCase();
  if (t.includes('web')) return <Globe size={13} />;
  if (t.includes('pwn')) return <Terminal size={13} />;
  if (t.includes('reversing') || t.includes('rev')) return <Cpu size={13} />;
  if (t.includes('forensics')) return <Search size={13} />;
  if (t.includes('crypto')) return <Shield size={13} />;
  if (t.includes('spotlight')) return <Sparkles size={13} />;
  if (t.includes('updates')) return <Zap size={13} />;
  return <FileText size={13} />;
};

const BlogCard = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [showMoreTags, setShowMoreTags] = useState(false);
  const moreRef = useRef(null);
  const navigate = useNavigate();

  // Close More dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setShowMoreTags(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch initial posts once to populate unique tags list
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
        setAllPosts(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchInitialPosts();
  }, []);

  // Debounce search query input to avoid unnecessary backend calls
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch filtered posts from backend whenever active tag or search term changes
  useEffect(() => {
    // "All" with no search — show everything
    if (selectedTag === 'All' && !debouncedSearch) {
      setPosts(allPosts);
      return;
    }

    // "Recent" — show latest 6 posts (already sorted by createdAt desc)
    if (selectedTag === 'Recent' && !debouncedSearch) {
      setPosts(allPosts.slice(0, 6));
      return;
    }

    const fetchFilteredPosts = async () => {
      try {
        const params = {};
        if (selectedTag !== 'All' && selectedTag !== 'Recent') params.tag = selectedTag;
        if (debouncedSearch) params.search = debouncedSearch;

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, { params });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchFilteredPosts();
  }, [selectedTag, debouncedSearch, allPosts]);

  // Rank tags by frequency and split into visible (top 5) + overflow
  const tagCounts = {};
  allPosts.forEach(post => (post.tags || []).forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  }));
  const rankedTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag]) => tag);
  const MAX_VISIBLE_TAGS = 4;
  const visibleTags = rankedTags.slice(0, MAX_VISIBLE_TAGS);
  const overflowTags = rankedTags.slice(MAX_VISIBLE_TAGS);

  // Filtering is now performed directly by the backend database query
  const filteredPosts = posts;

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div id="articles" className="max-w-7xl mx-auto px-6 py-12 text-text-main">
      
      {/* Title & Section details */}
      <div className="flex flex-col gap-2 mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight text-text-main">All Articles</h2>
        <p className="text-sm text-text-sub max-w-xl leading-relaxed">
          Find technical articles, step-by-step coding tutorials and awesome tech-hacks
        </p>
      </div>

      {/* Filter and Search Bar Container */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-border-main pb-8">
        
        {/* Search Input */}
        <div className="relative w-full md:max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-text-muted">
            <Search size={16} />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(6); // Reset pagination on search
            }}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border-main bg-bg-card text-sm text-text-main focus:outline-none focus:border-accent-main transition-all placeholder:text-text-muted"
          />
        </div>

        {/* Dynamic Category Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* All pill */}
          <button
            onClick={() => { setSelectedTag('All'); setVisibleCount(6); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
              selectedTag === 'All'
                ? "bg-orange-500/10 text-orange-500 border-orange-500/35"
                : "bg-bg-card border-border-main text-text-sub hover:border-border-hover hover:text-text-main"
            }`}
          >
            <Sparkles size={13} /> All
          </button>

          {/* Recent pill */}
          <button
            onClick={() => { setSelectedTag('Recent'); setVisibleCount(6); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
              selectedTag === 'Recent'
                ? "bg-orange-500/10 text-orange-500 border-orange-500/35"
                : "bg-bg-card border-border-main text-text-sub hover:border-border-hover hover:text-text-main"
            }`}
          >
            <Clock size={13} /> Recent
          </button>

          {/* Top visible tags */}
          {visibleTags.map(tag => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => { setSelectedTag(tag); setVisibleCount(6); }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-orange-500/10 text-orange-500 border-orange-500/35"
                    : "bg-bg-card border-border-main text-text-sub hover:border-border-hover hover:text-text-main"
                }`}
              >
                {getTagIcon(tag)}
                {tag}
              </button>
            );
          })}

          {/* More dropdown for overflow tags */}
          {overflowTags.length > 0 && (
            <div className="relative" ref={moreRef}>
              <button
                onClick={() => setShowMoreTags(!showMoreTags)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold border transition-all shrink-0 cursor-pointer ${
                  overflowTags.includes(selectedTag)
                    ? "bg-orange-500/10 text-orange-500 border-orange-500/35"
                    : "bg-bg-card border-border-main text-text-sub hover:border-border-hover hover:text-text-main"
                }`}
              >
                More <ChevronDown size={13} className={`transition-transform ${showMoreTags ? 'rotate-180' : ''}`} />
              </button>
              {showMoreTags && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-bg-card border border-border-main rounded-xl p-1.5 shadow-lg z-40">
                  {overflowTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => { setSelectedTag(tag); setVisibleCount(6); setShowMoreTags(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        selectedTag === tag
                          ? "text-orange-500 bg-orange-500/10"
                          : "text-text-sub hover:bg-bg-main hover:text-text-main"
                      }`}
                    >
                      {getTagIcon(tag)}
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/blog/${post.slug || post._id}`)}
              className="group flex flex-col bg-bg-card border border-border-main  overflow-hidden
                         hover:border-border-hover hover:shadow-lg transition-all duration-300 cursor-pointer min-h-[420px]"
            >
              {/* Card Image */}
              <div className="overflow-hidden h-48 relative bg-zinc-900 flex items-center justify-center">
                {post.img_url ? (
                  <img
                    src={post.img_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                ) : (
                  <span className="text-text-muted text-xs">No cover image</span>
                )}
              </div>

              {/* Card Details */}
              <div className="p-5 flex flex-col flex-1 gap-3.5">
                
                {/* Meta details (First tag + Date) */}
                <div className="flex items-center gap-2 text-xs text-text-muted font-semibold">
                  <span className="flex items-center gap-1 text-accent-main uppercase tracking-wider">
                    {post.tags?.[0] && getTagIcon(post.tags[0])}
                    {post.tags?.[0] || "General"}
                  </span>
                  <span>·</span>
                  <span>
                    {new Date(post.createdAt).toLocaleDateString(undefined, {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                {/* Card Title */}
                <h3 className="text-base font-bold leading-snug text-text-main  transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt Snippet */}
                <p className="text-xs text-text-sub leading-relaxed line-clamp-3">
                  {post.content ? post.content.replace(/[#*`~>\[\]]/g, '').trim() : ""}
                </p>

                {/* Learn More link */}
                <div className="mt-auto pt-3 flex items-center gap-1 text-xs font-bold text-accent-main">
                  <span>Learn More</span>
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-text-muted py-20 text-center text-sm">
            No articles match your search or filter criteria.
          </div>
        )}
      </div>

      {/* View More Button (Mockup styling) */}
      {filteredPosts.length > visibleCount && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount(prev => prev + 6)}
            className="w-full max-w-md py-3.5 rounded-full border border-border-main bg-bg-card hover:bg-bg-main text-xs font-bold tracking-wider uppercase text-text-main transition-all cursor-pointer shadow-xs"
          >
            View More
          </button>
        </div>
      )}

      {/* Page Info */}
      <p className="text-center text-xs text-text-muted mt-5">
        Showing {displayedPosts.length} of {filteredPosts.length} articles
      </p>

    </div>
  );
};

export default BlogCard;