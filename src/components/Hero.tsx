import React from 'react';
import { Download, Camera, User } from 'lucide-react';
import { UserProfile } from '../types';
import { compressImage } from '../utils/imageCompressor';
import { uploadFileToServer } from '../utils/api';

interface HeroProps {
  profile: UserProfile;
  onNavigate: (sectionId: string) => void;
  onDownloadResume: () => void;
  onSaveProfile?: (updated: UserProfile) => void;
}

export const Hero: React.FC<HeroProps> = ({ profile, onNavigate, onDownloadResume, onSaveProfile }) => {
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 800, 800, 0.85);
        if (compressed) {
          const uploadRes = await uploadFileToServer(compressed, file.name, file.type);
          const finalUrl = uploadRes.url || compressed;
          if (onSaveProfile) {
            onSaveProfile({ ...profile, photoUrl: finalUrl });
          }
        }
      } catch (err) {
        console.error('Profile photo upload error:', err);
      }
    }
  };

  const activePhoto = profile.photoUrl;

  const catchphrase = profile.homeCatchphrase || "전자공학 기초 지식과 1년의 학부연구생 경험을 바탕으로 빠르게 배우고 성장하는 준비된 신입 개발자입니다.";
  const badges = profile.homeBadges && profile.homeBadges.length > 0 
    ? profile.homeBadges 
    : ['회로 이론/설계', 'C/C++', 'Verilog', 'Python/PyTorch', '컴퓨터비전 연구 1년', 'STM32 임베디드'];
  const ctaText = profile.homeCtaText || "이력서 (PDF) 바로 다운로드";
  const summaryTitle = profile.homeSummaryTitle || "[신입 포부] 빠른 학습 능력과 강한 정직함으로 기여하겠습니다.";
  const summaryDesc = profile.homeSummaryDesc || "숙명여대 전자공학과 전공(학점 3.92/4.5) 과정과 AI 랩 학부연구생 1년 경험으로 회로 및 컴퓨터비전 기초 프로젝트를 완수했습니다.";
  const homeLabRole = profile.homeLabRole || profile.labRole || '컴퓨터비전 랩 (1년)';


  return (
    <section id="home" className="pt-24 pb-16 md:pt-28 md:pb-20 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Personal Intro & Headline */}
          <div className="lg:col-span-7 space-y-5">

            {/* Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {profile.name}{' '}
                {profile.engName && (
                  <span className="text-xl sm:text-2xl font-medium text-slate-400 block sm:inline mt-1 sm:mt-0 font-mono">
                    ({profile.engName})
                  </span>
                )}
              </h1>
              <p className="text-base sm:text-lg font-bold text-[#0055ff] mt-1.5 font-mono uppercase tracking-wide">
                {profile.title}
              </p>
            </div>

            {/* Catchphrase */}
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug whitespace-pre-line">
              &quot;{catchphrase}&quot;
            </h2>

            {/* Tech Badges */}
            <div className="flex flex-wrap gap-1.5 text-[11px] font-mono font-bold">
              {badges.map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 bg-[#fbfbfb] text-slate-700 border border-gray-200 rounded-none"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 font-mono">
              <button
                onClick={onDownloadResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0055ff] hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition-colors rounded-none shadow-2xs"
              >
                <Download className="w-4 h-4" />
                <span>{ctaText}</span>
              </button>
            </div>

            {/* Summary Box */}
            <div className="bg-[#fbfbfb] p-3.5 border-l-2 border-[#0055ff] border-y border-r border-gray-200 text-xs text-slate-700 leading-relaxed font-sans space-y-1">
              <p className="font-bold text-slate-900">
                {summaryTitle}
              </p>
              <p className="text-slate-600">
                {summaryDesc}
              </p>
            </div>

          </div>

          {/* Right Column: Clean Profile Photo Slot & Personal Info Card */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white border border-gray-200 p-5 shadow-sm space-y-4 relative">
              <div className="absolute -top-2 -left-2 w-3 h-3 border-t-2 border-l-2 border-[#0055ff]" />
              <div className="absolute -bottom-2 -right-2 w-3 h-3 border-b-2 border-r-2 border-[#0055ff]" />

              {/* Photo Attachment Container */}
              <div className="relative group">
                <div className="w-full h-56 sm:h-64 bg-slate-100 border border-gray-300 flex flex-col items-center justify-center overflow-hidden relative">
                  {activePhoto ? (
                    <img 
                      src={activePhoto} 
                      alt="프로필 사진" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4 space-y-2">
                      <div className="w-16 h-16 bg-white border border-gray-300 rounded-full flex items-center justify-center mx-auto text-slate-400">
                        <User className="w-8 h-8" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">
                          증명사진 / 프로필 사진 등록 구역
                        </span>
                        <span className="text-[11px] text-slate-500 block mt-0.5 font-mono">
                          (클릭하여 본인 사진 파일 업로드 가능)
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Upload overlay button */}
                  <label className="absolute bottom-3 right-3 bg-[#1a1a1a] hover:bg-[#0055ff] text-white p-2 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md">
                    <Camera className="w-3.5 h-3.5" />
                    <span>{activePhoto ? '사진 변경' : '사진 등록'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handlePhotoUpload} 
                      className="hidden" 
                    />
                  </label>
                </div>
              </div>

              {/* Quick Info Grid */}
              <div className="space-y-2 text-xs font-mono pt-1">
                <div className="flex items-center justify-between p-2 bg-[#fbfbfb] border border-gray-200">
                  <span className="text-slate-500 font-bold">학교 / 학과</span>
                  <span className="font-bold text-slate-900">{profile.university}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#fbfbfb] border border-gray-200">
                  <span className="text-slate-500 font-bold">학점 (GPA)</span>
                  <span className="font-bold text-[#0055ff]">{profile.gpa}</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#fbfbfb] border border-gray-200">
                  <span className="text-slate-500 font-bold">학부 연구생</span>
                  <span className="font-bold text-slate-900">{homeLabRole}</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


