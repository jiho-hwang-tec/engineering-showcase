import React, { useState, useEffect, useRef } from 'react';
import { UserProfile, Project, ResearchItem, GalleryItem, BlogPost, ContactMessage, Category, ProjectSectionItem, ProjectPdfItem } from '../types';
import { X, Lock, KeyRound, Plus, Trash2, Edit3, Save, RefreshCw, Upload, Image as ImageIcon, ArrowLeft, CheckCircle2, Github, FileText, Download, Cloud } from 'lucide-react';
import { compressImage } from '../utils/imageCompressor';
import { uploadFileToServer, syncAllPortfolio } from '../utils/api';

interface AdminModalProps {
  isOpen: boolean;
  isAdminAuthenticated: boolean;
  profile: UserProfile;
  projects: Project[];
  researchList: ResearchItem[];
  gallery: GalleryItem[];
  blogPosts: BlogPost[];
  defaultTab?: 'profile' | 'projects' | 'research' | 'gallery' | 'blogs';
  onLogin: (pass: string) => boolean;
  onLogout: () => void;
  onSaveProfile: (profile: UserProfile) => void;
  onSaveProjects: (projects: Project[]) => void;
  onSaveResearch: (research: ResearchItem[]) => void;
  onSaveGallery: (gallery: GalleryItem[]) => void;
  onSaveBlogs: (blogs: BlogPost[]) => void;
  onResetData: () => void;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  isAdminAuthenticated,
  profile,
  projects,
  researchList,
  gallery,
  blogPosts,
  defaultTab = 'profile',
  onLogin,
  onLogout,
  onSaveProfile,
  onSaveProjects,
  onSaveResearch,
  onSaveGallery,
  onSaveBlogs,
  onResetData,
  onClose,
}) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'research' | 'gallery' | 'blogs'>(defaultTab);

  // Editable Form States
  const [editableProfile, setEditableProfile] = useState<UserProfile>({ ...profile });
  const [editableProjects, setEditableProjects] = useState<Project[]>([...projects]);

  // Active Editing Project
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmProjectId, setDeleteConfirmProjectId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const defaultCats = [
      {
        title: "프로그래밍 언어 (Languages)",
        skills: ["C / C++", "Python", "Verilog (HDL)", "MATLAB"],
        color: "border-l-[#0055ff]"
      },
      {
        title: "AI / 컴퓨터비전 (AI & CV)",
        skills: ["PyTorch", "OpenCV", "TensorRT", "ONNX", "Scikit-learn"],
        color: "border-l-emerald-600"
      },
      {
        title: "하드웨어 & 임베디드 (HW & Embedded)",
        skills: ["KiCad (PCB 설계)", "Vivado (FPGA)", "STM32 (FreeRTOS)", "오실로스코프 디버깅"],
        color: "border-l-indigo-600"
      },
      {
        title: "개발 도구 (Tools & Environment)",
        skills: ["Git / GitHub", "Linux (Ubuntu)", "VS Code", "Jupyter Lab"],
        color: "border-l-amber-600"
      }
    ];

    setEditableProfile({
      ...profile,
      photoUrl: profile.photoUrl || '',
      homeCatchphrase: profile.homeCatchphrase || '전자공학 기초 지식과 1년의 학부연구생 경험을 바탕으로 빠르게 배우고 성장하는 준비된 신입 개발자입니다.',
      homeBadges: profile.homeBadges && profile.homeBadges.length > 0
        ? profile.homeBadges
        : ['회로 이론/설계', 'C/C++', 'Verilog', 'Python/PyTorch', '컴퓨터비전 연구 1년', 'STM32 임베디드'],
      homeCtaText: profile.homeCtaText || '이력서 (PDF) 바로 다운로드',
      homeSummaryTitle: profile.homeSummaryTitle || '[신입 포부] 빠른 학습 능력과 강한 정직함으로 기여하겠습니다.',
      homeSummaryDesc: profile.homeSummaryDesc || '숙명여대 전자공학과 전공(학점 3.92/4.5) 과정과 AI 랩 학부연구생 1년 경험으로 회로 및 컴퓨터비전 기초 프로젝트를 완수했습니다.',
      homeLabRole: profile.homeLabRole || profile.labRole || '컴퓨터비전 랩 (1년)',


      aboutTag: profile.aboutTag || 'PROFILE & SKILLS',
      aboutTitle: profile.aboutTitle || '01. ABOUT ME (자기소개 & 핵심 역량)',
      aboutBioTitle: profile.aboutBioTitle || '자기소개 (Introduce)',
      academicTitle: profile.academicTitle || '학력 사항',
      labTitle: profile.labTitle || '학부연구생 활동',
      labRole: profile.labRole || '컴퓨터비전 랩 (1년)',
      labSubject: profile.labSubject || '반도체 Wafermap AI 연구',
      contactTitle: profile.contactTitle || 'CONTACT INFORMATION',
      techStackTitle: profile.techStackTitle || '보유 기술 스택 (Tech Stack)',
      techStackSubtag: profile.techStackSubtag || 'BASIC & PRACTICAL',
      techStackNote: profile.techStackNote || '💡 학부 전공 수업과 1년의 랩실 경험을 통해 실무 기초 및 디버깅 능력을 습득했습니다.',
      projectsTag: profile.projectsTag || 'UNDERGRADUATE PROJECTS',
      projectsTitle: profile.projectsTitle || '02. 대표 프로젝트 (Projects & Lab Work)',
      projectCategories: (profile.projectCategories && profile.projectCategories.length > 0)
        ? profile.projectCategories
        : ['CV/ML', 'etc.'],
      skillCategories: (profile.skillCategories && profile.skillCategories.length > 0)
        ? profile.skillCategories
        : defaultCats
    });
    setEditableProjects([...projects]);
  }, [profile, projects]);

  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 800, 800, 0.82);
        if (compressed) {
          const uploadRes = await uploadFileToServer(compressed, file.name, file.type);
          const finalUrl = uploadRes.url || compressed;
          setEditableProfile(prev => ({ ...prev, photoUrl: finalUrl }));
        }
      } catch (err) {
        console.error('Photo compression error:', err);
      }
    }
  };

  const handleCategoryChange = (index: number, title: string, skillsStr: string) => {
    const updated = [...(editableProfile.skillCategories || [])];
    const skills = skillsStr.split(',').map(s => s.trim());
    updated[index] = { ...updated[index], title, skills };
    setEditableProfile({ ...editableProfile, skillCategories: updated });
  };

  const handleAddCategory = () => {
    const updated = [...(editableProfile.skillCategories || [])];
    updated.push({
      title: '새 기술 스택 카테고리',
      skills: ['스킬1', '스킬2'],
      color: 'border-l-[#0055ff]'
    });
    setEditableProfile({ ...editableProfile, skillCategories: updated });
  };

  const handleRemoveCategory = (index: number) => {
    const updated = [...(editableProfile.skillCategories || [])];
    updated.splice(index, 1);
    setEditableProfile({ ...editableProfile, skillCategories: updated });
  };

  const handleProjectCategoryChange = (index: number, val: string) => {
    const updated = [...(editableProfile.projectCategories || ['CV/ML', 'etc.'])];
    updated[index] = val;
    setEditableProfile({ ...editableProfile, projectCategories: updated });
  };

  const handleAddProjectCategory = () => {
    const updated = [...(editableProfile.projectCategories || ['CV/ML', 'etc.'])];
    updated.push('새 카테고리');
    setEditableProfile({ ...editableProfile, projectCategories: updated });
  };

  const handleRemoveProjectCategory = (index: number) => {
    const updated = [...(editableProfile.projectCategories || ['CV/ML', 'etc.'])];
    updated.splice(index, 1);
    setEditableProfile({ ...editableProfile, projectCategories: updated });
  };

  useEffect(() => {
    if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [defaultTab]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(passwordInput);
    if (!success) {
      setAuthError(true);
    } else {
      setAuthError(false);
      setPasswordInput('');
    }
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedProfile: UserProfile = {
      ...editableProfile,
      homeBadges: (editableProfile.homeBadges || []).filter(s => s && s.trim().length > 0),
      skillCategories: (editableProfile.skillCategories || []).map(cat => ({
        ...cat,
        skills: (cat.skills || []).filter(s => s && s.trim().length > 0)
      }))
    };
    onSaveProfile(cleanedProfile);
    alert('프로필 정보가 저장되었습니다.');
  };

  // Project Management Functions
  const defaultSections = {
    overview: { title: "1. 프로젝트 개요 및 개발 목적 (Overview & Purpose)", content: "", imageUrl: "" },
    architecture: { title: "2. 시스템 아키텍처 (System Flow & Architecture)", content: "", imageUrl: "" },
    hardware: { title: "3. 하드웨어 회로 & PCB 설계 (Hardware & PCB Stackup)", content: "", imageUrl: "" },
    firmware: { title: "4. 임베디드 펌웨어 & FSM 구조 (Firmware & RTOS)", content: "", imageUrl: "" },
    aiModel: { title: "5. AI 모델 & 양자화 파이프라인 (AI Model Architecture)", content: "", imageUrl: "" },
    metrics: { title: "6. 실험 및 측정 성능 결과 (Benchmark Metrics)", content: "", imageUrl: "" },
    troubleshooting: { title: "7. 문제 해결 및 트러블슈팅 (Engineering Trouble Shooting)", content: "", imageUrl: "" },
  };

  const handleAddNewProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      title: '신규 대표 프로젝트 제목',
      subtitle: '학부 전공 / 프로젝트 설명',
      category: 'CV/ML',
      tags: ['C++', 'Python', 'Projects'],
      featured: false,
      date: '2026.03 - 2026.06',
      thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      sections: { ...defaultSections },
      githubUrl: 'https://github.com/jiho-hwang-ee',
      pdfReportUrl: '',
      pdfReportLabel: 'PDF 보고서'
    };
    setEditingProject(newProj);
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: Project[];
    const exists = editableProjects.some(p => p.id === editingProject.id);

    if (exists) {
      updatedList = editableProjects.map(p => p.id === editingProject.id ? editingProject : p);
    } else {
      updatedList = [...editableProjects, editingProject];
    }

    setEditableProjects(updatedList);
    onSaveProjects(updatedList);
    setEditingProject(null);
    alert('대표 프로젝트 정보가 성공적으로 저장되었습니다!');
  };

  const handleDeleteProject = (id: string) => {
    if (deleteConfirmProjectId !== id) {
      setDeleteConfirmProjectId(id);
      return;
    }
    const updated = editableProjects.filter(p => p.id !== id);
    setEditableProjects(updated);
    onSaveProjects(updated);
    if (editingProject?.id === id) {
      setEditingProject(null);
    }
    setDeleteConfirmProjectId(null);
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      try {
        const compressed = await compressImage(file, 1200, 1200, 0.82);
        if (compressed) {
          const uploadRes = await uploadFileToServer(compressed, file.name, file.type);
          const finalUrl = uploadRes.url || compressed;
          setEditingProject({ ...editingProject, thumbnail: finalUrl });
        }
      } catch (err) {
        console.error('Thumbnail compression error:', err);
      }
    }
  };

  const getEditingPdfDocuments = (): ProjectPdfItem[] => {
    if (!editingProject) return [];
    if (editingProject.pdfDocuments && editingProject.pdfDocuments.length > 0) {
      return editingProject.pdfDocuments;
    }
    if (editingProject.pdfReportFileUrl || editingProject.pdfReportUrl) {
      return [{
        id: 'pdf-legacy',
        title: editingProject.pdfReportLabel || 'PDF 보고서',
        url: editingProject.pdfReportFileUrl || editingProject.pdfReportUrl || '',
        fileName: editingProject.pdfReportFileName || '프로젝트_보고서.pdf'
      }];
    }
    return [];
  };

  const handleAddProjectPdfItem = () => {
    if (!editingProject) return;
    const currentList = getEditingPdfDocuments();
    const newDoc: ProjectPdfItem = {
      id: `pdf-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      title: currentList.length === 0 ? 'PDF 보고서' : `문서 ${currentList.length + 1}`,
      url: '',
      fileName: ''
    };
    const updated = [...currentList, newDoc];
    setEditingProject({
      ...editingProject,
      pdfDocuments: updated,
      pdfReportUrl: updated[0]?.url || '',
      pdfReportFileUrl: updated[0]?.url?.startsWith('data:') ? updated[0]?.url : undefined,
      pdfReportLabel: updated[0]?.title || 'PDF 보고서',
      pdfReportFileName: updated[0]?.fileName
    });
  };

  const handleUpdateProjectPdfItem = (id: string, updates: Partial<ProjectPdfItem>) => {
    if (!editingProject) return;
    const currentList = getEditingPdfDocuments();
    const updated = currentList.map(doc => doc.id === id ? { ...doc, ...updates } : doc);
    setEditingProject({
      ...editingProject,
      pdfDocuments: updated,
      pdfReportUrl: updated[0]?.url || '',
      pdfReportFileUrl: updated[0]?.url?.startsWith('data:') ? updated[0]?.url : undefined,
      pdfReportLabel: updated[0]?.title || 'PDF 보고서',
      pdfReportFileName: updated[0]?.fileName
    });
  };

  const handleRemoveProjectPdfItem = (id: string) => {
    if (!editingProject) return;
    const currentList = getEditingPdfDocuments();
    const updated = currentList.filter(doc => doc.id !== id);
    setEditingProject({
      ...editingProject,
      pdfDocuments: updated,
      pdfReportUrl: updated[0]?.url || '',
      pdfReportFileUrl: updated[0]?.url?.startsWith('data:') ? updated[0]?.url : undefined,
      pdfReportLabel: updated[0]?.title || 'PDF 보고서',
      pdfReportFileName: updated[0]?.fileName
    });
  };

  const handleProjectPdfFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProject) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          const rawData = reader.result;
          const uploadRes = await uploadFileToServer(rawData, file.name, 'application/pdf');
          const finalUrl = uploadRes.url || rawData;
          const currentList = getEditingPdfDocuments();
          const updated = currentList.map(doc => doc.id === id ? {
            ...doc,
            url: finalUrl,
            fileName: file.name
          } : doc);
          setEditingProject(prev => prev ? ({
            ...prev,
            pdfDocuments: updated,
            pdfReportFileUrl: finalUrl.startsWith('data:') ? finalUrl : undefined,
            pdfReportUrl: finalUrl,
            pdfReportLabel: updated[0]?.title || 'PDF 보고서',
            pdfReportFileName: updated[0]?.fileName
          }) : null);
          alert(`PDF 파일 "${file.name}"이 서버에 안전하게 업로드되었습니다. [프로젝트 저장하기]를 눌러 완료해주세요!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          const rawData = reader.result;
          const uploadRes = await uploadFileToServer(rawData, file.name, 'application/pdf');
          const finalUrl = uploadRes.url || rawData;
          setEditableProfile(prev => ({
            ...prev,
            resumePdfUrl: finalUrl,
            resumePdfFileName: file.name
          }));
          alert(`이력서 파일 "${file.name}"이 서버에 안전하게 업로드되었습니다. 아래 [프로필 수정 사항 저장] 버튼을 꼭 눌러주세요!`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveResumePdf = () => {
    setEditableProfile(prev => ({
      ...prev,
      resumePdfUrl: undefined,
      resumePdfFileName: undefined
    }));
  };

  // Full Portfolio JSON Export & Import
  const handleExportDataJson = () => {
    const fullData = {
      profile: editableProfile,
      projects: editableProjects,
      research: researchList,
      gallery: gallery,
      blogs: blogPosts,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };
    const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportDataJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      try {
        const text = evt.target?.result as string;
        const parsed = JSON.parse(text);
        if (parsed.profile) {
          setEditableProfile(parsed.profile);
          onSaveProfile(parsed.profile);
        }
        if (parsed.projects && Array.isArray(parsed.projects)) {
          setEditableProjects(parsed.projects);
          onSaveProjects(parsed.projects);
        }
        if (parsed.research && Array.isArray(parsed.research)) {
          onSaveResearch(parsed.research);
        }
        if (parsed.gallery && Array.isArray(parsed.gallery)) {
          onSaveGallery(parsed.gallery);
        }
        if (parsed.blogs && Array.isArray(parsed.blogs)) {
          onSaveBlogs(parsed.blogs);
        }
        await syncAllPortfolio(parsed);
        alert('포트폴리오 백업 데이터가 성공적으로 복원되고 서버와 동기화되었습니다!');
      } catch (err) {
        console.error('Import error:', err);
        alert('올바른 포트폴리오 백업 JSON 파일이 아닙니다.');
      }
    };
    reader.readAsText(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 shadow-2xl p-6 sm:p-8 relative font-sans space-y-6">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-slate-900 text-white">
              <Lock className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">
                관리자 모드 (Portfolio Admin Panel)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                대표 프로젝트 추가/수정, 썸네일 사진 등록, 이력서 정보 수정
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. Login Prompt if not authenticated */}
        {!isAdminAuthenticated ? (
          <div className="max-w-md mx-auto my-8 p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">관리자 비밀번호 입력</h3>
              <p className="text-xs text-slate-600 font-mono">
                관리자 패스워드를 입력하세요. (비밀번호: <strong className="text-blue-600">0405</strong>)
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-3">
              <input
                type="password"
                required
                placeholder="비밀번호 입력 (0405)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm font-mono outline-none"
              />

              {authError && (
                <p className="text-xs text-rose-600 font-mono font-bold text-center">
                  비밀번호가 올바르지 않습니다. (0405)
                </p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-sm"
              >
                관리자 인증하기
              </button>
            </form>
          </div>
        ) : (
          /* 2. Admin Content Dashboard */
          <div className="space-y-6">
            
            {/* Top Sub-nav */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 font-mono text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'projects', label: `대표 프로젝트 (${editableProjects.length})` },
                  { id: 'profile', label: '기본 프로필' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTab(t.id as any);
                      setEditingProject(null);
                    }}
                    className={`px-3.5 py-2 rounded-lg font-bold transition-all ${
                      activeTab === t.id
                        ? 'bg-[#0055ff] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                  <Cloud className="w-3.5 h-3.5 text-emerald-600" />
                  <span>서버 클라우드 동기화 활성 (모든 PC 연동)</span>
                </div>

                <button
                  type="button"
                  onClick={handleExportDataJson}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold hover:bg-blue-100"
                  title="전체 포트폴리오 데이터 JSON 백업 파일로 내보내기"
                >
                  <Download className="w-3 h-3" />
                  <span>백업 내보내기</span>
                </button>

                <label className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 border border-slate-300 text-slate-700 text-[11px] font-bold hover:bg-slate-200 cursor-pointer">
                  <Upload className="w-3 h-3" />
                  <span>백업 가져오기</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportDataJson}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={onResetData}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold hover:bg-rose-100"
                  title="초기 데이터로 복원"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>초기화</span>
                </button>
              </div>
            </div>

            {/* PROJECTS MANAGEMENT TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                
                {/* Project Editor Form View */}
                {editingProject ? (
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-300 space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <button
                        onClick={() => setEditingProject(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-600 hover:text-slate-900"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>목록으로 돌아가기</span>
                      </button>

                      <h4 className="font-bold text-slate-900 text-sm font-mono">
                        {editableProjects.some(p => p.id === editingProject.id) ? '프로젝트 수정' : '새 프로젝트 추가'}
                      </h4>
                    </div>

                    <form onSubmit={handleSaveProjectForm} className="space-y-4 text-xs">
                      
                      {/* Project Title & Subtitle */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-mono font-bold text-slate-700 mb-1">
                            프로젝트 제목 (Title) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="예: 반도체 Wafermap AI 결함 분석 시스템"
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-slate-300 font-sans font-bold"
                          />
                        </div>

                        <div>
                          <label className="block font-mono font-bold text-slate-700 mb-1">
                            서브타이틀 / 상세페이지 소제목 (Subtitle) *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="예: 학부연구생 1년 과제 | Generative AI & CLIP"
                            value={editingProject.subtitle}
                            onChange={(e) => setEditingProject({ ...editingProject, subtitle: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-slate-300 font-sans"
                          />
                        </div>
                      </div>

                      {/* Category & Date & Main Project */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                        <div>
                          <label className="block font-mono font-bold text-slate-700 mb-1">
                            카테고리 (Category)
                          </label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-slate-300 font-mono font-bold"
                          >
                            {(editableProfile.projectCategories || ['CV/ML', 'etc.']).map((cat) => (
                              <option key={cat} value={cat}>{cat}</option>
                            ))}
                            <option value="All">All (기타)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-mono font-bold text-slate-700 mb-1">
                            수행 기간 (Date / Period)
                          </label>
                          <input
                            type="text"
                            placeholder="예: 2025.03 - 2026.02"
                            value={editingProject.date}
                            onChange={(e) => setEditingProject({ ...editingProject, date: e.target.value })}
                            className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                          />
                        </div>

                        <div className="p-2 bg-amber-50/70 border border-amber-200 rounded">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={!!editingProject.isMain}
                              onChange={(e) => setEditingProject({ ...editingProject, isMain: e.target.checked })}
                              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                            />
                            <span className="text-xs font-mono font-bold text-amber-900">
                              ★ MAIN PROJECT 뱃지 표시
                            </span>
                          </label>
                        </div>
                      </div>

                      {/* Project Tags / Tech Stack Badges Editor */}
                      <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
                        <label className="block font-mono font-bold text-slate-800 text-xs">
                          기술 스택 / 태그 뱃지들 (Tags)
                        </label>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {editingProject.tags && editingProject.tags.map((tag, tagIdx) => (
                            <span key={tagIdx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-mono border border-slate-300 rounded">
                              {tag}
                              <button
                                type="button"
                                onClick={() => {
                                  const newTags = editingProject.tags.filter((_, i) => i !== tagIdx);
                                  setEditingProject({ ...editingProject, tags: newTags });
                                }}
                                className="text-slate-400 hover:text-rose-600 ml-0.5 font-bold"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            id="new-tag-input"
                            placeholder="새 태그 입력 (예: PyTorch) 후 Enter 또는 추가 버튼"
                            className="flex-1 px-3 py-1.5 rounded border border-slate-300 font-mono text-xs"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                const val = e.currentTarget.value.trim();
                                if (val) {
                                  const currentTags = editingProject.tags || [];
                                  if (!currentTags.includes(val)) {
                                    setEditingProject({ ...editingProject, tags: [...currentTags, val] });
                                  }
                                  e.currentTarget.value = '';
                                }
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const input = document.getElementById('new-tag-input') as HTMLInputElement;
                              if (input && input.value.trim()) {
                                const val = input.value.trim();
                                const currentTags = editingProject.tags || [];
                                if (!currentTags.includes(val)) {
                                  setEditingProject({ ...editingProject, tags: [...currentTags, val] });
                                }
                                input.value = '';
                              }
                            }}
                            className="px-3 py-1.5 bg-slate-800 hover:bg-[#0055ff] text-white font-mono text-xs font-bold rounded"
                          >
                            태그 추가
                          </button>
                        </div>
                      </div>

                      {/* Thumbnail Image Upload & URL */}
                      <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
                        <label className="block font-mono font-bold text-slate-800 text-xs">
                          대표 썸네일 이미지 (Project Thumbnail)
                        </label>

                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                          {/* Image Preview Box */}
                          <div className="sm:col-span-4 h-32 bg-slate-900 rounded border border-slate-300 overflow-hidden relative flex items-center justify-center">
                            {editingProject.thumbnail ? (
                              <img
                                src={editingProject.thumbnail}
                                alt="미리보기"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-slate-400 text-[11px] font-mono text-center p-2">
                                <ImageIcon className="w-6 h-6 mx-auto mb-1 text-slate-500" />
                                이미지 없음
                              </div>
                            )}
                          </div>

                          {/* Upload Controls */}
                          <div className="sm:col-span-8 space-y-3">
                            <div>
                              <span className="block text-[11px] font-mono text-slate-500 mb-1">
                                Option A: 내 PC 파일 사진 업로드
                              </span>
                              <label className="inline-flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] hover:bg-[#0055ff] text-white font-mono font-bold text-xs cursor-pointer transition-colors rounded">
                                <Upload className="w-3.5 h-3.5" />
                                <span>컴퓨터에서 사진 선택</span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleThumbnailUpload}
                                  className="hidden"
                                />
                              </label>
                            </div>

                            <div>
                              <span className="block text-[11px] font-mono text-slate-500 mb-1">
                                Option B: 이미지 웹 URL 직접 입력
                              </span>
                              <input
                                type="text"
                                placeholder="https://example.com/image.jpg"
                                value={editingProject.thumbnail}
                                onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                                className="w-full px-3 py-1.5 rounded border border-slate-300 font-mono text-xs"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Flexible Sections Editor (Title + Content + Image for each section) */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <h4 className="font-mono font-bold text-slate-900 text-xs">
                            📑 상세페이지 섹션 관리 (소제목, 본문 글 및 사진 삽입)
                          </h4>
                          <button
                            type="button"
                            onClick={() => {
                              const newKey = `section-${Date.now()}`;
                              const updatedSections = {
                                ...(editingProject.sections || {}),
                                [newKey]: { title: '신규 소제목', content: '', imageUrl: '' }
                              };
                              setEditingProject({ ...editingProject, sections: updatedSections });
                            }}
                            className="px-2.5 py-1 bg-[#0055ff] hover:bg-blue-700 text-white font-mono text-[11px] font-bold rounded flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>섹션 추가</span>
                          </button>
                        </div>

                        {editingProject.sections && Object.entries(editingProject.sections as Record<string, ProjectSectionItem>).map(([key, sec]) => (
                          <div key={key} className="bg-white p-4 rounded-lg border border-slate-300 space-y-3 relative shadow-2xs">
                            <button
                              type="button"
                              onClick={() => {
                                const updatedSections = { ...editingProject.sections };
                                delete updatedSections[key];
                                setEditingProject({ ...editingProject, sections: updatedSections });
                              }}
                              className="absolute top-3 right-3 text-rose-600 hover:text-rose-800 text-xs font-bold bg-rose-50 px-2 py-1 rounded"
                              title="삭제"
                            >
                              삭제 ✕
                            </button>

                            <div>
                              <label className="block font-mono text-slate-700 font-bold text-[11px] mb-1">
                                섹션 소제목 (Title)
                              </label>
                              <input
                                type="text"
                                value={sec.title || ''}
                                onChange={(e) => {
                                  const updatedSections = { ...(editingProject.sections || {}) };
                                  updatedSections[key] = { ...sec, title: e.target.value };
                                  setEditingProject({ ...editingProject, sections: updatedSections });
                                }}
                                className="w-full px-3 py-2 rounded border border-slate-300 font-sans font-bold text-xs"
                                placeholder="예: 1. 프로젝트 개요 및 개발 목적"
                              />
                            </div>

                            {/* Section Period / Date Input */}
                            <div>
                              <label className="block font-mono text-slate-700 font-bold text-[11px] mb-1">
                                이 섹션 수행 기간 (Section Date / Period)
                              </label>
                              <input
                                type="text"
                                value={sec.date || ''}
                                onChange={(e) => {
                                  const updatedSections = { ...(editingProject.sections || {}) };
                                  updatedSections[key] = { ...sec, date: e.target.value };
                                  setEditingProject({ ...editingProject, sections: updatedSections });
                                }}
                                className="w-full px-3 py-1.5 rounded border border-slate-300 font-mono text-xs"
                                placeholder="예: 2025.07 - 2025.09 (선택 사항)"
                              />
                            </div>

                            {/* Section GitHub Repository URL Input */}
                            <div>
                              <label className="flex items-center gap-1.5 font-mono text-slate-700 font-bold text-[11px] mb-1">
                                <Github size={13} className="text-slate-600" />
                                섹션 깃허브 주소 (Section GitHub URL - 선택 사항)
                              </label>
                              <div className="relative">
                                <input
                                  type="url"
                                  value={sec.githubUrl || ''}
                                  onChange={(e) => {
                                    const updatedSections = { ...(editingProject.sections || {}) };
                                    updatedSections[key] = { ...sec, githubUrl: e.target.value };
                                    setEditingProject({ ...editingProject, sections: updatedSections });
                                  }}
                                  className="w-full px-3 py-1.5 pl-8 rounded border border-slate-300 font-mono text-xs focus:ring-1 focus:ring-[#0055ff] focus:border-[#0055ff]"
                                  placeholder="예: https://github.com/username/repo 또는 하위 폴더 링크"
                                />
                                <Github size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                              </div>
                            </div>

                            {/* Section Summary / Description Input */}
                            <div>
                              <label className="block font-mono text-slate-700 font-bold text-[11px] mb-1">
                                섹션 내용 요약 / 소제목 설명 (Summary - 작은 회색 글씨로 표시)
                              </label>
                              <input
                                type="text"
                                value={sec.summary || ''}
                                onChange={(e) => {
                                  const updatedSections = { ...(editingProject.sections || {}) };
                                  updatedSections[key] = { ...sec, summary: e.target.value };
                                  setEditingProject({ ...editingProject, sections: updatedSections });
                                }}
                                className="w-full px-3 py-1.5 rounded border border-slate-300 font-mono text-xs"
                                placeholder="예: Diffusion 모델 경량화 및 DDIM 샘플링 최적화 개요 (선택 사항)"
                              />
                            </div>

                            {/* Section Tech Stack Badges Editor */}
                            <div className="space-y-1.5 pt-1">
                              <label className="block font-mono text-slate-700 font-bold text-[11px]">
                                이 섹션 기술 스택 뱃지 (Section Tags)
                              </label>
                              <div className="flex flex-wrap gap-1.5 mb-1">
                                {sec.tags && sec.tags.map((tag, tagIdx) => (
                                  <span key={tagIdx} className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-blue-50 text-[#0055ff] text-[10px] font-mono font-bold border border-blue-200 rounded">
                                    {tag}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newTags = sec.tags ? sec.tags.filter((_, i) => i !== tagIdx) : [];
                                        const updatedSections = { ...(editingProject.sections || {}) };
                                        updatedSections[key] = { ...sec, tags: newTags };
                                        setEditingProject({ ...editingProject, sections: updatedSections });
                                      }}
                                      className="text-blue-400 hover:text-rose-600 ml-0.5 font-bold"
                                    >
                                      ×
                                    </button>
                                  </span>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  id={`sec-tag-input-${key}`}
                                  placeholder="새 뱃지 입력 (예: React, KiCad) 후 Enter"
                                  className="flex-1 px-2.5 py-1 rounded border border-slate-300 font-mono text-[11px]"
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                      e.preventDefault();
                                      const val = e.currentTarget.value.trim();
                                      if (val) {
                                        const currentTags = sec.tags || [];
                                        if (!currentTags.includes(val)) {
                                          const updatedSections = { ...(editingProject.sections || {}) };
                                          updatedSections[key] = { ...sec, tags: [...currentTags, val] };
                                          setEditingProject({ ...editingProject, sections: updatedSections });
                                        }
                                        e.currentTarget.value = '';
                                      }
                                    }
                                  }}
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const input = document.getElementById(`sec-tag-input-${key}`) as HTMLInputElement;
                                    if (input && input.value.trim()) {
                                      const val = input.value.trim();
                                      const currentTags = sec.tags || [];
                                      if (!currentTags.includes(val)) {
                                        const updatedSections = { ...(editingProject.sections || {}) };
                                        updatedSections[key] = { ...sec, tags: [...currentTags, val] };
                                        setEditingProject({ ...editingProject, sections: updatedSections });
                                      }
                                      input.value = '';
                                    }
                                  }}
                                  className="px-2.5 py-1 bg-slate-800 hover:bg-[#0055ff] text-white font-mono text-[11px] font-bold rounded"
                                >
                                  추가
                                </button>
                              </div>
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center justify-between mb-1 gap-1">
                                <label className="block font-mono text-slate-700 font-bold text-[11px]">
                                  본문 내용 (Content)
                                </label>
                                <div className="flex flex-wrap items-center gap-1 font-mono text-[10px]">
                                  <span className="text-slate-400">서식 도구:</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedContent = (sec.content || '') + ' **볼드체텍스트** ';
                                      const updatedSections = { ...(editingProject.sections || {}) };
                                      updatedSections[key] = { ...sec, content: updatedContent };
                                      setEditingProject({ ...editingProject, sections: updatedSections });
                                    }}
                                    className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 font-bold text-slate-900 rounded"
                                    title="볼드체 (**텍스트**)"
                                  >
                                    굵게(B)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedContent = (sec.content || '') + '\n### 소제목 (큰 글씨)\n';
                                      const updatedSections = { ...(editingProject.sections || {}) };
                                      updatedSections[key] = { ...sec, content: updatedContent };
                                      setEditingProject({ ...editingProject, sections: updatedSections });
                                    }}
                                    className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 font-bold text-slate-900 rounded"
                                    title="소제목/큰 글씨 (### 소제목)"
                                  >
                                    소제목(H)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedContent = (sec.content || '') + ' [lg]큰 글씨[/lg] ';
                                      const updatedSections = { ...(editingProject.sections || {}) };
                                      updatedSections[key] = { ...sec, content: updatedContent };
                                      setEditingProject({ ...editingProject, sections: updatedSections });
                                    }}
                                    className="px-1.5 py-0.5 bg-slate-200 hover:bg-slate-300 font-bold text-slate-900 rounded"
                                    title="글씨 키우기 ([lg]...[/lg])"
                                  >
                                    글씨↑(T+)
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedContent = (sec.content || '') + ' [blue]강조텍스트[/blue] ';
                                      const updatedSections = { ...(editingProject.sections || {}) };
                                      updatedSections[key] = { ...sec, content: updatedContent };
                                      setEditingProject({ ...editingProject, sections: updatedSections });
                                    }}
                                    className="px-1.5 py-0.5 bg-blue-100 hover:bg-blue-200 font-bold text-[#0055ff] rounded"
                                    title="파란색 강조 ([blue]...[/blue])"
                                  >
                                    파란강조
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedContent = (sec.content || '') + ' [highlight]형광펜강조[/highlight] ';
                                      const updatedSections = { ...(editingProject.sections || {}) };
                                      updatedSections[key] = { ...sec, content: updatedContent };
                                      setEditingProject({ ...editingProject, sections: updatedSections });
                                    }}
                                    className="px-1.5 py-0.5 bg-yellow-100 hover:bg-yellow-200 font-bold text-amber-900 rounded"
                                    title="형광펜 강조 ([highlight]...[/highlight])"
                                  >
                                    형광펜
                                  </button>
                                </div>
                              </div>
                              <textarea
                                rows={3}
                                value={sec.content || ''}
                                onChange={(e) => {
                                  const updatedSections = { ...(editingProject.sections || {}) };
                                  updatedSections[key] = { ...sec, content: e.target.value };
                                  setEditingProject({ ...editingProject, sections: updatedSections });
                                }}
                                className="w-full px-3 py-2 rounded border border-slate-300 font-sans text-xs leading-relaxed"
                                placeholder="본문 내용을 입력하세요 (줄바꿈 지원, **볼드체**, [lg]큰 글씨[/lg], [blue]파란글씨[/blue], ### 소제목 사용 가능)"
                              />
                            </div>

                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <label className="block font-mono text-slate-700 font-bold text-[11px]">
                                  사진 첨부 (Multiple Images & Positioning)
                                </label>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const currentImages = sec.images && sec.images.length > 0 ? sec.images : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                    const newImage = { id: Math.random().toString(), url: '', imageSize: 'full' as const, imageAlign: 'center' as const, imagePosition: 'bottom' as const };
                                    const updatedSections = { ...(editingProject.sections || {}) };
                                    updatedSections[key] = { ...sec, images: [...currentImages, newImage] };
                                    setEditingProject({ ...editingProject, sections: updatedSections });
                                  }}
                                  className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-mono font-bold rounded flex items-center gap-1"
                                >
                                  <Plus className="w-3 h-3" />
                                  <span>+ 사진 추가</span>
                                </button>
                              </div>

                              <div className="space-y-3 pt-2">
                                {((sec.images && sec.images.length > 0) ? sec.images : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : [])).map((imgItem, imgIdx) => (
                                  <div key={imgItem.id || imgIdx} className="bg-slate-50 p-3 rounded border border-slate-200 space-y-2 relative">
                                    <div className="flex items-center justify-between font-mono text-[11px] text-slate-700 font-bold">
                                      <div className="flex items-center gap-2">
                                        <span>사진 #{imgIdx + 1}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            const prefix = (sec.content && !sec.content.endsWith('\n')) ? '\n' : '';
                                            const tag = `${prefix}[image:${imgIdx}]\n`;
                                            const updatedContent = (sec.content || '') + tag;
                                            const updatedSections = { ...(editingProject.sections || {}) };
                                            updatedSections[key] = { ...sec, content: updatedContent };
                                            setEditingProject({ ...editingProject, sections: updatedSections });
                                          }}
                                          className="px-1.5 py-0.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded text-[10px]"
                                          title="본문 내용 맨 뒤에 이 사진 삽입 태그 [image:번호] 추가"
                                        >
                                          + 본문 삽입 태그([image:{imgIdx}])
                                        </button>
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const currentImages = sec.images && sec.images.length > 0 ? sec.images : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                          const updatedImages = currentImages.filter((_, idx) => idx !== imgIdx);
                                          const updatedSections = { ...(editingProject.sections || {}) };
                                          updatedSections[key] = { ...sec, images: updatedImages, imageUrl: updatedImages.length === 0 ? '' : sec.imageUrl };
                                          setEditingProject({ ...editingProject, sections: updatedSections });
                                        }}
                                        className="text-rose-600 hover:text-rose-800 text-[10px] bg-white px-1.5 py-0.5 border border-rose-200 rounded"
                                      >
                                        삭제 ✕
                                      </button>
                                    </div>

                                    {/* Image Input Options: Upload vs Web URL */}
                                    <div className="space-y-2 bg-white p-2.5 rounded border border-slate-200">
                                      <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-700">
                                        <span>사진 소스 (웹 URL 링크 또는 파일 업로드)</span>
                                        {imgItem.url && (
                                          <button
                                            type="button"
                                            onClick={() => {
                                              const currentImages = sec.images && sec.images.length > 0 ? [...sec.images] : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                              currentImages[imgIdx] = { ...imgItem, url: '' };
                                              const updatedSections = { ...(editingProject.sections || {}) };
                                              updatedSections[key] = { ...sec, images: currentImages };
                                              setEditingProject({ ...editingProject, sections: updatedSections });
                                            }}
                                            className="text-slate-400 hover:text-rose-600 text-[10px]"
                                          >
                                            사진 비우기
                                          </button>
                                        )}
                                      </div>

                                      <div className="flex flex-col sm:flex-row gap-2.5 items-start">
                                        {/* Image Preview */}
                                        {imgItem.url ? (
                                          <div className="w-24 h-16 bg-slate-100 border border-slate-300 rounded overflow-hidden flex-shrink-0 relative group">
                                            <img
                                              src={imgItem.url}
                                              alt="미리보기"
                                              className="w-full h-full object-cover"
                                              referrerPolicy="no-referrer"
                                              onError={(e) => {
                                                (e.target as HTMLElement).style.opacity = '0.3';
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <div className="w-24 h-16 bg-slate-50 border border-dashed border-slate-300 rounded flex flex-col items-center justify-center text-slate-400 flex-shrink-0">
                                            <ImageIcon className="w-4 h-4 mb-0.5" />
                                            <span className="text-[9px] font-mono">이미지 없음</span>
                                          </div>
                                        )}

                                        <div className="flex-1 w-full space-y-2">
                                          {/* Option B: Web URL Input (Recommended) */}
                                          <div className="space-y-1">
                                            <div className="flex items-center justify-between">
                                              <span className="text-[10px] font-mono font-bold text-blue-700 flex items-center gap-1">
                                                <span className="bg-blue-100 text-blue-800 px-1 py-0.2 rounded text-[9px]">권장</span> 웹 URL 링크 입력:
                                              </span>
                                              <span className="text-[9px] text-slate-400 font-mono">용량 제한 없음 (Imgur, GitHub, 구글 드라이브 등)</span>
                                            </div>
                                            <input
                                              type="text"
                                              placeholder="https://raw.githubusercontent.com/... 또는 https://i.imgur.com/... 이미지 URL"
                                              value={imgItem.url || ''}
                                              onChange={(e) => {
                                                const currentImages = sec.images && sec.images.length > 0 ? [...sec.images] : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                                currentImages[imgIdx] = { ...imgItem, url: e.target.value };
                                                const updatedSections = { ...(editingProject.sections || {}) };
                                                updatedSections[key] = { ...sec, images: currentImages };
                                                setEditingProject({ ...editingProject, sections: updatedSections });
                                              }}
                                              className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs bg-slate-50 focus:bg-white focus:border-[#0055ff] outline-none"
                                            />
                                          </div>

                                          {/* Option A: Local File Upload */}
                                          <div className="flex items-center gap-2 pt-0.5">
                                            <span className="text-[10px] font-mono text-slate-500">또는 내 PC 파일:</span>
                                            <label className="px-2 py-1 bg-slate-800 hover:bg-[#0055ff] text-white font-mono font-bold text-[10px] rounded cursor-pointer inline-flex items-center gap-1 transition-colors">
                                              <Upload className="w-3 h-3" />
                                              <span>파일 업로드</span>
                                              <input
                                                type="file"
                                                accept="image/*"
                                                onChange={async (e) => {
                                                  const file = e.target.files?.[0];
                                                  if (file) {
                                                    try {
                                                      const compressed = await compressImage(file, 1100, 1100, 0.76);
                                                      if (compressed) {
                                                        const currentImages = sec.images && sec.images.length > 0 ? [...sec.images] : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                                        currentImages[imgIdx] = { ...imgItem, url: compressed };
                                                        const updatedSections = { ...(editingProject.sections || {}) };
                                                        updatedSections[key] = { ...sec, images: currentImages };
                                                        setEditingProject({ ...editingProject, sections: updatedSections });
                                                      }
                                                    } catch (err) {
                                                      console.error('Section image compression error:', err);
                                                    }
                                                  }
                                                }}
                                                className="hidden"
                                              />
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                                      <div>
                                        <span className="block font-mono text-[10px] text-slate-700 font-bold mb-1">크기 (Size)</span>
                                        <select
                                          value={imgItem.imageSize || 'full'}
                                          onChange={(e) => {
                                            const currentImages = sec.images && sec.images.length > 0 ? [...sec.images] : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                            currentImages[imgIdx] = { ...imgItem, imageSize: e.target.value as any };
                                            const updatedSections = { ...(editingProject.sections || {}) };
                                            updatedSections[key] = { ...sec, images: currentImages };
                                            setEditingProject({ ...editingProject, sections: updatedSections });
                                          }}
                                          className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-xs bg-white"
                                        >
                                          <option value="full">전체 너비 (100%)</option>
                                          <option value="lg">크게 (75%)</option>
                                          <option value="md">중간 (50%)</option>
                                          <option value="sm">작게 (25%)</option>
                                        </select>
                                      </div>
                                      <div>
                                        <span className="block font-mono text-[10px] text-slate-700 font-bold mb-1">정렬 (Align)</span>
                                        <select
                                          value={imgItem.imageAlign || 'center'}
                                          onChange={(e) => {
                                            const currentImages = sec.images && sec.images.length > 0 ? [...sec.images] : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                            currentImages[imgIdx] = { ...imgItem, imageAlign: e.target.value as any };
                                            const updatedSections = { ...(editingProject.sections || {}) };
                                            updatedSections[key] = { ...sec, images: currentImages };
                                            setEditingProject({ ...editingProject, sections: updatedSections });
                                          }}
                                          className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-xs bg-white"
                                        >
                                          <option value="center">중앙 정렬</option>
                                          <option value="left">좌측 정렬</option>
                                          <option value="right">우측 정렬</option>
                                        </select>
                                      </div>
                                      <div>
                                        <span className="block font-mono text-[10px] text-slate-700 font-bold mb-1">기본 위치</span>
                                        <select
                                          value={imgItem.imagePosition || 'bottom'}
                                          onChange={(e) => {
                                            const currentImages = sec.images && sec.images.length > 0 ? [...sec.images] : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                                            currentImages[imgIdx] = { ...imgItem, imagePosition: e.target.value as any };
                                            const updatedSections = { ...(editingProject.sections || {}) };
                                            updatedSections[key] = { ...sec, images: currentImages };
                                            setEditingProject({ ...editingProject, sections: updatedSections });
                                          }}
                                          className="w-full px-2 py-1 rounded border border-slate-300 font-mono text-xs bg-white"
                                        >
                                          <option value="bottom">하단</option>
                                          <option value="top">상단</option>
                                          <option value="middle">중간</option>
                                        </select>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                {(!sec.images || sec.images.length === 0) && !sec.imageUrl && (
                                  <div className="text-[11px] font-mono text-slate-400 py-1">
                                    등록된 사진이 없습니다. [+ 사진 추가] 버튼을 눌러 여러 장의 사진을 추가하세요.
                                  </div>
                                )}

                                <div className="text-[10px] font-mono text-slate-500 pt-1 space-y-1">
                                  <div>
                                    💡 <strong>위치 지정 방법:</strong> 본문 내용 중 원하는 위치에 <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-700 font-bold">[image:0]</code>, <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-700 font-bold">[image:1]</code> 또는 <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-700 font-bold">[image]</code>를 적으면 해당 위치에 사진이 즉시 삽입됩니다.
                                  </div>
                                  <div>
                                    🌐 <strong>외부 이미지 직접 삽입:</strong> 본문 입력창에 <code className="bg-slate-200 px-1 py-0.5 rounded text-blue-700">![설명](이미지URL)</code> 형태로 마크다운 문법을 바로 적으셔도 이미지가 출력됩니다.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* GitHub Repository Link */}
                      <div>
                        <label className="block font-mono font-bold text-slate-700 mb-1">
                          GitHub 저장소 링크 (URL)
                        </label>
                        <input
                          type="text"
                          placeholder="https://github.com/..."
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs"
                        />
                      </div>

                      {/* Project Multi-PDF Documents Section */}
                      {(() => {
                        const pdfDocsList = getEditingPdfDocuments();

                        return (
                          <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
                              <div>
                                <label className="block font-mono font-bold text-slate-800 text-xs">
                                  📄 프로젝트 PDF 문서 첨부 (다중 등록 지원 / Multi-PDF)
                                </label>
                                <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                                  기술 보고서, 논문, 발표자료 등 여러 개의 PDF 파일을 등록할 수 있습니다.
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={handleAddProjectPdfItem}
                                className="px-2.5 py-1 bg-[#0055ff] hover:bg-blue-700 text-white font-mono font-bold text-xs rounded flex items-center gap-1.5 transition-colors shadow-2xs"
                              >
                                <Plus className="w-3.5 h-3.5" />
                                <span>PDF 문서 추가</span>
                              </button>
                            </div>

                            {pdfDocsList.length === 0 ? (
                              <div className="p-4 border-2 border-dashed border-slate-200 rounded text-center bg-slate-50/50">
                                <FileText className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                                <p className="text-xs font-mono text-slate-500 font-medium">
                                  등록된 PDF 문서가 없습니다.
                                </p>
                                <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                                  위의 [+ PDF 문서 추가] 버튼을 눌러 PDF 보고서나 논문을 등록해 보세요.
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                {pdfDocsList.map((docItem, docIdx) => (
                                  <div
                                    key={docItem.id || docIdx}
                                    className="p-3.5 rounded border border-slate-200 bg-slate-50/70 space-y-3 relative"
                                  >
                                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
                                      <div className="flex items-center gap-2">
                                        <span className="w-5 h-5 rounded-full bg-[#0055ff] text-white font-mono font-bold text-[10px] flex items-center justify-center">
                                          {docIdx + 1}
                                        </span>
                                        <span className="font-mono text-xs font-bold text-slate-800">
                                          PDF 문서 #{docIdx + 1}
                                        </span>
                                        {docItem.url && (
                                          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                            ✓ 연결 완료
                                          </span>
                                        )}
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveProjectPdfItem(docItem.id)}
                                        className="text-rose-600 hover:text-rose-800 p-1 font-mono text-xs flex items-center gap-1 font-bold transition-colors"
                                        title="문서 삭제"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>삭제</span>
                                      </button>
                                    </div>

                                    {/* Document Title / Button Label */}
                                    <div>
                                      <label className="block text-[11px] font-mono text-slate-700 font-bold mb-1">
                                        문서 명칭 / 버튼 문구 (Title / Button Label)
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="예: 기술 보고서, IEEE 논문, 발표자료, 사양서 등"
                                        value={docItem.title || ''}
                                        onChange={(e) => handleUpdateProjectPdfItem(docItem.id, { title: e.target.value })}
                                        className="w-full px-3 py-1.5 rounded border border-slate-300 font-mono text-xs bg-white"
                                      />
                                    </div>

                                    {/* Source Option A: PC Upload & Option B: Web URL */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                      <div className="space-y-1.5">
                                        <span className="block text-[11px] font-mono text-slate-600 font-bold">
                                          Option A: 내 PC PDF 파일 업로드
                                        </span>
                                        <div className="flex flex-wrap items-center gap-2">
                                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-mono font-bold text-xs cursor-pointer transition-colors rounded">
                                            <Upload className="w-3.5 h-3.5" />
                                            <span>파일 선택</span>
                                            <input
                                              type="file"
                                              accept=".pdf,application/pdf"
                                              onChange={(e) => handleProjectPdfFileUpload(docItem.id, e)}
                                              className="hidden"
                                            />
                                          </label>
                                          {docItem.url && docItem.url.startsWith('data:') && (
                                            <div className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded border border-slate-300 font-mono text-xs">
                                              <FileText className="w-3.5 h-3.5 text-[#0055ff]" />
                                              <span className="font-bold text-slate-700 truncate max-w-[140px]">
                                                {docItem.fileName || '업로드됨.pdf'}
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </div>

                                      <div className="space-y-1.5">
                                        <span className="block text-[11px] font-mono text-slate-600 font-bold">
                                          Option B: 외부 웹 PDF 링크 (URL)
                                        </span>
                                        <input
                                          type="text"
                                          placeholder="https://.../document.pdf"
                                          value={docItem.url && !docItem.url.startsWith('data:') ? docItem.url : ''}
                                          onChange={(e) => handleUpdateProjectPdfItem(docItem.id, { url: e.target.value, fileName: undefined })}
                                          className="w-full px-3 py-1.5 rounded border border-slate-300 font-mono text-xs bg-white"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })()}

                      {/* Submit & Action Buttons */}
                      <div className="pt-2 flex items-center justify-between border-t border-slate-200">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded"
                        >
                          취소
                        </button>

                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#0055ff] hover:bg-blue-700 text-white font-bold rounded flex items-center gap-2 shadow-sm"
                        >
                          <Save className="w-4 h-4" />
                          <span>프로젝트 저장하기</span>
                        </button>
                      </div>

                    </form>
                  </div>
                ) : (
                  /* Project List View */
                  <div className="space-y-4">
                    
                    <div className="flex items-center justify-between">
                      <h4 className="font-mono font-bold text-sm text-slate-900">
                        등록된 대표 프로젝트 ({editableProjects.length}개)
                      </h4>

                      <button
                        onClick={handleAddNewProject}
                        className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#0055ff] hover:bg-blue-700 text-white font-mono font-bold text-xs rounded transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" />
                        <span>새 프로젝트 추가</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {editableProjects.map((proj) => (
                        <div
                          key={proj.id}
                          className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-blue-400 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-14 bg-slate-900 rounded overflow-hidden flex-shrink-0 border border-slate-300">
                              <img
                                src={proj.thumbnail}
                                alt={proj.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 bg-slate-200 text-slate-800 text-[10px] font-mono font-bold rounded">
                                  {proj.category}
                                </span>
                                <h5 className="font-bold text-slate-900 text-sm font-sans">
                                  {proj.title}
                                </h5>
                              </div>
                              <p className="text-xs text-slate-500 font-mono mt-0.5">
                                {proj.subtitle}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center font-mono text-xs">
                            <button
                              onClick={() => {
                                const pCopy = { ...proj };
                                if (!pCopy.sections) {
                                  pCopy.sections = {
                                    overview: { title: pCopy.sectionTitles?.overview || "1. 프로젝트 개요 및 개발 목적 (Overview & Purpose)", content: pCopy.overview || "", imageUrl: "" },
                                    architecture: { title: pCopy.sectionTitles?.architecture || "2. 시스템 아키텍처 (System Flow & Architecture)", content: (pCopy.systemArchitecture || []).join('\n'), imageUrl: "" },
                                    hardware: { title: pCopy.sectionTitles?.hardware || "3. 하드웨어 회로 & PCB 설계 (Hardware & PCB Stackup)", content: pCopy.circuitSchematics?.pcbLayers || "", imageUrl: "" },
                                    firmware: { title: pCopy.sectionTitles?.firmware || "4. 임베디드 펌웨어 & FSM 구조 (Firmware & RTOS)", content: pCopy.firmwareArchitecture?.fsmDescription || "", imageUrl: "" },
                                    aiModel: { title: "5. AI 모델 & 양자화 파이프라인 (AI Model Architecture)", content: pCopy.aiModelDetails?.modelType || "", imageUrl: "" },
                                    metrics: { title: "6. 실험 및 측정 성능 결과 (Benchmark Metrics)", content: `Accuracy: ${pCopy.metrics?.accuracy || ''}\nFPS: ${pCopy.metrics?.fps || ''}`, imageUrl: "" },
                                    troubleshooting: { title: "7. 문제 해결 및 트러블슈팅 (Engineering Trouble Shooting)", content: (pCopy.troubleshooting || []).map(t => `문제: ${t.problem}\n해결: ${t.solution}`).join('\n\n'), imageUrl: "" },
                                  };
                                }
                                setEditingProject(pCopy);
                              }}
                              className="px-3 py-1.5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded inline-flex items-center gap-1 transition-colors"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>수정</span>
                            </button>

                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className={`px-2.5 py-1.5 font-bold border rounded inline-flex items-center gap-1 transition-colors ${
                                deleteConfirmProjectId === proj.id
                                  ? 'bg-rose-600 text-white border-rose-600 animate-pulse'
                                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>{deleteConfirmProjectId === proj.id ? '정말 삭제?' : '삭제'}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6 text-xs font-sans">
                
                {/* 1. Home Section (메인 첫페이지) 전체 수정 영역 */}
                <div className="bg-blue-50/50 border border-blue-200 p-4 rounded-xl space-y-4 shadow-2xs">
                  <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                    <h4 className="font-mono font-bold text-blue-950 text-sm flex items-center gap-2">
                      <span>🏠</span>
                      <span>HOME (첫 페이지 / 메인 화면) 섹션 전체 수정</span>
                    </h4>
                    <span className="text-[11px] font-mono text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded">
                      실시간 반영
                    </span>
                  </div>

                  {/* Name, EngName, Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">성함 (Name)</label>
                      <input
                        type="text"
                        value={editableProfile.name}
                        onChange={(e) => setEditableProfile({ ...editableProfile, name: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono bg-white"
                        placeholder="예: 황지호"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">영문 성함 (English Name)</label>
                      <input
                        type="text"
                        value={editableProfile.engName}
                        onChange={(e) => setEditableProfile({ ...editableProfile, engName: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono bg-white"
                        placeholder="예: Ji-Ho Hwang"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">직함 / 주요 분야 (Title)</label>
                      <input
                        type="text"
                        value={editableProfile.title}
                        onChange={(e) => setEditableProfile({ ...editableProfile, title: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono bg-white"
                        placeholder="예: 전자공학 & AI/임베디드 신입 엔지니어"
                      />
                    </div>
                  </div>

                  {/* Catchphrase */}
                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">
                      메인 캐치프레이즈 (Catchphrase)
                    </label>
                    <textarea
                      rows={2}
                      value={editableProfile.homeCatchphrase || ''}
                      onChange={(e) => setEditableProfile({ ...editableProfile, homeCatchphrase: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 font-sans leading-relaxed bg-white"
                      placeholder="예: 전자공학 기초 지식과 1년의 학부연구생 경험을 바탕으로 빠르게 배우고 성장하는 준비된 신입 개발자입니다."
                    />
                  </div>

                  {/* Tech Badges & CTA Text */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">
                        기술 배지 태그 (Home Tech Badges - 쉼표(,) 구분)
                      </label>
                      <input
                        type="text"
                        value={(editableProfile.homeBadges || []).join(', ')}
                        onChange={(e) => {
                          const badges = e.target.value.split(',').map(s => s.trim());
                          setEditableProfile({ ...editableProfile, homeBadges: badges });
                        }}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs bg-white"
                        placeholder="예: 회로 이론/설계, C/C++, Verilog, Python/PyTorch, STM32"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">
                        이력서 다운로드 버튼 문구 (CTA Button Text)
                      </label>
                      <input
                        type="text"
                        value={editableProfile.homeCtaText || ''}
                        onChange={(e) => setEditableProfile({ ...editableProfile, homeCtaText: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs bg-white"
                        placeholder="예: 이력서 (PDF) 바로 다운로드"
                      />
                    </div>
                  </div>

                  {/* Summary Box Title & Desc */}
                  <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-slate-800 text-xs block">
                      📌 메인 포부 / 요약 박스 설정
                    </span>
                    <div>
                      <label className="block font-mono text-slate-600 mb-1 text-[11px]">요약 박스 제목 (Title)</label>
                      <input
                        type="text"
                        value={editableProfile.homeSummaryTitle || ''}
                        onChange={(e) => setEditableProfile({ ...editableProfile, homeSummaryTitle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded border border-slate-300 font-sans font-bold"
                        placeholder="예: [신입 포부] 빠른 학습 능력과 강한 정직함으로 기여하겠습니다."
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-slate-600 mb-1 text-[11px]">요약 박스 상세 내용 (Description)</label>
                      <textarea
                        rows={2}
                        value={editableProfile.homeSummaryDesc || ''}
                        onChange={(e) => setEditableProfile({ ...editableProfile, homeSummaryDesc: e.target.value })}
                        className="w-full px-3 py-1.5 rounded border border-slate-300 font-sans text-xs leading-relaxed"
                        placeholder="예: 숙명여대 전자공학과 전공 과정과 AI 랩 학부연구생 1년 경험으로 기초 프로젝트를 완수했습니다."
                      />
                    </div>
                  </div>

                  {/* Profile Photo Management */}
                  <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-slate-800 text-xs block">
                      📷 프로필 / 증명사진 이미지 설정
                    </span>
                    <div className="flex flex-wrap items-center gap-4">
                      {editableProfile.photoUrl && (
                        <div className="w-20 h-20 bg-slate-100 border border-slate-300 rounded overflow-hidden shrink-0">
                          <img src={editableProfile.photoUrl} alt="미리보기" className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <label className="px-3 py-1.5 bg-[#0055ff] hover:bg-blue-700 text-white font-mono font-bold text-xs rounded cursor-pointer transition-colors inline-flex items-center gap-1.5">
                            <Upload className="w-3.5 h-3.5" />
                            <span>사진 파일 선택 업로드</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoFileUpload}
                              className="hidden"
                            />
                          </label>
                          {editableProfile.photoUrl && (
                            <button
                              type="button"
                              onClick={() => setEditableProfile({ ...editableProfile, photoUrl: '' })}
                              className="px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 font-mono font-bold text-xs rounded border border-rose-200"
                            >
                              사진 삭제
                            </button>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-slate-500">
                          또는 이미지 URL 직접 입력:
                        </div>
                        <input
                          type="text"
                          value={editableProfile.photoUrl || ''}
                          onChange={(e) => setEditableProfile({ ...editableProfile, photoUrl: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Quick Info Grid */}
                  <div className="space-y-3 bg-white p-3 rounded-lg border border-slate-200">
                    <span className="font-mono font-bold text-slate-800 text-xs block">
                      📋 우측 미니 프로필 카드 항목
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">학교 / 학과</label>
                        <input
                          type="text"
                          value={editableProfile.university}
                          onChange={(e) => setEditableProfile({ ...editableProfile, university: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">학점 (GPA)</label>
                        <input
                          type="text"
                          value={editableProfile.gpa}
                          onChange={(e) => setEditableProfile({ ...editableProfile, gpa: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">학부 연구생 정보</label>
                        <input
                          type="text"
                          value={editableProfile.homeLabRole || ''}
                          onChange={(e) => setEditableProfile({ ...editableProfile, homeLabRole: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                          placeholder="예: 컴퓨터비전 랩 (1년)"
                        />
                      </div>

                    </div>
                  </div>

                </div>

                {/* 2. Basic Profile & Bio */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                  <h4 className="font-mono font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                    👤 기본 프로필 및 인적사항
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">성함 (Name)</label>
                      <input
                        type="text"
                        value={editableProfile.name}
                        onChange={(e) => setEditableProfile({ ...editableProfile, name: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">직함 (Title)</label>
                      <input
                        type="text"
                        value={editableProfile.title}
                        onChange={(e) => setEditableProfile({ ...editableProfile, title: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">메인 캐치프레이즈 (Headline)</label>
                    <input
                      type="text"
                      value={editableProfile.headline}
                      onChange={(e) => setEditableProfile({ ...editableProfile, headline: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">이메일 (Email)</label>
                      <input
                        type="text"
                        value={editableProfile.email}
                        onChange={(e) => setEditableProfile({ ...editableProfile, email: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">거주지 / 위치 (Location)</label>
                      <input
                        type="text"
                        value={editableProfile.location}
                        onChange={(e) => setEditableProfile({ ...editableProfile, location: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">GitHub URL</label>
                      <input
                        type="text"
                        value={editableProfile.github}
                        onChange={(e) => setEditableProfile({ ...editableProfile, github: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">LinkedIn URL</label>
                      <input
                        type="text"
                        value={editableProfile.linkedin}
                        onChange={(e) => setEditableProfile({ ...editableProfile, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. About Me Section Header & Bio */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                  <h4 className="font-mono font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                    01. ABOUT ME 섹션 헤더 및 자기소개
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">
                        섹션 상단 소태그 (Section Subtag)
                      </label>
                      <input
                        type="text"
                        value={editableProfile.aboutTag || 'PROFILE & SKILLS'}
                        onChange={(e) => setEditableProfile({ ...editableProfile, aboutTag: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                        placeholder="예: PROFILE & SKILLS"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">
                        섹션 메인 제목 (Section Title)
                      </label>
                      <input
                        type="text"
                        value={editableProfile.aboutTitle || '01. ABOUT ME (자기소개 & 핵심 역량)'}
                        onChange={(e) => setEditableProfile({ ...editableProfile, aboutTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                        placeholder="예: 01. ABOUT ME (자기소개 & 핵심 역량)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">
                      자기소개 카드 제목 (Bio Card Title)
                    </label>
                    <input
                      type="text"
                      value={editableProfile.aboutBioTitle || '자기소개 (Introduce)'}
                      onChange={(e) => setEditableProfile({ ...editableProfile, aboutBioTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      placeholder="예: 자기소개 (Introduce)"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">자기소개 전문 (Bio)</label>
                    <textarea
                      rows={5}
                      value={editableProfile.bio}
                      onChange={(e) => setEditableProfile({ ...editableProfile, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 font-sans leading-relaxed"
                    />
                  </div>
                </div>

                {/* 3. Academic & Lab Section */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                  <h4 className="font-mono font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
                    🎓 학력 사항 &amp; 🏢 학부연구생 정보
                  </h4>

                  {/* Academic Info */}
                  <div className="space-y-3 bg-white p-3 rounded border border-slate-200">
                    <div className="font-mono font-bold text-slate-800 text-xs">학력 사항 (Academic)</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">학력 카드 제목</label>
                        <input
                          type="text"
                          value={editableProfile.academicTitle || '학력 사항'}
                          onChange={(e) => setEditableProfile({ ...editableProfile, academicTitle: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">대학교명</label>
                        <input
                          type="text"
                          value={editableProfile.university}
                          onChange={(e) => setEditableProfile({ ...editableProfile, university: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">전공명</label>
                        <input
                          type="text"
                          value={editableProfile.major}
                          onChange={(e) => setEditableProfile({ ...editableProfile, major: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">학점 (GPA)</label>
                        <input
                          type="text"
                          value={editableProfile.gpa}
                          onChange={(e) => setEditableProfile({ ...editableProfile, gpa: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lab Info */}
                  <div className="space-y-3 bg-white p-3 rounded border border-slate-200">
                    <div className="font-mono font-bold text-slate-800 text-xs">학부연구생 활동 (Lab Activity)</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">연구실 카드 제목</label>
                        <input
                          type="text"
                          value={editableProfile.labTitle || '학부연구생 활동'}
                          onChange={(e) => setEditableProfile({ ...editableProfile, labTitle: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">연구실 명칭</label>
                        <input
                          type="text"
                          value={editableProfile.labName}
                          onChange={(e) => setEditableProfile({ ...editableProfile, labName: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">랩 소속/기간 (Role/Period)</label>
                        <input
                          type="text"
                          value={editableProfile.labRole || '컴퓨터비전 랩 (1년)'}
                          onChange={(e) => setEditableProfile({ ...editableProfile, labRole: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                          placeholder="예: 컴퓨터비전 랩 (1년)"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-600 mb-1 text-[11px]">주요 연구 분야 (Subject)</label>
                        <input
                          type="text"
                          value={editableProfile.labSubject || '반도체 Wafermap AI 연구'}
                          onChange={(e) => setEditableProfile({ ...editableProfile, labSubject: e.target.value })}
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono"
                          placeholder="예: 반도체 Wafermap AI 연구"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Title */}
                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">
                      연락처 블록 제목 (Contact Box Title)
                    </label>
                    <input
                      type="text"
                      value={editableProfile.contactTitle || 'CONTACT INFORMATION'}
                      onChange={(e) => setEditableProfile({ ...editableProfile, contactTitle: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                    />
                  </div>

                </div>

                {/* 3.5 Project Section Titles & Categories Management */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                  <div className="border-b border-slate-200 pb-2">
                    <h4 className="font-mono font-bold text-slate-900 text-sm">
                      📁 프로젝트 섹션 제목 및 카테고리 관리 (Projects Section Header & Categories)
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono text-slate-700 font-bold text-[11px] mb-1">
                        프로젝트 섹션 상단 태그 (Tag)
                      </label>
                      <input
                        type="text"
                        value={editableProfile.projectsTag || 'UNDERGRADUATE PROJECTS'}
                        onChange={(e) => setEditableProfile({ ...editableProfile, projectsTag: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs bg-white"
                        placeholder="UNDERGRADUATE PROJECTS"
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-slate-700 font-bold text-[11px] mb-1">
                        프로젝트 섹션 메인 제목 (Title)
                      </label>
                      <input
                        type="text"
                        value={editableProfile.projectsTitle || '02. 대표 프로젝트 (Projects & Lab Work)'}
                        onChange={(e) => setEditableProfile({ ...editableProfile, projectsTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs bg-white"
                        placeholder="02. 대표 프로젝트 (Projects & Lab Work)"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                    <span className="font-mono font-bold text-slate-900 text-xs">
                      카테고리 목록 (Categories)
                    </span>

                    <button
                      type="button"
                      onClick={handleAddProjectCategory}
                      className="px-2.5 py-1 bg-[#0055ff] hover:bg-blue-700 text-white font-mono font-bold text-xs rounded flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>카테고리 추가</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-mono text-slate-600">
                      프로젝트 등록 및 수정 시 선택할 수 있는 카테고리 목록을 관리합니다.
                    </div>
                    {(editableProfile.projectCategories || ['CV/ML', 'etc.']).map((catItem, catIdx) => (
                      <div key={catIdx} className="flex items-center gap-2 bg-white p-2.5 rounded border border-slate-300">
                        <input
                          type="text"
                          value={catItem}
                          onChange={(e) => handleProjectCategoryChange(catIdx, e.target.value)}
                          className="flex-1 px-3 py-1.5 rounded border border-slate-300 font-mono text-xs font-bold"
                          placeholder="카테고리 명 (예: AI/CV)"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveProjectCategory(catIdx)}
                          className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded"
                          title="삭제"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Tech Stack Categories & Title */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                    <h4 className="font-mono font-bold text-slate-900 text-sm">
                      🛠️ 보유 기술 스택 (Tech Stack) 카테고리 및 스킬 편집
                    </h4>

                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="px-2.5 py-1 bg-[#0055ff] hover:bg-blue-700 text-white font-mono font-bold text-xs rounded flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>카테고리 추가</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">
                        기술 스택 영역 제목 (Title)
                      </label>
                      <input
                        type="text"
                        value={editableProfile.techStackTitle || '보유 기술 스택 (Tech Stack)'}
                        onChange={(e) => setEditableProfile({ ...editableProfile, techStackTitle: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-mono font-bold text-slate-700 mb-1">
                        우측 서브태그 (Subtag)
                      </label>
                      <input
                        type="text"
                        value={editableProfile.techStackSubtag || 'BASIC & PRACTICAL'}
                        onChange={(e) => setEditableProfile({ ...editableProfile, techStackSubtag: e.target.value })}
                        className="w-full px-3 py-2 rounded border border-slate-300 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-700 mb-1">
                      하단 설명 노트 (Note / Tip)
                    </label>
                    <input
                      type="text"
                      value={editableProfile.techStackNote || '💡 학부 전공 수업과 1년의 랩실 경험을 통해 실무 기초 및 디버깅 능력을 습득했습니다.'}
                      onChange={(e) => setEditableProfile({ ...editableProfile, techStackNote: e.target.value })}
                      className="w-full px-3 py-2 rounded border border-slate-300 font-sans"
                    />
                  </div>

                  {/* Skill Categories List */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-mono font-bold text-slate-700">
                      등록된 기술 스택 카테고리 목록:
                    </div>

                    {(editableProfile.skillCategories || []).map((cat, idx) => (
                      <div key={idx} className="bg-white p-3 rounded border border-slate-300 space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={cat.title}
                            onChange={(e) => handleCategoryChange(idx, e.target.value, cat.skills.join(', '))}
                            placeholder="카테고리 제목 (예: 프로그래밍 언어)"
                            className="flex-1 px-2.5 py-1.5 rounded border border-slate-300 font-mono font-bold text-xs"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(idx)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-slate-500 mb-1">
                            세부 스킬 항목 (쉼표(,)로 구분):
                          </label>
                          <input
                            type="text"
                            value={cat.skills.join(', ')}
                            onChange={(e) => handleCategoryChange(idx, cat.title, e.target.value)}
                            placeholder="예: C / C++, Python, Verilog, MATLAB"
                            className="w-full px-2.5 py-1.5 rounded border border-slate-300 font-mono text-xs"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* 5. Resume PDF File Upload Box */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="block font-mono font-bold text-slate-800 text-xs">
                      📄 이력서 PDF 파일 등록 (Resume PDF Upload)
                    </label>
                    {editableProfile.resumePdfUrl && (
                      <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        ✓ PDF 등록됨
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500 font-mono">
                    여기서 PDF 이력서를 등록하면 방문자가 '이력서 다운로드' 버튼을 누를 때 즉시 이 PDF 파일이 다운로드됩니다.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#0055ff] hover:bg-blue-700 text-white font-mono font-bold text-xs cursor-pointer transition-colors rounded shadow-xs">
                      <Upload className="w-4 h-4" />
                      <span>PDF 파일 업로드</span>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleResumePdfUpload}
                        className="hidden"
                      />
                    </label>

                    {editableProfile.resumePdfUrl ? (
                      <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-slate-300 font-mono text-xs">
                        <FileText className="w-4 h-4 text-[#0055ff]" />
                        <span className="font-bold text-slate-800 truncate max-w-[200px]">
                          {editableProfile.resumePdfFileName || '황지호_이력서.pdf'}
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveResumePdf}
                          className="text-rose-600 hover:text-rose-800 ml-2 font-bold"
                          title="삭제"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-mono">
                        (등록된 PDF 없음)
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#0055ff] text-white font-bold text-xs hover:bg-blue-700 flex items-center justify-center gap-2 shadow-sm transition-colors font-mono"
                  >
                    <Save className="w-4 h-4" />
                    <span>프로필 및 About Me 수정사항 저장하기</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

      </div>
    </div>
  );
};

