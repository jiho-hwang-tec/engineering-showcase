import React from 'react';
import { UserProfile } from '../types';
import { User, GraduationCap, Building2, Code2, Cpu, Brain, Wrench, CheckCircle2, Mail, Github, MapPin } from 'lucide-react';

interface AboutSectionProps {
  profile: UserProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const defaultSkillCategories = [
    {
      title: '프로그래밍 언어 (Languages)',
      icon: <Code2 className="w-4 h-4 text-[#0055ff]" />,
      skills: ['C / C++', 'Python', 'Verilog (HDL)', 'MATLAB'],
      color: 'border-l-[#0055ff]'
    },
    {
      title: 'AI / 컴퓨터비전 (AI & CV)',
      icon: <Brain className="w-4 h-4 text-emerald-600" />,
      skills: ['PyTorch', 'OpenCV', 'TensorRT', 'ONNX', 'Scikit-learn'],
      color: 'border-l-emerald-600'
    },
    {
      title: '하드웨어 & 임베디드 (HW & Embedded)',
      icon: <Cpu className="w-4 h-4 text-indigo-600" />,
      skills: ['KiCad (PCB 설계)', 'Vivado (FPGA)', 'STM32 (FreeRTOS)', '오실로스코프 디버깅'],
      color: 'border-l-indigo-600'
    },
    {
      title: '개발 도구 (Tools & Environment)',
      icon: <Wrench className="w-4 h-4 text-amber-600" />,
      skills: ['Git / GitHub', 'Linux (Ubuntu)', 'VS Code', 'Jupyter Lab'],
      color: 'border-l-amber-600'
    }
  ];

  const skillCategories = profile.skillCategories && profile.skillCategories.length > 0
    ? profile.skillCategories.map((cat, idx) => {
        const colors = ['border-l-[#0055ff]', 'border-l-emerald-600', 'border-l-indigo-600', 'border-l-amber-600'];
        const icons = [
          <Code2 key={idx} className="w-4 h-4 text-[#0055ff]" />,
          <Brain key={idx} className="w-4 h-4 text-emerald-600" />,
          <Cpu key={idx} className="w-4 h-4 text-indigo-600" />,
          <Wrench key={idx} className="w-4 h-4 text-amber-600" />
        ];
        return {
          title: cat.title,
          icon: icons[idx % icons.length] || <Code2 className="w-4 h-4 text-[#0055ff]" />,
          skills: cat.skills,
          color: cat.color || colors[idx % colors.length]
        };
      })
    : defaultSkillCategories;

  return (
    <section id="about" className="py-16 bg-[#fbfbfb] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              {profile.aboutTag || 'PROFILE & SKILLS'}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              {profile.aboutTitle || '01. ABOUT ME (자기소개 & 핵심 역량)'}
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            REF: GRADUATE_PROFILE_2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Bio & Academic Info */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Bio Card */}
            <div className="bg-white p-6 rounded-none border border-gray-200 shadow-2xs space-y-3 relative">
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#0055ff]" />
              <h3 className="text-sm font-bold text-slate-900 border-b border-gray-100 pb-2 flex items-center gap-2 uppercase font-mono tracking-wider">
                <User className="w-4 h-4 text-[#0055ff]" />
                {profile.aboutBioTitle || '자기소개 (Introduce)'}
              </h3>

              <p className="text-slate-700 leading-relaxed text-xs sm:text-sm whitespace-pre-line font-sans">
                {profile.bio}
              </p>
            </div>

            {/* Academic & Lab Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div className="bg-white p-4 rounded-none border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className="p-2 bg-[#0055ff]/10 text-[#0055ff] shrink-0 rounded-none">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    {profile.academicTitle || '학력 사항'}
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{profile.university}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{profile.major}</div>
                  <div className="text-xs font-mono text-[#0055ff] font-bold mt-1">학점: {profile.gpa}</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-none border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 shrink-0 rounded-none">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
                    {profile.labTitle || '학부연구생 활동'}
                  </div>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{profile.labName}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{profile.labRole || '컴퓨터비전 랩 (1년)'}</div>
                  <div className="text-xs font-mono text-indigo-600 font-bold mt-1">{profile.labSubject || '반도체 Wafermap AI 연구'}</div>
                </div>
              </div>

            </div>

            {/* Direct Contact Links */}
            <div className="bg-white p-5 rounded-none border border-gray-200 shadow-2xs space-y-2.5 text-xs font-mono">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider mb-1">
                {profile.contactTitle || 'CONTACT INFORMATION'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#0055ff] shrink-0" />
                  <span className="text-slate-500 text-[11px]">Email:</span>
                  <a href={`mailto:${profile.email}`} className="text-slate-900 font-bold hover:text-[#0055ff] underline text-[11px] truncate">
                    {profile.email}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-slate-900 shrink-0" />
                  <span className="text-slate-500 text-[11px]">GitHub:</span>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="text-slate-900 font-bold hover:text-[#0055ff] underline text-[11px] truncate">
                    {profile.github}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                  <span className="text-slate-500 text-[11px]">Location:</span>
                  <span className="text-slate-900 font-bold text-[11px]">{profile.location}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Compact & Direct Tech Stack */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="bg-white p-6 rounded-none border border-gray-200 shadow-2xs space-y-4 relative">
              <div className="absolute -top-2 -right-2 w-3 h-3 border-t-2 border-r-2 border-[#0055ff]" />
              
              <div className="flex justify-between items-center border-b border-gray-100 pb-2.5">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase font-mono tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-[#0055ff]" />
                  {profile.techStackTitle || '보유 기술 스택 (Tech Stack)'}
                </h3>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  {profile.techStackSubtag || 'BASIC & PRACTICAL'}
                </span>
              </div>

              <div className="space-y-3">
                {skillCategories.map((cat, idx) => (
                  <div key={idx} className={`p-3 bg-[#fbfbfb] border border-gray-200 border-l-4 ${cat.color} space-y-1.5`}>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-mono">
                      {cat.icon}
                      <span>{cat.title}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {cat.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx}
                          className="px-2 py-0.5 bg-white text-slate-700 text-[11px] font-mono font-bold border border-gray-200 rounded-none shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-1 text-[11px] text-slate-500 font-sans border-t border-gray-100">
                {profile.techStackNote || '💡 학부 전공 수업과 1년의 랩실 경험을 통해 실무 기초 및 디버깅 능력을 습득했습니다.'}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

