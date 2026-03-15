import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const POSTS_PER_PAGE = 6

const tagColors = {
  Web:       "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  Pwn:       "bg-red-500/10 text-red-400 border border-red-500/20",
  Reversing: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  Forensics: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
}

const getTagStyle = (tag) => {
  for (const key in tagColors) {
    if (tag.toLowerCase().includes(key.toLowerCase())) return tagColors[key]
  }
  return "bg-white/10 text-white/60 border border-white/10"
}

const BlogCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goTo = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page)
  }

  return (
    <div className="text-white mb-10 mx-8 sm:mx-16 xl:mx-24">

      {/* Section heading */}
      <h2 className="text-2xl font-bold mb-6 tracking-tight">Latest Writeups</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/blog/${post._id}`)}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden
                         hover:border-white/25 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="overflow-hidden h-44">
              <img
                src={post.img_url}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, i) => (
                  <span key={i} className={`text-xs font-medium px-2.5 py-1 rounded-full ${getTagStyle(tag)}`}>
                    {tag}
                  </span>
                ))}
                </div>
                <h3 className="text-sm font-semibold leading-snug text-white/90 group-hover:text-white transition-colors">
                  {post.title}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-1 sm:col-span-2 lg:col-span-3 text-white/50 py-10 text-center">
            No posts found.
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">

          {/* Prev */}
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded-lg text-sm border border-white/10 text-white/50
                       hover:border-white/30 hover:text-white disabled:opacity-25
                       disabled:cursor-not-allowed transition-all duration-200"
          >
            ← Prev
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goTo(page)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200
                ${currentPage === page
                  ? "bg-white text-black"
                  : "border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 rounded-lg text-sm border border-white/10 text-white/50
                       hover:border-white/30 hover:text-white disabled:opacity-25
                       disabled:cursor-not-allowed transition-all duration-200"
          >
            Next →
          </button>

        </div>
      )}

      {/* Page info */}
      <p className="text-center text-xs text-white/30 mt-3">
        Page {currentPage} of {totalPages || 1} · {posts.length} writeups
      </p>

    </div>
  )
}

export default BlogCard