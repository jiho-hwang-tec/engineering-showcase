import React, { useState } from 'react';
import { Project, ProjectSectionItem, UserProfile } from '../types';
import { Github, FileText, Settings, X, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  profile?: UserProfile;
  onOpenAdminProjects?: () => void;
  selectedSkillFilter?: string | null;
  onClearSkillFilter?: () => void;
}

const formatProjectContent = (text: string) => {
  if (!text) return '';
  let formatted = text;

  // 1. Markdown Headers (e.g. ### Header, ## Header, # Header)
  formatted = formatted.replace(/^### (.*$)/gim, '<span class="block text-xs sm:text-sm font-bold text-slate-900 mt-2 mb-1 font-mono">$1</span>');
  formatted = formatted.replace(/^## (.*$)/gim, '<span class="block text-sm sm:text-base font-bold text-slate-900 mt-2.5 mb-1.5 font-mono">$1</span>');
  formatted = formatted.replace(/^# (.*$)/gim, '<span class="block text-base sm:text-lg font-bold text-slate-900 mt-3 mb-2 font-mono">$1</span>');

  // 2. Custom Size Tags
  formatted = formatted.replace(/\[xl\](.*?)\[\/xl\]/gi, '<span class="text-base sm:text-lg font-bold text-slate-900 leading-snug">$1</span>');
  formatted = formatted.replace(/\[lg\](.*?)\[\/lg\]/gi, '<span class="text-sm sm:text-base font-bold text-slate-900 leading-snug">$1</span>');
  formatted = formatted.replace(/\[md\](.*?)\[\/md\]/gi, '<span class="text-xs sm:text-sm font-semibold text-slate-800">$1</span>');
  formatted = formatted.replace(/\[big\](.*?)\[\/big\]/gi, '<span class="text-sm sm:text-base font-bold text-slate-900 leading-snug">$1</span>');
  formatted = formatted.replace(/<big>(.*?)<\/big>/gi, '<span class="text-sm sm:text-base font-bold text-slate-900 leading-snug">$1</span>');

  // 3. Custom Color / Highlight Tags
  formatted = formatted.replace(/\[blue\](.*?)\[\/blue\]/gi, '<span class="text-[#0055ff] font-bold">$1</span>');
  formatted = formatted.replace(/\[red\](.*?)\[\/red\]/gi, '<span class="text-rose-600 font-bold">$1</span>');
  formatted = formatted.replace(/\[green\](.*?)\[\/green\]/gi, '<span class="text-emerald-600 font-bold">$1</span>');
  formatted = formatted.replace(/\[highlight\](.*?)\[\/highlight\]/gi, '<mark class="bg-yellow-100 text-slate-900 px-1 py-0.5 rounded font-semibold">$1</mark>');

  // 4. Markdown Bold & Italic
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
  formatted = formatted.replace(/__(.*?)__/g, '<strong class="font-bold text-slate-900">$1</strong>');
  formatted = formatted.replace(/(?<!\w)\*(?!\s)(.*?)(?<!\s)\*(?!\w)/g, '<em class="italic">$1</em>');

  // 5. Markdown Image format: ![alt](url)
  formatted = formatted.replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="my-2 text-center"><img src="$2" alt="$1" class="w-full max-w-[560px] mx-auto h-auto object-cover inline-block" referrerpolicy="no-referrer" /></div>');

  // 6. Inline Code: `code`
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-[#0055ff] font-mono text-[11px] border border-slate-200">$1</code>');

  return formatted;
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  profile,
  onOpenAdminProjects,
  selectedSkillFilter,
  onClearSkillFilter,
}) => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  // Filter projects if skill filter is active
  const filteredProjects = selectedSkillFilter
    ? projects.filter(p => 
        p.tags.some(t => t.toLowerCase().includes(selectedSkillFilter.toLowerCase())) ||
        p.category.toLowerCase().includes(selectedSkillFilter.toLowerCase()) ||
        p.title.toLowerCase().includes(selectedSkillFilter.toLowerCase())
      )
    : projects;

  const handleToggleExpand = (projectId: string) => {
    setExpandedProjectId(prev => (prev === projectId ? null : projectId));
  };

  return (
    <section id="projects" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-200 pb-3 mb-8 gap-3">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              {profile?.projectsTag || 'UNDERGRADUATE PROJECTS'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              {profile?.projectsTitle || '02. 대표 프로젝트 (Projects & Lab Work)'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {selectedSkillFilter && (
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 border border-blue-200 text-xs font-mono text-[#0055ff]">
                <span>Filter: #{selectedSkillFilter}</span>
                {onClearSkillFilter && (
                  <button onClick={onClearSkillFilter} className="hover:font-bold">×</button>
                )}
              </div>
            )}
            {onOpenAdminProjects && (
              <button
                onClick={onOpenAdminProjects}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-[#0055ff] text-white text-xs font-mono font-bold transition-colors rounded-none shadow-2xs"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>프로젝트 관리 / 사진 추가</span>
              </button>
            )}
            <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
              TOTAL: {filteredProjects.length} PROJECTS
            </span>
          </div>
        </div>

        {/* Project Cards Grid / Expanded View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const isExpanded = expandedProjectId === project.id;
            const isMain = Boolean(
              project.isMain ||
              project.id === 'proj-wafermap-ai' ||
              project.title.toLowerCase().includes('wafermap') ||
              project.title.toLowerCase().includes('waferclip') ||
              (project.subtitle && project.subtitle.toLowerCase().includes('wafermap'))
            );

            return (
              <React.Fragment key={project.id}>
                {/* Normal Card */}
                <div
                  onClick={() => handleToggleExpand(project.id)}
                  className={`bg-white border transition-all duration-200 flex flex-col justify-between overflow-hidden rounded-none shadow-2xs group cursor-pointer relative ${
                    isExpanded ? 'border-[#0055ff] ring-2 ring-[#0055ff]/20 bg-blue-50/10' : 'border-gray-200 hover:border-[#0055ff]'
                  }`}
                >
                  <div>
                    {/* Project Thumbnail Image */}
                    {project.thumbnail && (
                      <div className="w-full h-44 sm:h-48 overflow-hidden bg-slate-900 border-b border-gray-200 relative">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            const parent = (e.target as HTMLElement).parentElement;
                            if (parent) parent.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {project.category && project.category !== 'All' ? (
                            <span className="px-2 py-0.5 bg-blue-50 text-[#0055ff] text-[10px] font-mono font-bold border border-blue-200 uppercase">
                              {project.category}
                            </span>
                          ) : null}
                          {isMain && (
                            <span className="px-2 py-0.5 bg-[#002d72] text-white text-[10px] font-mono font-bold tracking-wider uppercase border border-[#001f52] shadow-xs">
                              MAIN PROJECT
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-[#0055ff] font-bold shrink-0">
                          {isExpanded ? '접기 ▲' : '상세 보기 ▼'}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0055ff] transition-colors leading-snug font-sans">
                        {project.title}
                      </h3>

                      <p className="text-xs text-[#0055ff] font-mono font-bold">
                        {project.subtitle}
                      </p>

                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {project.tags.map((tag, tagIdx) => (
                            <span key={tagIdx} className="px-2 py-0.5 bg-slate-50 text-slate-700 text-[10px] font-mono border border-slate-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3. Footer Links */}
                  <div className="p-5 pt-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-gray-200 font-mono text-xs">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="py-1.5 px-3 bg-white border border-gray-300 hover:border-slate-800 hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center gap-1.5 transition-colors rounded-none text-[11px]"
                        >
                          <Github className="w-3.5 h-3.5 text-slate-800" />
                          <span>GitHub</span>
                        </a>
                      )}

                      {/* Multiple PDF Documents */}
                      {(() => {
                        const pdfDocs = (project.pdfDocuments && project.pdfDocuments.length > 0)
                          ? project.pdfDocuments.filter(doc => !!doc.url)
                          : ((project.pdfReportFileUrl || project.pdfReportUrl) ? [{
                              id: 'legacy-pdf',
                              title: project.pdfReportLabel || 'PDF 보고서',
                              url: (project.pdfReportFileUrl || project.pdfReportUrl)!,
                              fileName: project.pdfReportFileName || `${project.title}_보고서.pdf`
                            }] : []);

                        return pdfDocs.map((doc, docIdx) => (
                          <a
                            key={doc.id || docIdx}
                            href={doc.url}
                            download={doc.fileName || `${project.title}_${doc.title || '보고서'}.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="py-1.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-gray-300 font-bold flex items-center justify-center gap-1.5 transition-colors rounded-none text-[11px]"
                          >
                            <FileText className="w-3.5 h-3.5 text-[#0055ff]" />
                            <span>{doc.title || 'PDF 보고서'}</span>
                          </a>
                        ));
                      })()}
                    </div>
                  </div>
                </div>

                {/* Expanded Detail Panel (Spans full width of grid) */}
                {isExpanded && (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white border-2 border-[#0055ff] shadow-xl p-6 sm:p-8 space-y-6 relative my-2 animate-fadeIn">

                    {/* Header */}
                    <div className="space-y-2.5 border-b border-gray-200 pb-5">
                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                        <span className="px-2.5 py-0.5 bg-[#0055ff] text-white font-bold uppercase tracking-wider rounded-none">
                          {project.category}
                        </span>
                        {isMain && (
                          <span className="px-2.5 py-0.5 bg-[#002d72] text-white font-bold uppercase tracking-wider rounded-none border border-[#001f52] shadow-xs">
                            MAIN PROJECT
                          </span>
                        )}
                        <span className="text-slate-500">{project.date}</span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
                        {project.title}
                      </h3>
                      <p className="text-slate-600 text-xs font-mono font-medium">
                        {project.subtitle}
                      </p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 text-[10px] font-mono bg-gray-100 text-slate-600 border border-gray-200 rounded-none">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Detail Header Action Links (GitHub & Multiple PDFs) */}
                      {(() => {
                        const pdfDocs = (project.pdfDocuments && project.pdfDocuments.length > 0)
                          ? project.pdfDocuments.filter(doc => !!doc.url)
                          : ((project.pdfReportFileUrl || project.pdfReportUrl) ? [{
                              id: 'legacy-pdf',
                              title: project.pdfReportLabel || 'PDF 보고서',
                              url: (project.pdfReportFileUrl || project.pdfReportUrl)!,
                              fileName: project.pdfReportFileName || `${project.title}_보고서.pdf`
                            }] : []);

                        if (!project.githubUrl && pdfDocs.length === 0) return null;

                        return (
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-1 px-2.5 bg-white border border-gray-300 hover:border-slate-800 hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-1.5 transition-colors rounded-none text-[11px] font-mono"
                              >
                                <Github className="w-3.5 h-3.5 text-slate-800" />
                                <span>GitHub Repository</span>
                              </a>
                            )}
                            {pdfDocs.map((doc, docIdx) => (
                              <a
                                key={doc.id || docIdx}
                                href={doc.url}
                                download={doc.fileName || `${project.title}_${doc.title || '보고서'}.pdf`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="py-1 px-2.5 bg-blue-50 hover:bg-blue-100 text-[#0055ff] border border-blue-200 font-bold flex items-center gap-1.5 transition-colors rounded-none text-[11px] font-mono"
                              >
                                <FileText className="w-3.5 h-3.5 text-[#0055ff]" />
                                <span>{doc.title || 'PDF 보고서'} 다운로드</span>
                              </a>
                            ))}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Flexible Sections Rendering (Title + Content + Image) */}
                    {project.sections ? (
                      Object.entries(project.sections as Record<string, ProjectSectionItem>).map(([key, sec]) => {
                        if (!sec || (!sec.title && !sec.content && !sec.imageUrl && (!sec.images || sec.images.length === 0))) return null;

                        const rawImages = (sec.images && sec.images.length > 0)
                          ? sec.images
                          : (sec.imageUrl ? [{ id: 'legacy', url: sec.imageUrl, imageSize: sec.imageSize || 'full', imageAlign: sec.imageAlign || 'center', imagePosition: sec.imagePosition || 'bottom' }] : []);
                        
                        const imagesList = rawImages.filter(img => img && typeof img.url === 'string' && img.url.trim().length > 0);

                        const renderImageItem = (imgItem: any, idx: number) => {
                          if (!imgItem || !imgItem.url) return null;
                          const sizeClass = 
                            imgItem.imageSize === 'sm' ? 'max-w-[220px]' :
                            imgItem.imageSize === 'md' ? 'max-w-[380px]' :
                            imgItem.imageSize === 'lg' ? 'max-w-[560px]' : 'w-full';

                          const alignClass = 
                            imgItem.imageAlign === 'left' ? 'text-left' :
                            imgItem.imageAlign === 'right' ? 'text-right' : 'text-center';

                          return (
                            <div key={imgItem.id || idx} className={`my-0.5 inline-block ${sizeClass} ${alignClass === 'text-left' ? 'mr-auto' : alignClass === 'text-right' ? 'ml-auto' : 'mx-auto'}`}>
                              <img 
                                src={imgItem.url} 
                                alt={sec.title || 'Project image'} 
                                className="w-full h-auto object-cover max-h-[500px] block" 
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            </div>
                          );
                        };

                        let renderedContent = null;
                        const contentText = sec.content || '';

                        if (imagesList.length > 0) {
                          const tagRegex = /\[(?:image|img|사진)(?:\s*:\s*(\d+))?\]/gi;
                          const hasAnyTags = /\[(?:image|img|사진)(?:\s*:\s*\d+)?\]/i.test(contentText);

                          if (hasAnyTags) {
                            let match;
                            let lastIndex = 0;
                            const elements: React.ReactNode[] = [];
                            const usedImageIndices = new Set<number>();
                            let autoIndex = 0;

                            while ((match = tagRegex.exec(contentText)) !== null) {
                              const matchIndex = match.index;
                              let imgIdx: number;

                              if (match[1] !== undefined) {
                                imgIdx = parseInt(match[1], 10);
                              } else {
                                while (usedImageIndices.has(autoIndex) && autoIndex < imagesList.length) {
                                  autoIndex++;
                                }
                                imgIdx = autoIndex++;
                              }

                              usedImageIndices.add(imgIdx);

                              if (matchIndex > lastIndex) {
                                let textSegment = contentText.substring(lastIndex, matchIndex);
                                // Strip trailing newlines and whitespace to eliminate excess top whitespace
                                textSegment = textSegment.replace(/\s+$/, '');
                                if (textSegment.trim()) {
                                  elements.push(
                                    <div
                                      key={`text-${lastIndex}`}
                                      className="text-slate-700 whitespace-pre-line leading-relaxed"
                                      dangerouslySetInnerHTML={{ __html: formatProjectContent(textSegment) }}
                                    />
                                  );
                                }
                              }

                              const targetImg = rawImages[imgIdx] || imagesList[imgIdx];
                              if (targetImg && targetImg.url) {
                                const alignClass = targetImg.imageAlign === 'left' ? 'text-left' : targetImg.imageAlign === 'right' ? 'text-right' : 'text-center';
                                elements.push(
                                  <div key={`img-${imgIdx}-${matchIndex}`} className={`${alignClass} my-0.5 leading-none`}>
                                    {renderImageItem(targetImg, imgIdx)}
                                  </div>
                                );
                              }

                              lastIndex = tagRegex.lastIndex;
                            }

                            if (lastIndex < contentText.length) {
                              let textSegment = contentText.substring(lastIndex);
                              // Strip leading newlines and whitespace to eliminate excess bottom whitespace
                              textSegment = textSegment.replace(/^\s+/, '');
                              if (textSegment.trim()) {
                                elements.push(
                                  <div
                                    key={`text-${lastIndex}`}
                                    className="text-slate-700 whitespace-pre-line leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: formatProjectContent(textSegment) }}
                                  />
                                );
                              }
                            }

                            // Render any remaining images that were not tagged
                            imagesList.forEach((img, idx) => {
                              if (!usedImageIndices.has(idx) && img && img.url) {
                                const alignClass = img.imageAlign === 'left' ? 'text-left' : img.imageAlign === 'right' ? 'text-right' : 'text-center';
                                elements.push(
                                  <div key={`img-remaining-${idx}`} className={`${alignClass} my-0.5 leading-none`}>
                                    {renderImageItem(img, idx)}
                                  </div>
                                );
                              }
                            });

                            renderedContent = <div className="space-y-1">{elements}</div>;
                          } else {
                            const pos = imagesList[0]?.imagePosition || sec.imagePosition || 'bottom';
                            if (pos === 'top') {
                              renderedContent = (
                                <div className="space-y-1">
                                  {imagesList.map((img, idx) => (
                                    <div key={idx} className={`${img.imageAlign === 'left' ? 'text-left' : img.imageAlign === 'right' ? 'text-right' : 'text-center'} my-0.5 leading-none`}>
                                      {renderImageItem(img, idx)}
                                    </div>
                                  ))}
                                  {sec.content && (
                                    <div
                                      className="text-slate-700 whitespace-pre-line leading-relaxed"
                                      dangerouslySetInnerHTML={{ __html: formatProjectContent(sec.content.replace(/^\s+/, '')) }}
                                    />
                                  )}
                                </div>
                              );
                            } else if (pos === 'middle') {
                              const lines = sec.content ? sec.content.split('\n') : [];
                              const mid = Math.ceil(lines.length / 2);
                              const topC = lines.slice(0, mid).join('\n').replace(/\s+$/, '');
                              const botC = lines.slice(mid).join('\n').replace(/^\s+/, '');
                              renderedContent = (
                                <div className="space-y-1">
                                  {topC && (
                                    <div
                                      className="text-slate-700 whitespace-pre-line leading-relaxed"
                                      dangerouslySetInnerHTML={{ __html: formatProjectContent(topC) }}
                                    />
                                  )}
                                  {imagesList.map((img, idx) => (
                                    <div key={idx} className={`${img.imageAlign === 'left' ? 'text-left' : img.imageAlign === 'right' ? 'text-right' : 'text-center'} my-0.5 leading-none`}>
                                      {renderImageItem(img, idx)}
                                    </div>
                                  ))}
                                  {botC && (
                                    <div
                                      className="text-slate-700 whitespace-pre-line leading-relaxed"
                                      dangerouslySetInnerHTML={{ __html: formatProjectContent(botC) }}
                                    />
                                  )}
                                </div>
                              );
                            } else {
                              renderedContent = (
                                <div className="space-y-1">
                                  {sec.content && (
                                    <div
                                      className="text-slate-700 whitespace-pre-line leading-relaxed"
                                      dangerouslySetInnerHTML={{ __html: formatProjectContent(sec.content.replace(/\s+$/, '')) }}
                                    />
                                  )}
                                  {imagesList.map((img, idx) => (
                                    <div key={idx} className={`${img.imageAlign === 'left' ? 'text-left' : img.imageAlign === 'right' ? 'text-right' : 'text-center'} my-0.5 leading-none`}>
                                      {renderImageItem(img, idx)}
                                    </div>
                                  ))}
                                </div>
                              );
                            }
                          }
                        } else {
                          renderedContent = (
                            <div className="space-y-1">
                              {sec.content && (
                                <div
                                  className="text-slate-700 whitespace-pre-line leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: formatProjectContent(sec.content) }}
                                />
                              )}
                            </div>
                          );
                        }

                        return (
                          <div key={key} className="space-y-3">
                            <div className="space-y-1.5">
                              <div className="flex flex-wrap items-center justify-between gap-2 border-l-3 border-[#0055ff] pl-2.5">
                                <div className="flex flex-wrap items-center gap-2">
                                  <h4 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                                    {sec.title}
                                  </h4>
                                  {sec.githubUrl && (
                                    <a
                                      href={sec.githubUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-slate-900 hover:bg-[#0055ff] text-white text-[10px] font-mono font-bold transition-colors"
                                      title="이 섹션의 GitHub 저장소 열기"
                                    >
                                      <Github size={11} />
                                      <span>GitHub</span>
                                      <ExternalLink size={10} className="opacity-70" />
                                    </a>
                                  )}
                                </div>
                                {sec.date && (
                                  <span className="text-[11px] font-mono font-medium text-slate-500 bg-slate-100 px-2 py-0.5 border border-slate-200">
                                    {sec.date}
                                  </span>
                                )}
                              </div>
                              {sec.tags && sec.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pl-2.5">
                                  {sec.tags.map((t, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-blue-50 text-[#0055ff] text-[10px] font-mono font-bold border border-blue-200">
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {sec.summary && (
                                <p className="text-xs text-slate-500 font-mono font-medium pl-2.5 leading-relaxed">
                                  {sec.summary}
                                </p>
                              )}
                            </div>
                            <div className="bg-white p-4 rounded-none border border-gray-200 text-xs leading-relaxed font-sans">
                              {renderedContent}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="space-y-3">
                        <div className="bg-white p-4 rounded-none border border-gray-200 text-xs leading-relaxed font-sans">
                          <p className="text-slate-700">{project.overview}</p>
                        </div>
                      </div>
                    )}

                    {/* Bottom Collapse Button */}
                    <div className="pt-4 border-t border-gray-200 flex justify-end">
                      <button
                        onClick={() => setExpandedProjectId(null)}
                        className="px-4 py-2 bg-slate-900 hover:bg-[#0055ff] text-white font-mono text-xs font-bold transition-colors"
                      >
                        ▲ 접기
                      </button>
                    </div>

                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
};

