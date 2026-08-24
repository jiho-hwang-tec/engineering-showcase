import React, { useState } from 'react';
import { PaperItem } from '../types';
import { FileText, Download, Award, Copy, Check, ExternalLink } from 'lucide-react';

interface PublicationsSectionProps {
  papers: PaperItem[];
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ papers }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyBibtex = (id: string, bibtex: string) => {
    navigator.clipboard.writeText(bibtex);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="publications" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              PUBLICATIONS &amp; TALKS
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              06. 논문 / 발표 / 경진대회 수상 (Publications &amp; Awards)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            REF: PAPERS_TALKS_2026
          </span>
        </div>

        {/* Paper Cards List */}
        <div className="space-y-4">
          {papers.map((paper) => (
            <div
              key={paper.id}
              className="bg-[#fbfbfb] rounded-none border border-gray-200 p-5 shadow-2xs space-y-3 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-2.5 gap-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-[#0055ff] text-white font-bold uppercase tracking-wider rounded-none">
                    {paper.type}
                  </span>
                  <span className="text-slate-800 font-bold">{paper.venue}</span>
                  <span className="text-slate-500">({paper.year})</span>
                </div>

                {paper.awards && (
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] rounded-none uppercase">
                    <Award className="w-3.5 h-3.5 text-amber-600" />
                    <span>{paper.awards}</span>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 font-sans">
                  {paper.title}
                </h3>
                <p className="text-xs text-[#0055ff] font-mono font-semibold mt-1">
                  저자 (Authors): {paper.authors}
                </p>
              </div>

              <div className="bg-white p-3.5 border border-gray-200 text-xs text-slate-700 leading-relaxed font-sans">
                <span className="font-bold text-slate-900 uppercase font-mono block text-[10px] mb-1">초록 (Abstract):</span>
                <p>{paper.abstract}</p>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`논문 PDF "${paper.title}" 미리보기가 준비되었습니다.`)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1a1a] hover:bg-[#0055ff] text-white font-bold transition-colors rounded-none uppercase text-[11px] tracking-wider"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF 다운로드</span>
                  </button>

                  <button
                    onClick={() => handleCopyBibtex(paper.id, paper.bibtex)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 font-semibold border border-gray-300 transition-colors rounded-none text-[11px]"
                  >
                    {copiedId === paper.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-bold">BibTeX 복사 완료!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-500" />
                        <span>BibTeX 인용 복사</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
