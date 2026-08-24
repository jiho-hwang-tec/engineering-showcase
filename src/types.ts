export type Category = 'All' | 'CV/ML' | 'etc.';

export interface ProjectImageItem {
  id: string;
  url: string;
  caption?: string;
  imageSize?: 'sm' | 'md' | 'lg' | 'full';
  imageAlign?: 'left' | 'center' | 'right';
  imagePosition?: 'top' | 'middle' | 'bottom';
}

export interface ProjectPdfItem {
  id: string;
  title: string;
  url: string;
  fileName?: string;
}

export interface ProjectSectionItem {
  title: string;
  content: string;
  summary?: string;
  date?: string;
  githubUrl?: string;
  imageUrl?: string;
  imagePosition?: 'top' | 'middle' | 'bottom';
  imageSize?: 'sm' | 'md' | 'lg' | 'full';
  imageAlign?: 'left' | 'center' | 'right';
  images?: ProjectImageItem[];
  tags?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  tags: string[];
  featured: boolean;
  isMain?: boolean;
  date: string;
  thumbnail: string;
  
  githubUrl?: string;
  pdfReportUrl?: string;
  pdfReportFileUrl?: string;
  pdfReportFileName?: string;
  pdfReportLabel?: string;
  pdfDocuments?: ProjectPdfItem[];
  videoUrl?: string;

  sections?: {
    [key: string]: ProjectSectionItem;
    overview: ProjectSectionItem;
    architecture: ProjectSectionItem;
    hardware: ProjectSectionItem;
    firmware: ProjectSectionItem;
    aiModel: ProjectSectionItem;
    metrics: ProjectSectionItem;
    troubleshooting: ProjectSectionItem;
  };

  // Legacy fields kept optional for backward compatibility
  overview?: string;
  purpose?: string;
  systemArchitecture?: string[];
  circuitSchematics?: any;
  firmwareArchitecture?: any;
  aiModelDetails?: any;
  metrics?: any;
  troubleshooting?: any;
  sectionTitles?: any;
}

export interface ResearchItem {
  id: string;
  title: string;
  period: string;
  advisor: string;
  labName: string;
  tags: string[];
  summary: string;
  objective: string;
  methodology: string;
  keyFindings: string[];
  metrics: { label: string; value: string; detail: string }[];
  paperTitle?: string;
  publication?: string;
  pdfUrl?: string;
  posterUrl?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'PCB & Circuit' | 'FPGA & Hardware' | 'AI & Wafermap' | 'Lab Environment';
  date: string;
  image: string;
  description: string;
  technicalSpecs: string;
  toolsUsed: string[];
}

export interface PaperItem {
  id: string;
  title: string;
  type: 'Journal' | 'Conference' | 'Poster' | 'Patent';
  authors: string;
  venue: string;
  year: string;
  abstract: string;
  pdfUrl: string;
  bibtex: string;
  awards?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  summary: string;
  tags: string[];
  content: string; // Markdown formatted / rich text
  codeSnippet?: {
    language: string;
    filename: string;
    code: string;
  };
}

export interface SkillCategory {
  category: 'Hardware' | 'Embedded' | 'FPGA' | 'AI / Computer Vision' | 'Programming' | 'Simulation';
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    relatedProjectsCount: number;
    description: string;
  }[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  organization: string;
  message: string;
  date: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  engName: string;
  title: string;
  headline: string;
  subHeadline: string;
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  labName: string;
  university: string;
  major: string;
  gpa: string;
  resumePdfUrl?: string;
  resumePdfFileName?: string;

  // Home Section Customizations
  photoUrl?: string;
  homeCatchphrase?: string;
  homeBadges?: string[];
  homeCtaText?: string;
  homeSummaryTitle?: string;
  homeSummaryDesc?: string;
  homeLabRole?: string;


  // About Me Section Customizations
  aboutTag?: string;
  aboutTitle?: string;
  aboutBioTitle?: string;
  academicTitle?: string;
  labTitle?: string;
  labRole?: string;
  labSubject?: string;
  contactTitle?: string;
  techStackTitle?: string;
  techStackSubtag?: string;
  techStackNote?: string;
  projectsTag?: string;
  projectsTitle?: string;
  projectCategories?: string[];
  skillCategories?: {
    title: string;
    skills: string[];
    color?: string;
  }[];
}
