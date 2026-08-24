import { UserProfile } from '../types';

export const downloadResumePdf = (profile: UserProfile) => {
  if (profile.resumePdfUrl) {
    const link = document.createElement('a');
    link.href = profile.resumePdfUrl;
    link.download = profile.resumePdfFileName || `${profile.name}_이력서.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // If no uploaded PDF, generate a clean text/pdf formatted resume document download
  const resumeText = `================================================================================
                       ${profile.name} (${profile.engName}) - 이력서
================================================================================

■ 기본 정보
- 성명: ${profile.name} (${profile.engName})
- 지원 분야: ${profile.title}
- 이메일: ${profile.email}
- 학교/학과: ${profile.university} ${profile.major}
- 학점 (GPA): ${profile.gpa}
- GitHub: ${profile.github}
- LinkedIn: ${profile.linkedin}

■ 핵심 요약
${profile.headline}

■ 학부 연구생 경력 (1년)
- 연구실: ${profile.labName}
- 주요 연구: 반도체 Wafermap Generative AI & CLIP 기반 Zero-Shot Defect 분류 프레임워크

■ 보유 핵심 기술
- 프로그래밍 언어: C, C++, Python, Verilog (HDL)
- AI & 컴퓨터 비전: PyTorch, OpenCV, TensorRT, ONNX
- 하드웨어 & 임베디드: KiCad (4-Layer PCB), Vivado, STM32 (FreeRTOS)
- 도구: Git, Linux (Ubuntu), VS Code, Jupyter Lab

■ 자기소개
${profile.bio}

================================================================================
`;

  const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${profile.name}_이력서_입사지원서.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
