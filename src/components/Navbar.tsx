import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Unlock, Menu, X, Cpu, FileText, ChevronRight } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isAdmin: boolean;
  onOpenAdminLogin: () => void;
  onLogoutAdmin: () => void;
  onDownloadResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  activeSection,
  setActiveSection,
  isAdmin,
  onOpenAdminLogin,
  onLogoutAdmin,
  onDownloadResume
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT ME' },
    { id: 'projects', label: 'PROJECTS' },
  ];

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white/98 backdrop-blur-md border-b border-gray-200 shadow-sm py-2.5' 
        : 'bg-white border-b border-gray-200 py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 bg-[#0055ff] flex items-center justify-center text-white font-mono font-bold text-xs tracking-wider shadow-sm group-hover:bg-[#0044cc] transition-colors rounded-none">
              JH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-[#0055ff] transition-colors font-sans uppercase">
                  {profile.name}
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-bold bg-[#0055ff]/10 text-[#0055ff] border border-[#0055ff]/20 rounded-none">
                  EE + AI/ML
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                ENGINEERING ARCHIVE
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 text-[11px] font-mono font-bold uppercase tracking-wider">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`py-1 transition-all border-b-2 ${
                    isActive
                      ? 'text-[#0055ff] border-[#0055ff]'
                      : 'text-slate-500 hover:text-slate-900 border-transparent'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Admin Mode */}
          <div className="hidden sm:flex items-center gap-2.5 font-mono">
            {isAdmin ? (
              <button
                onClick={onLogoutAdmin}
                className="w-9 h-9 flex items-center justify-center rounded-none bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors border border-emerald-300 shadow-2xs"
                title="관리자 모드 켜짐 (클릭하여 로그아웃)"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </button>
            ) : (
              <button
                onClick={onOpenAdminLogin}
                className="w-9 h-9 flex items-center justify-center rounded-none bg-[#1a1a1a] text-white hover:bg-[#0055ff] transition-colors shadow-2xs"
                title="관리자 로그인 (비밀번호: 0405)"
              >
                <Lock className="w-4 h-4 text-blue-400" />
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-slate-200 pb-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2 text-sm font-medium rounded-md ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              {isAdmin ? (
                <button
                  onClick={onLogoutAdmin}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800"
                >
                  <Unlock className="w-4 h-4" />
                  관리자 모드 해제
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-md text-xs font-semibold bg-slate-900 text-white"
                >
                  <Lock className="w-4 h-4" />
                  관리자 로그인 (비밀번호: 0405)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
