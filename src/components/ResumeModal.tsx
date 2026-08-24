import React from 'react';
import { UserProfile } from '../types';
import { X, Printer, Download, GraduationCap, Award, Building2, CircuitBoard, Brain } from 'lucide-react';

interface ResumeModalProps {
  profile: UserProfile;
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ profile, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-none max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-300 shadow-2xl p-6 sm:p-8 relative font-sans space-y-6">
        
        {/* Close & Print Action Buttons */}
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0055ff] text-white font-mono font-bold text-xs hover:bg-blue-600 transition-colors rounded-none uppercase tracking-wider"
            >
              <Printer className="w-4 h-4" />
              <span>인쇄 / PDF 저장</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-slate-600 transition-colors rounded-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Resume Body */}
        <div className="space-y-6 text-slate-800 text-xs">
          
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
              황지호 (Ji-Ho Hwang)
            </h1>
            <p className="text-xs font-mono font-bold text-[#0055ff] mt-1">
              Electronics &amp; AI/ML Hardware Engineer
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-600">
              <span>Email: {profile.email}</span>
              <span>GitHub: {profile.github}</span>
              <span>Location: {profile.location}</span>
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono border-b border-gray-200 pb-1 tracking-wider">
              1. 학력 (Education)
            </h2>
            <div className="flex justify-between items-baseline font-mono text-xs">
              <div>
                <strong className="text-slate-900">{profile.university}</strong>
                <span className="text-slate-600"> — {profile.major}</span>
              </div>
              <div className="text-slate-500 font-bold">GPA: {profile.gpa}</div>
            </div>
          </div>

          {/* Research Experience */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono border-b border-gray-200 pb-1 tracking-wider">
              2. 학부연구생 연구 경력 (Research Experience - 1 Year)
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between font-mono font-bold text-xs">
                <span className="text-[#0055ff]">{profile.labName}</span>
                <span className="text-slate-500">2025.03 - 2026.02 (1년)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed font-sans text-xs">
                <li><strong>Wafermap Generative AI &amp; CLIP Defect Classifier:</strong> 반도체 수율 향상을 위해 WM-811K 데이터셋 기반 경량 Diffusion 모델 구축 및 CLIP Zero-Shot 결함 분류 구현.</li>
                <li><strong>TensorRT INT8 Model Quantization:</strong> PyTorch 모델을 TensorRT INT8 양자화 엔진으로 탑재하여 추론 속도 4.2배 단축 (23.3ms) 및 메모리 73.8% 절감.</li>
                <li><strong>학술 발표:</strong> 한국정보과학회 / IEEE AI-HW Joint Workshop 논문 발표 (우수 논문 후보).</li>
              </ul>
            </div>
          </div>

          {/* Core Hardware & Software Projects */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono border-b border-gray-200 pb-1 tracking-wider">
              3. 대표 프로젝트 (Key Engineering Projects)
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between font-bold font-mono">
                  <span>• Jetson Orin &amp; STM32 Dual-Controller Autonomous AMR Robot</span>
                  <span className="text-slate-500">2025</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-sans mt-0.5">
                  KiCad 4층 PCB 모터 드라이버 회로 직접 설계, STM32 FreeRTOS PID 500Hz 모터 제어 및 YOLOv8 비전 인식 인지 통합.
                </p>
              </div>

              <div>
                <div className="flex justify-between font-bold font-mono">
                  <span>• Vivado Verilog High-Speed Signal Synthesizer &amp; AXI Bus IP</span>
                  <span className="text-slate-500">2025</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-sans mt-0.5">
                  Artix-7 FPGA 100MHz 시스템 클록 기준 12-bit DDS 신호 합성기 및 AXI4-Lite Slave IP FSM 개발. Setup Slack +0.32ns 달성.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono border-b border-gray-200 pb-1 tracking-wider">
              4. 보유 기술 스택 (Technical Skills)
            </h2>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              <div><strong>Hardware/PCB:</strong> KiCad, 4-Layer Stackup, LTspice, Oscilloscope</div>
              <div><strong>Embedded/FPGA:</strong> STM32, FreeRTOS, Verilog HDL, Vivado, AXI4</div>
              <div><strong>AI / Vision:</strong> PyTorch, OpenCV, CLIP, Diffusion, TensorRT</div>
              <div><strong>Programming:</strong> C, C++, Python, MATLAB, Linux Bash</div>
            </div>
          </div>

          {/* Honors */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold text-slate-900 uppercase font-mono border-b border-gray-200 pb-1 tracking-wider">
              5. 수상 내역 (Awards &amp; Honors)
            </h2>
            <ul className="list-disc list-inside space-y-1 font-mono text-[11px]">
              <li>학부생 창의연구 경진대회 우수상 (2024)</li>
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
};
