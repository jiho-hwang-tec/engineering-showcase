import { UserProfile, Project, ResearchItem, GalleryItem, PaperItem, BlogPost, ContactMessage } from '../types';
import { initialProfile, initialProjects, initialResearch, initialGallery, initialPapers, initialBlogPosts } from '../data/mockData';
import {
  saveProjectsToServer,
  saveProfileToServer,
  saveResearchToServer,
  saveGalleryToServer,
  savePapersToServer,
  saveBlogsToServer,
  saveMessagesToServer,
  resetPortfolioOnServer,
} from './api';

const KEYS = {
  PROFILE: 'ee_showcase_profile_v1',
  PROJECTS: 'ee_showcase_projects_v1',
  RESEARCH: 'ee_showcase_research_v1',
  GALLERY: 'ee_showcase_gallery_v1',
  PAPERS: 'ee_showcase_papers_v1',
  BLOGS: 'ee_showcase_blogs_v1',
  MESSAGES: 'ee_showcase_messages_v1',
  ADMIN_AUTH: 'ee_showcase_admin_auth_v1',
};

export const loadProfile = (): UserProfile => {
  try {
    const saved = localStorage.getItem(KEYS.PROFILE);
    const profile: UserProfile = saved ? JSON.parse(saved) : initialProfile;
    if (!profile.projectCategories || profile.projectCategories.length === 0 || profile.projectCategories.includes('AI/CV')) {
      profile.projectCategories = ["CV/ML", "etc."];
    }
    return profile;
  } catch {
    return initialProfile;
  }
};

export const saveProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.warn('Profile save warning (localStorage quota or permission):', e);
  }
  // Synchronize to backend server for multi-device / PC persistence
  saveProfileToServer(profile).catch((err) => {
    console.warn('Server sync error for profile:', err);
  });
};

export const loadProjects = (): Project[] => {
  try {
    const saved = localStorage.getItem(KEYS.PROJECTS);
    const projects: Project[] = saved ? JSON.parse(saved) : initialProjects;
    return projects.map(p => {
      let cat = p.category as string;
      if (cat === 'AI/CV' || cat === 'Hardware/PCB' || cat === 'FPGA/Embedded') {
        cat = cat === 'AI/CV' ? 'CV/ML' : 'etc.';
      }
      return {
        ...p,
        category: cat as any
      };
    });
  } catch {
    return initialProjects;
  }
};

export const saveProjects = (projects: Project[]): void => {
  try {
    localStorage.setItem(KEYS.PROJECTS, JSON.stringify(projects));
  } catch (e) {
    console.warn('Projects save warning (localStorage quota or permission):', e);
  }
  // Synchronize to backend server for multi-device / PC persistence
  saveProjectsToServer(projects).catch((err) => {
    console.warn('Server sync error for projects:', err);
  });
};

export const loadResearch = (): ResearchItem[] => {
  try {
    const saved = localStorage.getItem(KEYS.RESEARCH);
    return saved ? JSON.parse(saved) : initialResearch;
  } catch {
    return initialResearch;
  }
};

export const saveResearch = (research: ResearchItem[]): void => {
  try {
    localStorage.setItem(KEYS.RESEARCH, JSON.stringify(research));
  } catch (e) {
    console.warn('Research save warning:', e);
  }
  saveResearchToServer(research).catch((err) => {
    console.warn('Server sync error for research:', err);
  });
};

export const loadGallery = (): GalleryItem[] => {
  try {
    const saved = localStorage.getItem(KEYS.GALLERY);
    return saved ? JSON.parse(saved) : initialGallery;
  } catch {
    return initialGallery;
  }
};

export const saveGallery = (gallery: GalleryItem[]): void => {
  try {
    localStorage.setItem(KEYS.GALLERY, JSON.stringify(gallery));
  } catch (e) {
    console.warn('Gallery save warning:', e);
  }
  saveGalleryToServer(gallery).catch((err) => {
    console.warn('Server sync error for gallery:', err);
  });
};

export const loadPapers = (): PaperItem[] => {
  try {
    const saved = localStorage.getItem(KEYS.PAPERS);
    return saved ? JSON.parse(saved) : initialPapers;
  } catch {
    return initialPapers;
  }
};

export const savePapers = (papers: PaperItem[]): void => {
  try {
    localStorage.setItem(KEYS.PAPERS, JSON.stringify(papers));
  } catch (e) {
    console.warn('Papers save warning:', e);
  }
  savePapersToServer(papers).catch((err) => {
    console.warn('Server sync error for papers:', err);
  });
};

export const loadBlogs = (): BlogPost[] => {
  try {
    const saved = localStorage.getItem(KEYS.BLOGS);
    return saved ? JSON.parse(saved) : initialBlogPosts;
  } catch {
    return initialBlogPosts;
  }
};

export const saveBlogs = (blogs: BlogPost[]): void => {
  try {
    localStorage.setItem(KEYS.BLOGS, JSON.stringify(blogs));
  } catch (e) {
    console.warn('Blogs save warning:', e);
  }
  saveBlogsToServer(blogs).catch((err) => {
    console.warn('Server sync error for blogs:', err);
  });
};

export const loadMessages = (): ContactMessage[] => {
  try {
    const saved = localStorage.getItem(KEYS.MESSAGES);
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-1',
        name: '채용담당자 (삼성전자 DS)',
        email: 'recruiter@samsung.com',
        organization: 'Samsung Electronics DS Semiconductor',
        message: '황지호님의 Wafermap Generative AI & CLIP 포트폴리오를 매우 인상 깊게 보았습니다. 하드웨어 회로 지식과 AI 모델 경량화 역량을 갖춘 수율 엔지니어링 직무 면접 제안을 드리고 싶습니다.',
        date: '2026-08-01 14:20',
        read: false
      }
    ];
  } catch {
    return [];
  }
};

export const saveMessages = (msgs: ContactMessage[]): void => {
  try {
    localStorage.setItem(KEYS.MESSAGES, JSON.stringify(msgs));
  } catch (e) {
    console.warn('Messages save warning:', e);
  }
  saveMessagesToServer(msgs).catch((err) => {
    console.warn('Server sync error for messages:', err);
  });
};

export const resetAllStorage = (): void => {
  localStorage.removeItem(KEYS.PROFILE);
  localStorage.removeItem(KEYS.PROJECTS);
  localStorage.removeItem(KEYS.RESEARCH);
  localStorage.removeItem(KEYS.GALLERY);
  localStorage.removeItem(KEYS.PAPERS);
  localStorage.removeItem(KEYS.BLOGS);
  localStorage.removeItem(KEYS.MESSAGES);
  resetPortfolioOnServer().catch((err) => {
    console.warn('Server reset error:', err);
  });
};
