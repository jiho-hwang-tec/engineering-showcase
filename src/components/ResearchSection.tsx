import React from 'react';
import { ResearchItem } from '../types';
import { Building2, GraduationCap, Sparkles, CheckCircle2, FileText, ArrowUpRight, Activity, Camera, Upload, Image as ImageIcon } from 'lucide-react';

interface ResearchSectionProps {
  researchList: ResearchItem[];
}

export const ResearchSection: React.FC<ResearchSectionProps> = ({ researchList }) => {
  return (
    <section id="research" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-10">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              CV LAB RESEARCH
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              04. 학부연구생 연구 경험 (Computer Vision &amp; Generative AI)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            REF: RESEARCH_EXP_2026
          </span>
        </div>

        {/* Research Showcase Cards */}
        <div className="space-y-10">
          {researchList.map((res) => (
            <div key={res.id} className="bg-[#fbfbfb] rounded-none border border-gray-200 p-6 shadow-2xs space-y-6 relative">
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#0055ff]" />
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-gray-200 pb-4 gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2 text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 bg-[#0055ff] text-white font-bold uppercase tracking-wider rounded-none">
                      {res.labName}
                    </span>
                    <span className="text-slate-500 font-semibold">{res.period}</span>
                    <span className="text-slate-500">지도교수: {res.advisor}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-sans">
                    {res.title}
                  </h3>
                </div>

                {res.paperTitle && (
                  <div className="shrink-0 bg-white p-3 rounded-none border border-gray-200 text-xs font-mono space-y-1">
                    <div className="text-[#0055ff] font-bold flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> {res.publication}
                    </div>
                    <div className="text-slate-700 font-medium line-clamp-1 max-w-xs">{res.paperTitle}</div>
                  </div>
                )}
              </div>

              {/* Research Summary & Objective */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
                <div className="bg-white p-4 rounded-none border border-gray-200">
                  <span className="font-bold text-slate-900 text-xs uppercase font-mono block mb-2 border-b border-gray-100 pb-1">
                    연구 요약 (Research Summary)
                  </span>
                  <p className="text-slate-700 font-sans leading-relaxed">{res.summary}</p>
                </div>

                <div className="bg-white p-4 rounded-none border border-gray-200">
                  <span className="font-bold text-slate-900 text-xs uppercase font-mono block mb-2 border-b border-gray-100 pb-1">
                    연구 목적 (Research Objective)
                  </span>
                  <p className="text-slate-700 font-sans leading-relaxed">{res.objective}</p>
                </div>
              </div>

              {/* Methodology & Key Findings */}
              <div className="bg-white p-5 rounded-none border border-gray-200 space-y-4 text-xs">
                <div>
                  <span className="font-bold text-slate-900 text-xs uppercase font-mono block mb-2">
                    연구 방법론 (Methodology &amp; Pipeline)
                  </span>
                  <p className="text-slate-700 font-mono bg-[#fbfbfb] p-3 border border-gray-200 rounded-none whitespace-pre-line leading-relaxed">
                    {res.methodology}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 text-xs uppercase font-mono block mb-2">
                    주요 연구 성과 (Key Research Findings)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {res.keyFindings.map((finding, idx) => (
                      <div key={idx} className="bg-[#0055ff]/5 border border-[#0055ff]/20 p-3 rounded-none flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0055ff] shrink-0 mt-0.5" />
                        <span className="text-slate-800 font-sans text-xs">{finding}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div>
                <span className="font-bold text-slate-900 text-xs font-mono block mb-2.5 uppercase tracking-wider">
                  연구 결과 및 정량 성과 지표 (Quantitative Metrics)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                  {res.metrics.map((m, idx) => (
                    <div key={idx} className="bg-[#1a1a1a] text-white p-3 rounded-none border border-slate-800 text-center">
                      <div className="text-[9px] text-slate-400 uppercase font-bold">{m.label}</div>
                      <div className="text-lg font-extrabold text-[#0055ff] mt-0.5">{m.value}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{m.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Research Photo & Figure Attachment Gallery */}
        <div className="mt-12 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-200 pb-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-mono uppercase flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#0055ff]" />
                연구 및 실험 사진 첨부 구역 (Research Photo &amp; Figure Gallery)
              </h3>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                실제 랩실 연구 사진, 광학 결함 이미지, CLIP 분류 히트맵, 벤치마크 그래프를 개별 첨부하실 수 있습니다.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#0055ff] font-bold uppercase hidden sm:block">
              [ 3 PHOTO SLOTS READY ]
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Slot 1 */}
            <div className="border-2 border-dashed border-gray-300 bg-[#fbfbfb] p-5 text-center space-y-3 rounded-none hover:border-[#0055ff] transition-colors group">
              <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#0055ff] group-hover:border-[#0055ff] transition-colors">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-[#0055ff] uppercase block mb-1">
                  FIGURE 01 SLOT
                </span>
                <h4 className="text-xs font-bold text-slate-900 font-sans">
                  광학 및 Wafer 결함 이미지 사진
                </h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">
                  직접 촬영하거나 수집한 반도체 실물/웨이퍼 결함 원본 사진
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white px-2 py-1 border border-gray-200">
                <Upload className="w-3 h-3 text-[#0055ff]" />
                <span>사진 첨부 가능</span>
              </div>
            </div>

            {/* Slot 2 */}
            <div className="border-2 border-dashed border-gray-300 bg-[#fbfbfb] p-5 text-center space-y-3 rounded-none hover:border-[#0055ff] transition-colors group">
              <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#0055ff] group-hover:border-[#0055ff] transition-colors">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase block mb-1">
                  FIGURE 02 SLOT
                </span>
                <h4 className="text-xs font-bold text-slate-900 font-sans">
                  CLIP &amp; Diffusion 파이프라인
                </h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">
                  논문/학술대회 제출용 인공지능 분류 파이프라인 다이어그램
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white px-2 py-1 border border-gray-200">
                <Upload className="w-3 h-3 text-emerald-600" />
                <span>사진 첨부 가능</span>
              </div>
            </div>

            {/* Slot 3 */}
            <div className="border-2 border-dashed border-gray-300 bg-[#fbfbfb] p-5 text-center space-y-3 rounded-none hover:border-[#0055ff] transition-colors group">
              <div className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#0055ff] group-hover:border-[#0055ff] transition-colors">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase block mb-1">
                  FIGURE 03 SLOT
                </span>
                <h4 className="text-xs font-bold text-slate-900 font-sans">
                  TensorRT 양자화 벤치마크 그래프
                </h4>
                <p className="text-[11px] text-slate-500 font-sans mt-1">
                  추론 속도(FPS), 메모리 사용량 및 INT8 양자화 오차 비교표
                </p>
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-white px-2 py-1 border border-gray-200">
                <Upload className="w-3 h-3 text-indigo-600" />
                <span>사진 첨부 가능</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
