import React from 'react';
import { UserProfile } from '../types';
import { Github, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: UserProfile;
  onNavigate?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1a1a1a] text-slate-300 font-mono text-xs py-5 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* CONNECT Section */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-[#0055ff] font-bold uppercase tracking-wider text-[11px]">
            CONNECT
          </span>
          <div className="flex items-center gap-2">
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-slate-800 hover:bg-[#0055ff] text-white transition-colors rounded-none"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2 bg-slate-800 hover:bg-[#0055ff] text-white transition-colors rounded-none"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Bar / Copyright & Top */}
        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
          <span>© 2026 {profile.name}. All Rights Reserved.</span>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-[#0055ff] text-slate-300 hover:text-white transition-colors rounded-none uppercase tracking-wider font-mono text-[10px]"
          >
            <span>TOP</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>

      </div>
    </footer>
  );
};

