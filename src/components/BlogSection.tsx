import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, Tag, X, Code2, ArrowRight } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  return (
    <section id="blog" className="py-16 bg-[#fbfbfb] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              KNOWLEDGE ARCHIVE
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              07. 기술 블로그 &amp; 트러블슈팅 정리 (Tech Notes &amp; Insights)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            REF: BLOG_NOTES_2026
          </span>
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div
              key={post.id}
              onClick={() => setActivePost(post)}
              className="bg-white rounded-none border border-gray-200 hover:border-[#0055ff] p-5 shadow-2xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span className="px-2 py-0.5 rounded-none bg-[#0055ff]/10 text-[#0055ff] font-bold border border-[#0055ff]/20 uppercase">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#0055ff] transition-colors line-clamp-2 font-sans">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[9px] font-mono bg-gray-100 text-slate-600 border border-gray-200 px-1.5 py-0.5 rounded-none">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#0055ff] group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                  <span>아티클 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Viewer Modal */}
        {activePost && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-none max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 shadow-2xl p-6 relative font-sans space-y-5">
              
              <button
                onClick={() => setActivePost(null)}
                className="absolute top-4 right-4 p-1.5 bg-gray-100 hover:bg-gray-200 text-slate-600 transition-colors rounded-none"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2 border-b border-gray-200 pb-3 pr-10">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-[#0055ff] text-white font-bold uppercase tracking-wider rounded-none">
                    {activePost.category}
                  </span>
                  <span className="text-slate-500">{activePost.date}</span>
                  <span className="text-slate-500">• {activePost.readTime}</span>
                </div>

                <h2 className="text-xl font-bold text-slate-900 font-sans">
                  {activePost.title}
                </h2>
              </div>

              <div className="text-xs leading-relaxed space-y-3 whitespace-pre-line text-slate-700 font-sans">
                {activePost.content}
              </div>

              {activePost.codeSnippet && (
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 bg-[#1a1a1a] px-3.5 py-1.5 border-b border-slate-800">
                    <span className="flex items-center gap-2 text-slate-200 font-bold">
                      <Code2 className="w-3.5 h-3.5 text-[#0055ff]" />
                      {activePost.codeSnippet.filename}
                    </span>
                    <span>{activePost.codeSnippet.language}</span>
                  </div>

                  <pre className="bg-[#1a1a1a] text-slate-100 p-3.5 overflow-x-auto font-mono text-[11px] leading-relaxed border border-slate-800 rounded-none">
                    <code>{activePost.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 text-right font-mono">
                <button
                  onClick={() => setActivePost(null)}
                  className="px-4 py-2 bg-[#1a1a1a] hover:bg-[#0055ff] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-none"
                >
                  닫기 (Close)
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
