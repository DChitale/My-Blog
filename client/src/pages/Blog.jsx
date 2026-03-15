import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import rehypeHighlight from 'rehype-highlight';

// Pick any highlight.js theme you like from:
// https://highlightjs.org/examples
// e.g. 'github-dark', 'atom-one-dark', 'tokyo-night-dark', 'nord'
import 'highlight.js/styles/github-dark.css';

const Blog = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPost();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (!post && id) return <div className="text-white text-center mt-20">Post not found</div>;

  return (
    <div className="min-h-screen text-white">
      <Navbar />

      {id && post ? (
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link to="/" className="text-white/50 hover:text-white mb-8 inline-block transition-colors">
            ← Back to Home
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{post.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags?.map((tag, i) => (
                <span key={i} className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/80 border border-white/20">
                  {tag}
                </span>
              ))}
            </div>

            <div className="text-sm text-white/50 mb-8">
              Published on {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="w-full mb-10 overflow-hidden border border-white/10 rounded-2xl">
            {post.img_url && (
              <img src={post.img_url} alt={post.title} className="w-full h-auto object-cover max-h-[500px]" />
            )}
          </div>

          <div className="prose prose-invert max-w-none text-white/80 leading-relaxed text-lg pb-16">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-8 mb-4 tracking-tight text-white" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 tracking-tight text-white border-b border-white/10 pb-2" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-white/90" {...props} />,
                p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 text-white/80" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 text-white/80" {...props} />,
                li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                a: ({ node, ...props }) => <a className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,
                blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-cyan-500/50 pl-4 py-1 italic bg-white/5 rounded-r-lg my-4 text-white/60" {...props} />,
                pre: ({ node, children, ...props }) => (
                  <CopyableCodeBlock {...props}>{children}</CopyableCodeBlock>
                ),
                // FIX: use inline prop to distinguish block vs inline code
                code: ({ node, inline, className, children, ...props }) => {
                  return inline ? (
                    <code
                      className="bg-white/10 text-cyan-300 px-1.5 py-0.5 rounded-md font-mono text-sm border border-white/5"
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
                  <img className="max-w-full h-auto rounded-xl border border-white/10 my-6 shadow-lg mx-auto" {...props} />
                ),
                table: ({ node, ...props }) => <div className="overflow-x-auto my-6"><table className="w-full text-left border-collapse" {...props} /></div>,
                thead: ({ node, ...props }) => <thead className="bg-white/5 text-white/90 border-b border-white/10" {...props} />,
                th: ({ node, ...props }) => <th className="p-3 font-semibold" {...props} />,
                td: ({ node, ...props }) => <td className="p-3 border-b border-white/5" {...props} />,
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">Blog Page</h2>
          <p className="text-white/50 mt-2">Select a blog from the home page.</p>
        </div>
      )}
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