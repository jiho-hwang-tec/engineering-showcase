import React from 'react';
import { Project } from '../types';
import { X, FileText, Video, Cpu, CircuitBoard, Activity, ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const isMain = Boolean(
    project.isMain ||
    project.id === 'proj-wafermap-ai' ||
    project.title.toLowerCase().includes('wafermap') ||
    project.title.toLowerCase().includes('waferclip') ||
    (project.subtitle && project.subtitle.toLowerCase().includes('wafermap'))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-none max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 shadow-2xl space-y-6 p-6 sm:p-8 relative font-sans">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 bg-gray-100 hover:bg-gray-200 text-slate-600 transition-colors rounded-none"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2.5 pr-10 border-b border-gray-200 pb-5">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <span className="px-2 py-0.5 bg-[#0055ff] text-white font-bold uppercase tracking-wider rounded-none">
              {project.category}
            </span>
            {isMain && (
              <span className="px-2.5 py-0.5 bg-[#002d72] text-white font-bold uppercase tracking-wider rounded-none border border-[#001f52] shadow-xs">
                MAIN PROJECT
              </span>
            )}
            <span className="text-slate-500">{project.date}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-sans">
            {project.title}
          </h2>
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
        </div>

        {/* 1. Executive Overview & Purpose */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-3 border-[#0055ff] pl-2.5 font-mono uppercase tracking-wider">
            1. 프로젝트 개요 및 개발 목적 (Overview &amp; Purpose)
          </h3>
          <div className="bg-white p-4 rounded-none border border-gray-200 space-y-2.5 text-xs leading-relaxed font-sans">
            <div>
              <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-0.5">개요 (Overview):</span>
              <p className="text-slate-700">{project.overview}</p>
            </div>
            <div>
              <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-0.5">개발 목적 (Objective):</span>
              <p className="text-slate-700">{project.purpose}</p>
            </div>
          </div>
        </div>

        {/* 2. System Architecture Flowchart */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-3 border-[#0055ff] pl-2.5 font-mono uppercase tracking-wider">
            2. 시스템 아키텍처 (System Flow &amp; Architecture)
          </h3>
          <div className="bg-[#1a1a1a] text-white p-4 rounded-none border border-slate-800 space-y-2 font-mono text-xs">
            <div className="text-slate-400 font-bold mb-1.5 uppercase text-[10px]">// DATA &amp; CONTROL FLOW</div>
            <div className="space-y-1.5">
              {project.systemArchitecture.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-800/80 p-2 border border-slate-700/60 rounded-none">
                  <span className="text-[#0055ff] font-bold">{idx + 1}.</span>
                  <span className="text-slate-200">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Hardware / Circuit Details (If available) */}
        {project.circuitSchematics && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-3 border-[#0055ff] pl-2.5 font-mono uppercase tracking-wider">
              3. 하드웨어 회로 &amp; PCB 설계 (Hardware &amp; PCB Stackup)
            </h3>
            <div className="bg-white p-4 rounded-none border border-gray-200 space-y-3 text-xs font-sans">
              <div>
                <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-1">PCB 레이어 스택업:</span>
                <p className="font-mono text-slate-700 bg-white p-2.5 rounded-none border border-gray-200">
                  {project.circuitSchematics.pcbLayers}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-1">핵심 부품 명세 (BOM - Bill of Materials):</span>
                <div className="overflow-x-auto border border-gray-200">
                  <table className="w-full text-left font-mono text-xs border-collapse bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-slate-800 text-[10px] uppercase border-b border-gray-200">
                        <th className="p-2">부품명 (Part)</th>
                        <th className="p-2">사양 (Spec)</th>
                        <th className="p-2">담당 역할 (Role)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {project.circuitSchematics.keyComponents.map((comp, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold text-[#0055ff]">{comp.name}</td>
                          <td className="p-2 text-slate-700">{comp.spec}</td>
                          <td className="p-2 text-slate-600">{comp.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-1">전원 설계 (Power Design):</span>
                <p className="text-slate-700">{project.circuitSchematics.powerDesign}</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Firmware / RTOS Architecture (If available) */}
        {project.firmwareArchitecture && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-3 border-[#0055ff] pl-2.5 font-mono uppercase tracking-wider">
              4. 임베디드 펌웨어 &amp; FSM 구조 (Firmware &amp; RTOS)
            </h3>
            <div className="bg-white p-4 rounded-none border border-gray-200 space-y-3 text-xs font-sans">
              <div>
                <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-1">시스템 상태 머신 (FSM Flow):</span>
                <p className="font-mono text-slate-200 bg-[#1a1a1a] p-3 rounded-none border border-slate-800">
                  {project.firmwareArchitecture.fsmDescription}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-900 uppercase font-mono text-[10px] block mb-1">FreeRTOS Task Priority Table:</span>
                <div className="overflow-x-auto border border-gray-200">
                  <table className="w-full text-left font-mono text-xs border-collapse bg-white">
                    <thead>
                      <tr className="bg-gray-100 text-slate-800 text-[10px] uppercase border-b border-gray-200">
                        <th className="p-2">Task Name</th>
                        <th className="p-2">Priority</th>
                        <th className="p-2">Period (ms)</th>
                        <th className="p-2">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {project.firmwareArchitecture.rtosTasks.map((task, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold text-slate-900">{task.name}</td>
                          <td className="p-2 text-[#0055ff] font-bold">{task.priority}</td>
                          <td className="p-2 text-slate-600">{task.periodMs} ms</td>
                          <td className="p-2 text-slate-600">{task.role}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. AI Model Details (If available) */}
        {project.aiModelDetails && (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-3 border-[#0055ff] pl-2.5 font-mono uppercase tracking-wider">
              5. AI 모델 &amp; 양자화 파이프라인 (AI Model Architecture)
            </h3>
            <div className="bg-[#1a1a1a] text-white p-4 rounded-none border border-slate-800 space-y-2 font-mono text-xs">
              <div>
                <span className="text-[#0055ff] font-bold block mb-0.5 text-[10px] uppercase">Model Backbone:</span>
                <p className="text-slate-200">{project.aiModelDetails.modelType}</p>
              </div>
              <div>
                <span className="text-[#0055ff] font-bold block mb-0.5 text-[10px] uppercase">Dataset:</span>
                <p className="text-slate-200">{project.aiModelDetails.dataset}</p>
              </div>
              <div>
                <span className="text-[#0055ff] font-bold block mb-0.5 text-[10px] uppercase">TensorRT Quantization &amp; Optimization:</span>
                <p className="text-emerald-400 font-semibold">{project.aiModelDetails.quantization}</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. Experimental Benchmark Metrics */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-3 border-[#0055ff] pl-2.5 font-mono uppercase tracking-wider">
            6. 실험 및 측정 성능 결과 (Benchmark Metrics)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
            {project.metrics.accuracy && (
              <div className="bg-white p-3 rounded-none border border-gray-200 text-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">ACCURACY / RECALL</span>
                <span className="text-base font-extrabold text-[#0055ff]">{project.metrics.accuracy}</span>
              </div>
            )}
            {project.metrics.fps && (
              <div className="bg-white p-3 rounded-none border border-gray-200 text-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">THROUGHPUT (FPS)</span>
                <span className="text-base font-extrabold text-emerald-600">{project.metrics.fps}</span>
              </div>
            )}
            {project.metrics.latencyMs && (
              <div className="bg-white p-3 rounded-none border border-gray-200 text-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">INFERENCE LATENCY</span>
                <span className="text-base font-extrabold text-slate-800">{project.metrics.latencyMs}</span>
              </div>
            )}
            {project.metrics.powerWatts && (
              <div className="bg-white p-3 rounded-none border border-gray-200 text-center">
                <span className="text-[9px] text-slate-400 uppercase font-bold block">POWER DISSIPATION</span>
                <span className="text-base font-extrabold text-amber-600">{project.metrics.powerWatts}</span>
              </div>
            )}
          </div>
        </div>

        {/* 7. Troubleshooting & Debugging Logs */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-l-3 border-[#0055ff] pl-2.5 font-mono uppercase tracking-wider">
            7. 문제 해결 및 트러블슈팅 (Engineering Trouble Shooting)
          </h3>
          <div className="space-y-2">
            {project.troubleshooting.map((item, idx) => (
              <div key={idx} className="bg-white p-3.5 rounded-none border border-gray-200 text-xs space-y-1.5 font-sans">
                <div className="flex items-center gap-2 font-bold text-rose-700">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>문제 (Issue): {item.problem}</span>
                </div>
                <p className="text-slate-600 pl-6"><strong className="text-slate-800">원인 (Cause):</strong> {item.cause}</p>
                <div className="flex items-start gap-2 bg-emerald-50 text-emerald-900 p-2 rounded-none border border-emerald-200 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>해결 방법 (Solution): {item.solution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
