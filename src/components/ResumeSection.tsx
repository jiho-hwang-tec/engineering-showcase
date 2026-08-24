import React, { useState } from 'react';
import { UserProfile, ContactMessage } from '../types';
import { Download, Mail, Github, Linkedin, MapPin, Send, CheckCircle2, Award, GraduationCap, FileCheck } from 'lucide-react';

interface ResumeSectionProps {
  profile: UserProfile;
  onSendMessage: (msg: { name: string; email: string; organization: string; message: string }) => void;
  onDownloadResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ profile, onSendMessage, onDownloadResume }) => {
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    onSendMessage(formData);
    setSentSuccess(true);
    setFormData({ name: '', email: '', organization: '', message: '' });
    setTimeout(() => setSentSuccess(false), 5000);
  };

  return (
    <section id="resume" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              CAREER &amp; CONTACT
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              03. 이력서 및 문의하기 (Resume &amp; Contact)
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            REF: RECRUITMENT_DESK_2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Academic & Resume Summary */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Download CTA Banner */}
            <div className="bg-[#1a1a1a] text-white p-6 rounded-none border border-slate-800 space-y-4 relative">
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#0055ff]" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold tracking-tight font-sans">
                    황지호 국문/영문 이력서 (CV)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-mono">
                    최신 연구 실적, 프로젝트 명세, 학점 성적증명서 포함 통합 PDF
                  </p>
                </div>

                <button
                  onClick={onDownloadResume}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0055ff] hover:bg-blue-600 text-white font-mono font-bold text-xs shrink-0 rounded-none uppercase tracking-wider"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>이력서 (PDF) 바로 다운로드</span>
                </button>
              </div>

              <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-3 text-center font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">GPA</span>
                  <span className="text-emerald-400 font-bold">{profile.gpa}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">MAJOR</span>
                  <span className="text-[#0055ff] font-bold">{profile.major}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">RESEARCH</span>
                  <span className="text-sky-400 font-bold">1 Year CV Lab</span>
                </div>
              </div>
            </div>

             {/* Honors */}
            <div className="bg-[#fbfbfb] p-5 rounded-none border border-gray-200 space-y-3 text-xs font-sans">
              <h4 className="font-bold text-slate-900 text-xs font-mono uppercase tracking-wider flex items-center gap-2 border-b border-gray-200 pb-2">
                <Award className="w-4 h-4 text-[#0055ff]" />
                수상 내역 (Honors &amp; Awards)
              </h4>

              <div className="space-y-2 font-mono">
                <div className="flex items-center justify-between bg-white p-2.5 rounded-none border border-gray-200">
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">한국정보과학회 학술대회 우수 논문 발표 후보</span>
                    <span className="text-slate-500 text-[10px]">Wafermap Generative AI &amp; CLIP Research</span>
                  </div>
                  <span className="text-amber-600 font-bold text-xs">2025</span>
                </div>

                <div className="flex items-center justify-between bg-white p-2.5 rounded-none border border-gray-200">
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">학부생 창의연구 경진대회 우수상</span>
                    <span className="text-slate-500 text-[10px]">FPGA Signal Synthesizer IP Design</span>
                  </div>
                  <span className="text-amber-600 font-bold text-xs">2024</span>
                </div>
              </div>
            </div>

            {/* Direct Contact Links */}
            <div className="bg-white p-5 rounded-none border border-gray-200 space-y-2.5 text-xs font-mono">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#0055ff] shrink-0" />
                <span className="text-slate-500">Email:</span>
                <a href={`mailto:${profile.email}`} className="text-slate-900 font-bold hover:text-[#0055ff] underline">
                  {profile.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Github className="w-4 h-4 text-slate-900 shrink-0" />
                <span className="text-slate-500">GitHub:</span>
                <a href={profile.github} target="_blank" rel="noreferrer" className="text-slate-900 font-bold hover:text-[#0055ff] underline">
                  {profile.github}
                </a>
              </div>

              {profile.linkedin && (
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-[#0055ff] shrink-0" />
                  <span className="text-slate-500">LinkedIn:</span>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 font-bold hover:text-[#0055ff] underline">
                    {profile.linkedin}
                  </a>
                </div>
              )}

              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-900 font-bold">{profile.location}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Direct Message Form */}
          <div className="lg:col-span-5 bg-[#fbfbfb] p-6 rounded-none border border-gray-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-gray-200 pb-2 font-mono uppercase tracking-wider">
              직접 메시지 전송 (Send Message)
            </h3>

            {sentSuccess && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-none text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>메시지가 성공적으로 전송되었습니다! 관리자 함으로 기록되었습니다.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-sans">
              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">
                  성함 / 담당자명 (Name) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동 채용담당자"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-[#0055ff] font-sans text-xs outline-none rounded-none bg-white"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">
                  이메일 (Email) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="recruiter@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-[#0055ff] font-sans text-xs outline-none rounded-none bg-white"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">
                  소속 기업 / 연구실 (Organization)
                </label>
                <input
                  type="text"
                  placeholder="예: 삼성전자 DS / LG전자 / ASML / 연구실"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-[#0055ff] font-sans text-xs outline-none rounded-none bg-white"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1">
                  문의 내용 (Message) *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="채용 관련 문의, 과제 제안, 기술 질문 등 작성"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 focus:border-[#0055ff] font-sans text-xs outline-none rounded-none bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#1a1a1a] hover:bg-[#0055ff] text-white font-mono font-bold text-xs transition-colors flex items-center justify-center gap-2 rounded-none uppercase tracking-wider"
              >
                <Send className="w-3.5 h-3.5" />
                <span>메시지 보내기 (Send)</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
