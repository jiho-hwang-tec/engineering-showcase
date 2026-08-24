import React, { useState } from 'react';
import { SkillCategory } from '../types';
import { Cpu, CircuitBoard, Brain, Terminal, Activity, Layers, ExternalLink } from 'lucide-react';

interface TechStackSectionProps {
  skills: SkillCategory[];
  onSelectSkill: (skillName: string) => void;
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ skills, onSelectSkill }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Hardware', 'Embedded', 'FPGA', 'AI / Computer Vision', 'Programming', 'Simulation'];

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => s.category === activeCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Hardware': return <CircuitBoard className="w-4 h-4 text-emerald-600" />;
      case 'Embedded': return <Cpu className="w-4 h-4 text-blue-600" />;
      case 'FPGA': return <Layers className="w-4 h-4 text-indigo-600" />;
      case 'AI / Computer Vision': return <Brain className="w-4 h-4 text-purple-600" />;
      case 'Programming': return <Terminal className="w-4 h-4 text-slate-800" />;
      case 'Simulation': return <Activity className="w-4 h-4 text-amber-600" />;
      default: return <Cpu className="w-4 h-4 text-blue-600" />;
    }
  };

  return (
    <section id="skills" className="py-16 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex justify-between items-end border-b border-gray-200 pb-3 mb-8">
          <div>
            <span className="text-[10px] font-mono font-bold text-[#0055ff] tracking-widest uppercase block mb-1">
              TECHNICAL CAPABILITIES
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight italic">
              02. 카테고리별 기술 스택 &amp; 보유 역량
            </h2>
          </div>
          <span className="text-[10px] font-mono text-slate-400 hidden sm:block">
            REF: SKILLS_MATRIX_2026
          </span>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-start gap-1.5 mb-8 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 border font-bold uppercase transition-all rounded-none ${
                activeCategory === cat
                  ? 'bg-[#0055ff] text-white border-[#0055ff] shadow-2xs'
                  : 'bg-white text-slate-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="space-y-8">
          {filteredSkills.map((catGroup) => (
            <div key={catGroup.category} className="bg-[#fbfbfb] p-5 border border-gray-200 rounded-none">
              
              {/* Category Header */}
              <div className="flex items-center gap-2 border-b border-gray-200 pb-2.5 mb-4">
                {getCategoryIcon(catGroup.category)}
                <h3 className="text-base font-bold text-slate-900 font-sans uppercase">
                  {catGroup.category}
                </h3>
                <span className="text-[11px] font-mono text-slate-400 ml-auto">
                  {catGroup.description}
                </span>
              </div>

              {/* Skill Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {catGroup.skills.map((skill) => (
                  <div
                    key={skill.name}
                    onClick={() => onSelectSkill(skill.name)}
                    className="bg-white p-3.5 border border-gray-200 hover:border-[#0055ff] transition-all cursor-pointer group flex flex-col justify-between rounded-none"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#0055ff] transition-colors font-mono">
                          {skill.name}
                        </span>
                        <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-none border ${
                          skill.level === 'Expert' 
                            ? 'bg-[#0055ff]/10 text-[#0055ff] border-[#0055ff]/30' 
                            : skill.level === 'Advanced'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-sans mt-1">
                        {skill.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>관련 프로젝트 {skill.relatedProjectsCount}개</span>
                      <span className="text-[#0055ff] font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                        보기 <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
