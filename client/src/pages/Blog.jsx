import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';
import Footer from '../components/Footer';

// Pick any highlight.js theme you like from:
// https://highlightjs.org/examples
// e.g. 'github-dark', 'atom-one-dark', 'tokyo-night-dark', 'nord'
import 'highlight.js/styles/github-dark.css';

const Blog = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/slug/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | HexNotes`;
      
      const plainText = post.content.replace(/[#*`~>\[\]]/g, '').replace(/\n/g, ' ').trim();
      const desc = plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
      
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = desc;
    } else {
      document.title = 'HexNotes | Awesome Tech Hacks, Android, Windows & Linux Tweaks';
      
      let meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.content = 'Discover awesome tech hacks, system optimizations, customization tricks, and powerful workarounds across Android, Windows, and Linux.';
      }
    }
  }, [post]);

  if (loading) return <div className="text-text-main text-center mt-20">Loading...</div>;
  if (!post && slug) return <div className="text-text-main text-center mt-20">Post not found</div>;

  return (
    <div className="min-h-screen text-text-main bg-bg-main flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {slug && post ? (
          <div className="max-w-4xl mx-auto px-6 py-12">
            <Link to="/" className="text-text-muted hover:text-text-main mb-8 inline-block transition-colors">
              ← Back to Home
            </Link>

            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-text-main">{post.title}</h1>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags?.map((tag, i) => (
                  <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-bg-card text-text-sub border border-border-main">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-sm text-text-muted mb-8">
                Published on {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="w-full mb-10 overflow-hidden border border-border-main rounded-2xl">
              {post.img_url && (
                <img src={post.img_url} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
              )}
            </div>

            <div className="prose dark:prose-invert max-w-none text-text-sub leading-relaxed text-lg pb-16">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 tracking-tight text-text-main" {...props} />,
                  h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 tracking-tight text-text-main border-b border-border-main pb-2" {...props} />,
                  h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-text-main" {...props} />,
                  p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                  ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 text-text-sub" {...props} />,
                  ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-text-sub" {...props} />,
                  li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                  a: ({ node, ...props }) => <a className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 underline decoration-cyan-500/30 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                  blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-cyan-500/50 pl-4 py-1 italic bg-bg-card rounded-r-lg my-4 text-text-sub" {...props} />,
                  pre: ({ node, children, ...props }) => (
                    <CopyableCodeBlock {...props}>{children}</CopyableCodeBlock>
                  ),
                  // FIX: use inline prop to distinguish block vs inline code
                  code: ({ node, inline, className, children, ...props }) => {
                    return inline ? (
                      <code
                        className="bg-bg-card text-cyan-700 dark:text-cyan-300 px-1.5 py-0.5 rounded-md font-mono text-sm border border-border-main"
                        {...props}
                      >
                        {children}
                      </code>
                    ) : (
                      // Block code — rehype-highlight adds language classes here
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ node, ...props }) => (
                    <img className="max-w-full h-auto rounded-xl border border-border-main my-6 shadow-lg mx-auto" {...props} />
                  ),
                  table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table className="w-full text-left border-collapse" {...props} /></div>,
                  thead: ({ node, ...props }) => <thead className="bg-bg-card text-text-sub border-b border-border-main" {...props} />,
                  th: ({ node, ...props }) => <th className="p-3 font-semibold" {...props} />,
                  td: ({ node, ...props }) => <td className="p-3 border-b border-border-main" {...props} />,
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-2xl font-bold">Blog Page</h2>
            <p className="text-text-muted mt-2">Select a blog from the home page.</p>
          </div>
        )}
      </main>

      <Footer />

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full border border-border-main bg-bg-card/90 backdrop-blur-sm text-text-sub hover:text-accent-main hover:border-accent-main shadow-lg transition-all duration-300 cursor-pointer ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </div>
  );
};

// ── Copy button wrapper for code blocks ─────────────────────────────────────
const CopyableCodeBlock = ({ children, ...props }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const codeText = extractText(children);
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="relative my-6 rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] group">
      {/* Traffic light dots + copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-white/40 hover:text-white/80 transition-colors px-2 py-0.5 rounded border border-white/10 hover:border-white/30 font-mono"
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm" {...props}>
        {children}
      </pre>
    </div>
  );
};

// Recursively extract plain text from React children
const extractText = (children) => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children?.props?.children) return extractText(children.props.children);
  return '';
};

export default Blog;