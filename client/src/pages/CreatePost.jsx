import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    img_url: '',
    tags: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag !== '');

      const postData = {
        ...formData,
        tags: tagsArray,
      };

      const token = localStorage.getItem('adminToken');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post('http://localhost:3000/api/posts', postData, config);
      navigate('/');
    } catch (err) {
      console.error('Error creating post:', err);
      if (err.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to create post. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 tracking-tight">Create a New Post</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
              placeholder="Post Title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Image URL</label>
            <input
              type="url"
              name="img_url"
              value={formData.img_url}
              onChange={handleChange}
              required
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Tags (comma separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
              placeholder="React, MongoDB, Web Dev"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-white/70">
                Content (Markdown Supported)
              </label>
              <div className="flex items-center gap-4">
                {/* Markdown hints */}
                <div className="text-xs text-white/40 flex gap-3">
                  <span><code className="text-cyan-400">**bold**</code></span>
                  <span><code className="text-cyan-400">`code`</code></span>
                  <span><code className="text-cyan-400">```block```</code></span>
                  <span><code className="text-cyan-400">![alt](url)</code></span>
                </div>
                {/* Preview toggle */}
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="text-xs font-medium px-3 py-1 rounded-md border border-white/10 bg-white/5 text-cyan-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
                >
                  {showPreview ? '✎ Edit' : '👁 Preview'}
                </button>
              </div>
            </div>

            {showPreview ? (
              <div className="w-full min-h-[288px] bg-white/5 border border-cyan-500/30 rounded-lg px-4 py-3 text-white/80 prose prose-invert max-w-none text-sm leading-relaxed">
                {formData.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkBreaks]}
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="relative my-4 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117]">
                          <div className="flex items-center px-4 py-2 bg-white/5 border-b border-white/5">
                            <div className="flex space-x-2">
                              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                            </div>
                          </div>
                          <pre className="p-4 overflow-x-auto text-sm font-mono text-cyan-200" {...props} />
                        </div>
                      ),
                      // FIX: use the `inline` prop
                      code: ({ node, inline, className, children, ...props }) => {
                        return inline ? (
                          <code
                            className="bg-white/10 text-cyan-300 px-1.5 py-0.5 rounded-md font-mono text-sm border border-white/5"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {formData.content}
                  </ReactMarkdown>
                ) : (
                  <p className="text-white/30 italic">Nothing to preview yet...</p>
                )}
              </div>
            ) : (
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows="12"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-y"
                placeholder={`# My CTF Walkthrough\n\nHere is how I solved the challenge...\n\n\`\`\`python\nprint('Hello Flag')\n\`\`\``}
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;