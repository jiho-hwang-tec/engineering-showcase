import React, { useState, useEffect } from 'react';
import {
  UserProfile,
  Project,
  ResearchItem,
  GalleryItem,
  PaperItem,
  BlogPost,
  ContactMessage,
} from './types';
import {
  loadProfile,
  saveProfile,
  loadProjects,
  saveProjects,
  loadResearch,
  saveResearch,
  loadGallery,
  saveGallery,
  loadPapers,
  savePapers,
  loadBlogs,
  saveBlogs,
  loadMessages,
  saveMessages,
  resetAllStorage,
} from './utils/storage';
import { fetchPortfolioData, syncAllPortfolio } from './utils/api';
import { initialSkills } from './data/mockData';
import { downloadResumePdf } from './utils/resumeDownload';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ResearchSection } from './components/ResearchSection';
import { GallerySection } from './components/GallerySection';
import { PublicationsSection } from './components/PublicationsSection';
import { BlogSection } from './components/BlogSection';
import { ResumeSection } from './components/ResumeSection';
import { ResumeModal } from './components/ResumeModal';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

export default function App() {
  // Application Persistent State
  const [profile, setProfile] = useState<UserProfile>(loadProfile());
  const [projects, setProjects] = useState<Project[]>(loadProjects());
  const [researchList, setResearchList] = useState<ResearchItem[]>(loadResearch());
  const [gallery, setGallery] = useState<GalleryItem[]>(loadGallery());
  const [papers, setPapers] = useState<PaperItem[]>(loadPapers());
  const [blogs, setBlogs] = useState<BlogPost[]>(loadBlogs());
  const [messages, setMessages] = useState<ContactMessage[]>(loadMessages());

  // Interactive UI States
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<string | null>(null);

  // Modals & Authentication
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpen] = useState<boolean>(false);
  const [adminTab, setAdminTab] = useState<'profile' | 'projects' | 'research' | 'gallery' | 'blogs'>('projects');
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);

  // Server Data Synchronization on Boot
  useEffect(() => {
    let isMounted = true;
    fetchPortfolioData().then((serverData) => {
      if (!isMounted) return;
      if (serverData) {
        if (serverData.profile) {
          setProfile(serverData.profile);
          try { localStorage.setItem('ee_showcase_profile_v1', JSON.stringify(serverData.profile)); } catch {}
        }
        if (serverData.projects && Array.isArray(serverData.projects) && serverData.projects.length > 0) {
          setProjects(serverData.projects);
          try { localStorage.setItem('ee_showcase_projects_v1', JSON.stringify(serverData.projects)); } catch {}
        }
        if (serverData.research && Array.isArray(serverData.research)) {
          setResearchList(serverData.research);
          try { localStorage.setItem('ee_showcase_research_v1', JSON.stringify(serverData.research)); } catch {}
        }
        if (serverData.gallery && Array.isArray(serverData.gallery)) {
          setGallery(serverData.gallery);
          try { localStorage.setItem('ee_showcase_gallery_v1', JSON.stringify(serverData.gallery)); } catch {}
        }
        if (serverData.papers && Array.isArray(serverData.papers)) {
          setPapers(serverData.papers);
          try { localStorage.setItem('ee_showcase_papers_v1', JSON.stringify(serverData.papers)); } catch {}
        }
        if (serverData.blogs && Array.isArray(serverData.blogs)) {
          setBlogs(serverData.blogs);
          try { localStorage.setItem('ee_showcase_blogs_v1', JSON.stringify(serverData.blogs)); } catch {}
        }
        if (serverData.messages && Array.isArray(serverData.messages)) {
          setMessages(serverData.messages);
          try { localStorage.setItem('ee_showcase_messages_v1', JSON.stringify(serverData.messages)); } catch {}
        }
      } else {
        // If server is clean (first launch), sync current profile and projects to server
        syncAllPortfolio({
          profile: loadProfile(),
          projects: loadProjects(),
          research: loadResearch(),
          gallery: loadGallery(),
          papers: loadPapers(),
          blogs: loadBlogs(),
          messages: loadMessages(),
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Active scroll section observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handlers
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSkill = (skillName: string) => {
    setSelectedSkillFilter(skillName);
    handleNavigate('projects');
  };

  const handleSendMessage = (msgData: { name: string; email: string; organization: string; message: string }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msgData.name,
      email: msgData.email,
      organization: msgData.organization,
      message: msgData.message,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      read: false,
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    saveMessages(updated);
  };

  // Admin Auth Handler (Password: 0405)
  const handleAdminLogin = (pass: string) => {
    if (pass === '0405') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  const handleResetData = () => {
    if (window.confirm('모든 데이터를 초기 포트폴리오 상태로 복원하시겠습니까?')) {
      resetAllStorage();
      setProfile(loadProfile());
      setProjects(loadProjects());
      setResearchList(loadResearch());
      setGallery(loadGallery());
      setPapers(loadPapers());
      setBlogs(loadBlogs());
      setMessages(loadMessages());
      alert('초기 포트폴리오 데이타로 복원 완료되었습니다.');
    }
  };

  const handleDownloadResume = () => {
    downloadResumePdf(profile);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Navigation Header */}
      <Navbar
        profile={profile}
        activeSection={activeSection}
        setActiveSection={handleNavigate}
        isAdmin={isAdminAuthenticated}
        onOpenAdminLogin={() => setAdminModalOpen(true)}
        onLogoutAdmin={handleAdminLogout}
        onDownloadResume={handleDownloadResume}
      />

      {/* Main Content Area */}
      <main>
        {/* 1. HERO / TOP OVERVIEW */}
        <Hero
          profile={profile}
          onNavigate={handleNavigate}
          onDownloadResume={handleDownloadResume}
          onSaveProfile={handleSaveProfile}
        />

        {/* 2. ABOUT ME & ACADEMIC BACKGROUND */}
        <AboutSection profile={profile} />

        {/* 3. UNDERGRADUATE PROJECTS & RESEARCH */}
        <ProjectsSection
          projects={projects}
          profile={profile}
          onOpenAdminProjects={() => {
            setAdminTab('projects');
            setAdminModalOpen(true);
          }}
          selectedSkillFilter={selectedSkillFilter}
          onClearSkillFilter={() => setSelectedSkillFilter(null)}
        />
      </main>

      {/* Footer */}
      <Footer profile={profile} onNavigate={handleNavigate} />

      {/* MODALS */}

      {/* Printable / Viewable Resume Modal */}
      <ResumeModal
        profile={profile}
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
      />

      {/* Admin Panel Modal (Pass: 0405) */}
      <AdminModal
        isOpen={adminModalOpen}
        isAdminAuthenticated={isAdminAuthenticated}
        profile={profile}
        projects={projects}
        researchList={researchList}
        gallery={gallery}
        blogPosts={blogs}
        defaultTab={adminTab}
        onLogin={handleAdminLogin}
        onLogout={handleAdminLogout}
        onSaveProfile={handleSaveProfile}
        onSaveProjects={(p) => { setProjects(p); saveProjects(p); }}
        onSaveResearch={(r) => { setResearchList(r); saveResearch(r); }}
        onSaveGallery={(g) => { setGallery(g); saveGallery(g); }}
        onSaveBlogs={(b) => { setBlogs(b); saveBlogs(b); }}
        onResetData={handleResetData}
        onClose={() => setAdminModalOpen(false)}
      />

    </div>
  );
}
