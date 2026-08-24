import { UserProfile, Project, ResearchItem, GalleryItem, PaperItem, BlogPost, SkillCategory } from '../types';

export const initialProfile: UserProfile = {
  name: "황지호",
  engName: "Ji-Ho Hwang",
  title: "전자공학 & AI/임베디드 신입 엔지니어 (학부 졸업예정)",
  headline: "탄탄한 전자공학 전공 지식과 1년의 학부연구생 경험을 바탕으로 빠르게 성장하고 기여하는 신입 엔지니어",
  subHeadline: "전자공학 학부 졸업예정 | GPA 3.92/4.5 | 정보처리기사 | 학부연구생 1년 | 하드웨어·임베디드·AI",
  bio: `안녕하세요! 숙명여자대학교 전자공학과 졸업예정 신입 지원자 황지호입니다.

전공 수업과 실습을 통해 회로 이론, 디지털 논리 회로, 마이크로프로세서, 신호 및 시스템 기초를 탄탄히 다졌으며, 1년간 컴퓨터비전 학부연구생으로 활동하며 반도체 Wafermap AI 연구 및 모델 경량화 실무 과제를 수행했습니다.

경력은 없지만, 4층 Custom PCB 회로 설계부터 Verilog FPGA FSM 구현, STM32 FreeRTOS 펌웨어, Jetson Orin Edge AI 배포까지 직접 보드를 제작하고 오실로스코프로 디버깅해보며 검증한 실전 프로젝트 경험을 보유하고 있습니다.

신입 엔지니어로서 빠르고 적극적으로 배우며 팀과 회사에 가치를 더하겠습니다.`,
  email: "hjh8058@sookmyung.ac.kr",
  github: "https://github.com/jiho-hwang-ee",
  linkedin: "https://linkedin.com/in/jiho-hwang-ee",
  location: "Seoul, South Korea",
  labName: "Computer Vision & Semiconductor AI Lab",
  university: "숙명여자대학교 전자공학전공",
  major: "전자공학전공 (인공지능 부전공)",
  gpa: "3.92 / 4.5 (전공 4.01 / 4.5)",

  // Home Section Customization Defaults
  photoUrl: "",
  homeCatchphrase: "전자공학 기초 지식과 1년의 학부연구생 경험을 바탕으로 빠르게 배우고 성장하는 준비된 신입 개발자입니다.",
  homeBadges: ["회로 이론/설계", "C/C++", "Verilog", "Python/PyTorch", "컴퓨터비전 연구 1년", "STM32 임베디드"],
  homeCtaText: "이력서 (PDF) 바로 다운로드",
  homeSummaryTitle: "[신입 포부] 빠른 학습 능력과 강한 정직함으로 기여하겠습니다.",
  homeSummaryDesc: "숙명여대 전자공학과 전공(학점 3.92/4.5) 과정과 AI 랩 학부연구생 1년 경험으로 회로 및 컴퓨터비전 기초 프로젝트를 완수했습니다.",
  homeLabRole: "컴퓨터비전 랩 (1년)",


  // About Me Section Customization Defaults
  aboutTag: "PROFILE & SKILLS",
  aboutTitle: "01. ABOUT ME (자기소개 & 핵심 역량)",
  aboutBioTitle: "자기소개 (Introduce)",
  academicTitle: "학력 사항",
  labTitle: "학부연구생 활동",
  labRole: "컴퓨터비전 랩 (1년)",
  labSubject: "반도체 Wafermap AI 연구",
  contactTitle: "CONTACT INFORMATION",
  techStackTitle: "보유 기술 스택 (Tech Stack)",
  techStackSubtag: "BASIC & PRACTICAL",
  techStackNote: "💡 학부 전공 수업과 1년의 랩실 경험을 통해 실무 기초 및 디버깅 능력을 습득했습니다.",
  projectsTag: "UNDERGRADUATE PROJECTS",
  projectsTitle: "02. 대표 프로젝트 (Projects & Lab Work)",
  projectCategories: ["CV/ML", "etc."],
  skillCategories: [
    {
      title: "프로그래밍 언어 (Languages)",
      skills: ["C / C++", "Python", "Verilog (HDL)", "MATLAB"],
      color: "border-l-[#0055ff]"
    },
    {
      title: "AI / 컴퓨터비전 (AI & CV)",
      skills: ["PyTorch", "OpenCV", "TensorRT", "ONNX", "Scikit-learn"],
      color: "border-l-emerald-600"
    },
    {
      title: "하드웨어 & 임베디드 (HW & Embedded)",
      skills: ["KiCad (PCB 설계)", "Vivado (FPGA)", "STM32 (FreeRTOS)", "오실로스코프 디버깅"],
      color: "border-l-indigo-600"
    },
    {
      title: "개발 도구 (Tools & Environment)",
      skills: ["Git / GitHub", "Linux (Ubuntu)", "VS Code", "Jupyter Lab"],
      color: "border-l-amber-600"
    }
  ]
};

export const initialProjects: Project[] = [
  {
    id: "proj-wafermap-ai",
    title: "Wafermap Generative AI & CLIP-based Defect Classifier Framework",
    subtitle: "반도체 웨이퍼맵 결함 데이터 생성을 위한 경량 Diffusion 모델 및 CLIP 기반 Zero-Shot Defect 분류 프레임워크",
    category: "CV/ML",
    featured: true,
    isMain: true,
    tags: ["PyTorch", "CLIP", "Diffusion Model", "Wafermap", "TensorRT", "OpenCV", "Model Compression"],
    date: "2025.03 - 2026.02 (1년 학부연구생)",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    sections: {
      overview: {
        title: "1. 프로젝트 개요 및 개발 목적 (Overview & Purpose)",
        content: "반도체 제조 라인에서 수집되는 Wafermap 결함 데이터의 극심한 클래스 불균형(Class Imbalance) 및 Unseen Defect 문제 해결을 위한 융합 엔지니어링 프레임워크입니다. 경량화된 Diffusion 생성 모델로 불균형 결함 패턴을 합성 및 증강하고, Fine-tuned CLIP 멀티모달 프레임워크를 적용하여 레이블이 없는 새로운 결함까지 높은 정확도로 분류합니다.\n\n개발 목적: 반도체 수율(Yield) 향상을 위한 실시간 결함 분석 자동화. 기존 CNN 모델의 한계인 미수집 결함 패턴 인식 불가 및 학습 데이터 부족 문제를 해결.",
        imageUrl: ""
      },
      architecture: {
        title: "2. 시스템 아키텍처 (System Flow & Architecture)",
        content: "1. Real Wafermap Die Matrix Data Input (WM-811K Dataset)\n2. Light-weight Latent Diffusion Generator -> Synthetic Augmentation\n3. Multi-modal Prompt Engineering (Text Description + Spatial Die Grid)\n4. CLIP Vision Transformer Backbone + Classification Head\n5. TensorRT FP16/INT8 Model Quantization Pipeline",
        imageUrl: ""
      },
      hardware: {
        title: "3. 하드웨어 회로 & PCB 설계 (Hardware & PCB Stackup)",
        content: "NVIDIA Jetson Orin Nano 8GB (40 TOPS AI Processing) 및 TensorRT 8.6 Engine INT8 Precision Quantization 적용. Edge Inspection Station 12V 3A Regulated Power Line 기반 구동.",
        imageUrl: ""
      },
      firmware: {
        title: "4. 임베디드 펌웨어 & FSM 구조 (Firmware & RTOS)",
        content: "실시간 에지 디바이스 추론 파이프라인 및 멀티모달 텐서 데이터 스트리밍 처리 펌웨어 구조.",
        imageUrl: ""
      },
      aiModel: {
        title: "5. AI 모델 & 양자화 파이프라인 (AI Model Architecture)",
        content: "Lightweight Latent Diffusion + Multi-Modal Vision-Language CLIP (ViT-B/16). WM-811K Dataset (811,472 wafer maps). TensorRT INT8 Calibration, Memory Footprint 4.2GB -> 1.1GB.",
        imageUrl: ""
      },
      metrics: {
        title: "6. 실험 및 측정 성능 결과 (Benchmark Metrics)",
        content: "• 정확도 (Accuracy): 96.4%\n• 처리량 (Throughput): 42.8 FPS\n• 지연 시간 (Latency): 23.3 ms\n• 소비 전력 (Power): 12.5 W\n• Zero-Shot Unseen Defect Recall: 91.8%",
        imageUrl: ""
      },
      troubleshooting: {
        title: "7. 문제 해결 및 트러블슈팅 (Engineering Trouble Shooting)",
        content: "[문제] Diffusion 생성 모델 적용 시 200단계 이상의 Sampling Iteration으로 인해 실시간 라인 검사 속도가 저하됨.\n[원인] 기존 Full Diffusion Pipeline의 과도한 Denoising Step.\n[해결] DDIM 15-step Fast Sampling Algorithm 및 Knowledge Distillation 적용하여 추론 시간을 15배 단축시킴.",
        imageUrl: ""
      }
    },
    overview: "반도체 제조 라인에서 수집되는 Wafermap 결함 데이터의 극심한 클래스 불균형(Class Imbalance) 및 Unseen Defect 문제 해결을 위한 융합 엔지니어링 프레임워크입니다. 경량화된 Diffusion 생성 모델로 불균형 결함 패턴을 합성 및 증강하고, Fine-tuned CLIP 멀티모달 프레임워크를 적용하여 레이블이 없는 새로운 결함까지 높은 정확도로 분류합니다.",
    purpose: "반도체 수율(Yield) 향상을 위한 실시간 결함 분석 자동화. 기존 CNN 모델의 한계인 미수집 결함 패턴 인식 불가 및 학습 데이터 부족 문제를 해결하여 반도체 에지 검사 장비에 적용 가능한 수준의 추론 속도와 정확도를 달성하고자 함.",
    systemArchitecture: [
      "1. Real Wafermap Die Matrix Data Input (WM-811K Dataset & Industrial Cleanroom Logs)",
      "2. Light-weight Latent Diffusion Generator -> High-Fidelity Synthetic Wafermap Data Augmentation",
      "3. Multi-modal Prompt Engineering (Text Description + Spatial Die Grid Embeddings)",
      "4. CLIP Vision Transformer Backbone + Lightweight Defect Classification Head",
      "5. TensorRT FP16/INT8 Model Quantization Pipeline",
      "6. Edge Industrial Inspection Workstation Deployment (Inference < 25ms)"
    ],
    circuitSchematics: {
      pcbLayers: "N/A (AI & Inspection Software Framework)",
      keyComponents: [
        { name: "NVIDIA Jetson Orin Nano 8GB", spec: "40 TOPS AI Processing", description: "라인 에지 검사 단말기 추론용 Board" },
        { name: "TensorRT 8.6 Engine", spec: "INT8 Precision Quantization", description: "FP32 대비 4.2배 속도 향상 및 메모리 절감" },
        { name: "Industrial Optical Scanner API", spec: "GigE Vision Protocol", description: "고속 실시간 웨이퍼 Die 이미지 스트리밍" }
      ],
      powerDesign: "Edge Inspection Station 12V 3A Regulated Power Line"
    },
    aiModelDetails: {
      modelType: "Lightweight Latent Diffusion + Multi-Modal Vision-Language CLIP (ViT-B/16)",
      dataset: "WM-811K Real Industrial Wafermap Dataset (811,472 wafer maps) + Lab Synthetic Augmentation",
      trainingProcess: "PyTorch DDP, Cosine Annealing LR, Prompt-Tuning for 8 Core Pattern Classes (Center, Donut, Edge-Ring, Edge-Loc, Scratch, Random, Loc, Near-Full)",
      quantization: "TensorRT INT8 Calibration using Entropy Calibrator v2, Memory Footprint 4.2GB -> 1.1GB"
    },
    metrics: {
      accuracy: "96.4%",
      fidScore: "12.4 (High Synthetic Quality)",
      fps: "42.8 FPS",
      latencyMs: "23.3 ms",
      powerWatts: "12.5 W",
      customMetric: { label: "Zero-Shot Unseen Defect Recall", value: "91.8%" }
    },
    troubleshooting: [
      {
        problem: "Diffusion 생성 모델 적용 시 200단계 이상의 Sampling Iteration으로 인해 실시간 라인 검사 속도가 저하됨 (장당 1.8초 소요).",
        cause: "기존 Full Diffusion Pipeline의 과도한 Denoising Step 및 Latent Space 차원 과대.",
        solution: "DDIM 15-step Fast Sampling Algorithm 및 Knowledge Distillation 기법을 적용하여 FID 점수 손실 없이 추론 시간을 장당 0.12초로 15배 단축시킴."
      },
      {
        problem: "CLIP 모델이 웨이퍼의 미세한 Scratch 패턴과 Random Pattern의 공간적 특성을 구분하지 못하는 오류 발생.",
        cause: "자연어 기반 일반 CLIP Text Prompt가 반도체 Die Grid의 공간 토폴로지(Spatial Topology) 정보 반영 부족.",
        solution: "Die Coordinate Spatial Encoding Layer를 CLIP Vision Encoder output에 결합하고, 반도체 도메인 특화 Prompt Template ('A wafer map with a continuous diagonal scratch line defect')을 커스텀 설계하여 Spatial Accuracy 14.2%p 상승."
      }
    ],
    githubUrl: "https://github.com/jiho-hwang-ee/wafermap-clip-framework",
    pdfReportUrl: "#",
    videoUrl: "#"
  },
  {
    id: "proj-autonomous-robot",
    title: "Jetson Orin & STM32 Dual-Controller Autonomous Inspection Mobile Robot",
    subtitle: "YOLOv8 Edge AI 시각 인지 및 STM32 Real-Time Motor FSM 제어 기반 반도체 라인 자율주행 물류 로봇",
    category: "etc.",
    featured: true,
    tags: ["STM32", "Jetson Orin Nano", "YOLOv8", "FreeRTOS", "KiCad PCB", "CAN Bus", "Motor Driver", "LiDAR"],
    date: "2025.07 - 2025.11",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    sections: {
      overview: {
        title: "1. 프로젝트 개요 및 개발 목적 (Overview & Purpose)",
        content: "상위 AI 인지 컴퓨터(Jetson Orin Nano)와 하위 고속 실시간 모터 제어기(STM32F407)를 CAN Bus로 결합한 산업용 AMR 로봇입니다. 4층 Custom PCB 전원 및 모터 드라이버 회로를 직접 설계하고, YOLOv8 비전 인식 기반 실시간 장애물 회피 및 정확한 정차 알고리즘을 구축했습니다.",
        imageUrl: ""
      },
      architecture: {
        title: "2. 시스템 아키텍처 (System Flow & Architecture)",
        content: "1. Stereo Camera & 2D LiDAR -> Jetson Orin Nano (Host)\n2. YOLOv8-Nano TensorRT Real-time Object Detection\n3. CAN Bus Protocol (1Mbps) Data Packet Transmission\n4. STM32F407 FreeRTOS Main Loop -> PID Quadrature Encoder Velocity Control (500Hz)\n5. Dual BTS7960 Motor Driver -> High Torque DC Geared Motors",
        imageUrl: ""
      },
      hardware: {
        title: "3. 하드웨어 회로 & PCB 설계 (Hardware & PCB Stackup)",
        content: "4-Layer Stackup (Top Signal - GND Plane - 3.3V/5V Power Plane - Bottom Signal). STM32F407VGT6 + BTS7960 43A High Current Motor Driver + LM2596S Buck Regulator.",
        imageUrl: ""
      },
      firmware: {
        title: "4. 임베디드 펌웨어 & FSM 구조 (Firmware & RTOS)",
        content: "System State FSM: INIT -> CALIBRATION -> IDLE -> NAVIGATING -> OBSTACLE_EMERGENCY_STOP. FreeRTOS Task Priority 500Hz PID Control Loop.",
        imageUrl: ""
      },
      aiModel: {
        title: "5. AI 모델 & 양자화 파이프라인 (AI Model Architecture)",
        content: "YOLOv8-Nano Custom Trained for Industrial Obstacles & Traffic Signs, TensorRT FP16 Execution on Jetson Orin Nano Tensor Cores.",
        imageUrl: ""
      },
      metrics: {
        title: "6. 실험 및 측정 성능 결과 (Benchmark Metrics)",
        content: "• Object Recall: 98.2%\n• Throughput: 48.5 FPS\n• System Latency: 18.2 ms\n• Average Power: 18.4 W\n• Emergency Braking Stopping Distance: < 4.2 cm",
        imageUrl: ""
      },
      troubleshooting: {
        title: "7. 문제 해결 및 트러블슈팅 (Engineering Trouble Shooting)",
        content: "[문제] 모터 급가속 시 MCU(STM32)에 Power Brown-out Reset(BOR) 현상 발생.\n[원인] DC 모터 기동 전류로 인한 24V 메인 전압 딥(Voltage Dip).\n[해결] Bulk electrolytic Capacitor (2200uF) 추가 및 Analog/Power Ground Plane 분리 설계로 노이즈 제거.",
        imageUrl: ""
      }
    },
    overview: "상위 AI 인지 컴퓨터(Jetson Orin Nano)와 하위 고속 실시간 모터 제어기(STM32F407)를 CAN Bus로 결합한 산업용 AMR 로봇입니다. 4층 Custom PCB 전원 및 모터 드라이버 회로를 직접 설계하고, YOLOv8 비전 인식 기반 실시간 장애물 회피 및 정확한 정차 알고리즘을 구축했습니다.",
    purpose: "클린룸 내 정밀 장비 및 웨이퍼 카세트 이송을 위해 하드웨어 전원/모터 제어 단의 결함 없는 30ms 이내 실시간 반응속도와 AI 장애물 감지를 통합 검증.",
    systemArchitecture: [
      "1. Stereo Camera & 2D LiDAR -> Jetson Orin Nano (Host)",
      "2. YOLOv8-Nano TensorRT Real-time Object & Signboard Detection",
      "3. Navigation Target Coordinate & Safety Speed Vector Generation",
      "4. CAN Bus Protocol (1Mbps) Data Packet Transmission to STM32 Controller",
      "5. STM32F407 FreeRTOS Main Loop -> PID Quadrature Encoder Velocity Control (500Hz)",
      "6. Dual BTS7960 Motor Driver -> High Torque DC Geared Motors"
    ],
    circuitSchematics: {
      pcbLayers: "4-Layer Stackup (Top Signal - GND Plane - 3.3V/5V Power Plane - Bottom Signal)",
      keyComponents: [
        { name: "STM32F407VGT6", spec: "ARM Cortex-M4 @ 168MHz", description: "주 모터 제어 및 센서 퓨전 MCU" },
        { name: "BTS7960 H-Bridge", spec: "43A High Current Motor Driver", description: "정밀 PWM 모터 구동 모듈" },
        { name: "LM2596S + AMS1117", spec: "24V to 5V/3.3V Buck Regulator", description: "전원 노이즈 필터링 및 전압 안정화" }
      ],
      powerDesign: "24V 10Ah LiFePO4 Battery input, TVS Diode Surge Protection, Reverse Polarity Protection Logic"
    },
    firmwareArchitecture: {
      fsmDescription: "System State FSM: INIT -> CALIBRATION -> IDLE -> NAVIGATING -> OBSTACLE_EMERGENCY_STOP -> MANUAL_OVERRIDE",
      rtosTasks: [
        { name: "Task_CAN_RxTx", priority: 4, periodMs: 5, role: "Jetson Orin 데이터 송수신 및 파싱" },
        { name: "Task_PID_Control", priority: 5, periodMs: 2, role: "500Hz 듀얼 모터 엔코더 PID 제어" },
        { name: "Task_Safety_Monitor", priority: 6, periodMs: 1, role: "초음파/Current Sensor 비상 정지 감시" }
      ],
      interrupts: ["TIM2 Encoder Hardware Quadrature Interrupt", "CAN1 RX FIFO0 Interrupt", "USART1 Telemetry Debug"]
    },
    aiModelDetails: {
      modelType: "YOLOv8-Nano Custom Trained for Industrial Obstacles & Traffic Signs",
      dataset: "2,500 Images collected in Lab Test Environment + Roboflow Synthetic Augmentation",
      trainingProcess: "PyTorch 100 Epochs, Transfer Learning from COCO, TensorRT FP16 Export",
      quantization: "TensorRT FP16 Execution on Jetson Orin Nano Tensor Cores"
    },
    metrics: {
      accuracy: "98.2% Object Recall",
      fps: "48.5 FPS",
      latencyMs: "18.2 ms System Latency",
      powerWatts: "18.4 W Average",
      customMetric: { label: "Emergency Braking Stopping Distance", value: "< 4.2 cm at 1.2 m/s" }
    },
    troubleshooting: [
      {
        problem: "모터 급가속 시 MCU(STM32)에 Power Brown-out Reset(BOR) 현상이 발생하여 로봇 재부팅됨.",
        cause: "DC 모터의 기동 전류(Inrush Current)로 인해 24V 메인 전압 딥(Voltage Dip)이 발생하고 3.3V LDO 입력을 하강시킴.",
        solution: "전원단에 Bulk electrolytic Capacitor (2200uF) 추가, LDO 전단 스위칭 벅 림 추가 및 PCB Ground Plane 분리(Analog GND & Power GND)로 스파이크 노이즈 제거 완료."
      },
      {
        problem: "CAN 통신 보드율(1Mbps) 설정 시 수신 패킷 버퍼 오버플로우로 데이터 탈락 발생.",
        cause: "STM32 FreeRTOS 최상위 우선순위 타스크 작업 지연으로 CAN RX ISR 핸들링 소요시간 초과.",
        solution: "CAN RX FIFO Hardware Filter 레지스터 구성 및 Circular Queue DMA 패킷 수신 구조로 변경하여 패킷 손실률 0% 달성."
      }
    ],
    githubUrl: "https://github.com/jiho-hwang-ee/stm32-jetson-amr-robot",
    pdfReportUrl: "#",
    videoUrl: "#"
  },
  {
    id: "proj-fpga-fsm",
    title: "Vivado Verilog High-Speed Digital Signal Synthesizer & AXI4 Bus Controller",
    subtitle: "Artix-7 FPGA 기반 고속 파형 생성 FSM 및 AXI4-Lite 버스 인터페이스 커스텀 IP 개발",
    category: "etc.",
    featured: true,
    tags: ["FPGA", "Verilog HDL", "Vivado", "FSM", "AXI4-Lite", "Artix-7", "Logic Analyzer", "Digital Signal Processing"],
    date: "2025.04 - 2025.07",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    sections: {
      overview: {
        title: "1. 프로젝트 개요 및 개발 목적 (Overview & Purpose)",
        content: "Artix-7 XC7A35T FPGA 보드를 활용하여 100MHz 메인 클록 기준 12-bit 정밀도의 고속 임의 파형(Sine, Triangle, PWM)을 실시간 생성하는 디지털 신호 합성기 IP 및 AXI4-Lite 레지스터 제어 인터페이스를 순수 Verilog HDL로 설계했습니다.",
        imageUrl: ""
      },
      architecture: {
        title: "2. 시스템 아키텍처 (System Flow & Architecture)",
        content: "1. Host MicroBlaze / External Controller AXI4-Lite Write\n2. Custom AXI Slave Register Block\n3. Top-Level State Machine FSM (IDLE -> FREQ_SET -> WAVE_GEN)\n4. Direct Digital Synthesizer (DDS) Phase Accumulator & LUT\n5. 12-Bit Parallel R-2R DAC Network",
        imageUrl: ""
      },
      hardware: {
        title: "3. 하드웨어 회로 & PCB 설계 (Hardware & PCB Stackup)",
        content: "Digilent Basys3 / Arty A7 FPGA Board Interface + R-2R Resistor Ladder DAC (0.1% Precision Resistors) Breadboard Circuit.",
        imageUrl: ""
      },
      firmware: {
        title: "4. 임베디드 펌웨어 & FSM 구조 (Firmware & RTOS)",
        content: "Verilog RTL State Machine FSM and AXI4-Lite Handshake Control Logic.",
        imageUrl: ""
      },
      aiModel: {
        title: "5. AI 모델 & 양자화 파이프라인 (AI Model Architecture)",
        content: "N/A (Pure FPGA Hardware Digital Logic Design)",
        imageUrl: ""
      },
      metrics: {
        title: "6. 실험 및 측정 성능 결과 (Benchmark Metrics)",
        content: "• Phase Accuracy: 99.98%\n• Latency: 10 ns (1 Clock Cycle)\n• Power Consumption: 0.85 W\n• Max Output Frequency: 25MHz Output, Jitter < 1.8ps",
        imageUrl: ""
      },
      troubleshooting: {
        title: "7. 문제 해결 및 트러블슈팅 (Engineering Trouble Shooting)",
        content: "[문제] 100MHz High-Speed 동작 시 Vivado Implementation 단계에서 Setup Timing Violation 발생.\n[해결] 2-Stage Register Structure를 도입하여 Pipelining 기법으로 논리 경로 분할 및 Timing Met 달성.",
        imageUrl: ""
      }
    },
    overview: "Artix-7 XC7A35T FPGA 보드를 활용하여 100MHz 메인 클록 기준 12-bit 정밀도의 고속 임의 파형(Sine, Triangle, PWM)을 실시간 생성하는 디지털 신호 합성기 IP 및 AXI4-Lite 레지스터 제어 인터페이스를 순수 Verilog HDL로 설계했습니다.",
    purpose: "반도체 테스트 장비 및 센서 시뮬레이션용 고정밀 하드웨어 파형 발생기를 구현하고, FPGA 내 FSM 타이밍 분석 및 AXI 버스 프로토콜 규격 준수를 검증하기 위함.",
    systemArchitecture: [
      "1. Host MicroBlaze / External Controller AXI4-Lite Write Command",
      "2. Custom AXI Slave Register Block (Control / Frequency / Duty Register)",
      "3. Top-Level State Machine FSM (IDLE -> FREQ_SET -> WAVE_GEN -> TRIGGER_OUT)",
      "4. Direct Digital Synthesizer (DDS) Phase Accumulator & Lookup Table (LUT) Engine",
      "5. 12-Bit Parallel R-2R DAC Network / External High-Speed SPI DAC Module",
      "6. Oscilloscope & Vivado Integrated Logic Analyzer (ILA) Real-time Waveform Verification"
    ],
    circuitSchematics: {
      pcbLayers: "Digilent Basys3 / Arty A7 FPGA Board Interface + R-2R DAC Breadboard Circuit",
      keyComponents: [
        { name: "Xilinx Artix-7 XC7A35T FPGA", spec: "33,280 Logic Cells @ 100MHz", description: "주 디지털 신호 처리 칩" },
        { name: "Vivado ILA (Integrated Logic Analyzer)", spec: "Real-time Signal Probe", description: "내부 FSM 상태 및 AXI Signal 잡기" },
        { name: "R-2R Resistor Ladder DAC", spec: "0.1% Precision Resistors", description: "아날로그 신호 출력 변환단" }
      ],
      powerDesign: "FPGA Board 5V USB Power with On-Board PMIC 1.0V/1.8V/3.3V Rails"
    },
    metrics: {
      accuracy: "99.98% Phase Accuracy",
      latencyMs: "10 ns (1 Clock Cycle Response)",
      powerWatts: "0.85 W",
      customMetric: { label: "Max Output Frequency & Jitter", value: "25MHz Output, Jitter < 1.8ps" }
    },
    troubleshooting: [
      {
        problem: "100MHz High-Speed 동작 시 Vivado Implementation 단계에서 Setup Timing Violation (Negative Slack -0.45ns) 발생.",
        cause: "DDS Phase Accumulator와 LUT Address Calculator 간 조합 논리(Combinational Logic) 경로의 길이에 따른 Propagation Delay.",
        solution: "Pipelining 기법을 도입하여 2-Stage Register Structure로 논리 경로를 분할, Setup Margin +0.32ns 확보 및 Timing Met 달성."
      },
      {
        problem: "AXI4-Lite 버스 쓰기 동작 시 간헐적으로 Read Data Mismatch 및 Bus Hanging 발생.",
        cause: "s_axi_awready 및 s_axi_wready 신호의 핸드셰이크 FSM 상태 변화 조건에서 Asynchronous Reset 해제 시 타이밍 글리치(Glitch) 발생.",
        solution: "Synchronous Active-High Reset 및 Double-Flop Synchronizer를 추가하여 metastability 방지 및 버스 안정성 확보."
      }
    ],
    githubUrl: "https://github.com/jiho-hwang-ee/fpga-verilog-axi-synthesizer",
    pdfReportUrl: "#"
  },
  {
    id: "proj-stm32-pcb",
    title: "Custom 4-Layer STM32 Power Management & Multi-Sensor IoT Board",
    subtitle: "노이즈 저감 지향 4층 PCB 회로 설계 및 임베디드 전원 관리 통신 시스템",
    category: "etc.",
    featured: false,
    tags: ["KiCad", "STM32", "PCB Design", "LTspice", "CAN", "SPI", "Power Integrity", "JLCPCB"],
    date: "2024.09 - 2024.12",
    thumbnail: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    sections: {
      overview: {
        title: "1. 프로젝트 개요 및 개발 목적 (Overview & Purpose)",
        content: "산업용 소형 노드 단말기를 위해 STM32F103 기반의 Custom 4-Layer PCB를 KiCad로 직접 설계 및 제작했습니다. 스위칭 레귤레이터의 EMI 노이즈를 최소화하는 Ground Plane 분리 패턴, CAN/RS485 임피던스 매칭 차동 신호선 배선, 리플 전압 15mVpp 이하의 전원 안정화를 달성했습니다.",
        imageUrl: ""
      },
      architecture: {
        title: "2. 시스템 아키텍처 (System Flow & Architecture)",
        content: "1. 24V Industrial Power Input -> TVS Diode -> MP2307 Buck Converter\n2. AMS1117-3.3 LDO Regulator (Clean Power)\n3. STM32F103C8T6 Main Controller Core\n4. SN65HVD230 CAN Transceiver & MAX485 RS485 Interface",
        imageUrl: ""
      },
      hardware: {
        title: "3. 하드웨어 회로 & PCB 설계 (Hardware & PCB Stackup)",
        content: "4-Layer Stackup (Top Signal, Ground, 3.3V/5V Power, Bottom Signal) - Layer Thickness 1.6mm. STM32F103C8T6 + MP2307DN Switcher + SN65HVD230.",
        imageUrl: ""
      },
      firmware: {
        title: "4. 임베디드 펌웨어 & FSM 구조 (Firmware & RTOS)",
        content: "STM32 HAL Driver based Sensor Data Acquisition and CAN Transmission Loop.",
        imageUrl: ""
      },
      aiModel: {
        title: "5. AI 모델 & 양자화 파이프라인 (AI Model Architecture)",
        content: "N/A (Embedded Hardware & Power Management)",
        imageUrl: ""
      },
      metrics: {
        title: "6. 실험 및 측정 성능 결과 (Benchmark Metrics)",
        content: "• Voltage Ripple < 12mVpp\n• Idle Power: 0.42 W\n• Max Power: 1.1 W\n• CAN Bus Differential Impedance Mismatch < 2.5%",
        imageUrl: ""
      },
      troubleshooting: {
        title: "7. 문제 해결 및 트러블슈팅 (Engineering Trouble Shooting)",
        content: "[문제] 오실로스코프 측정 시 3.3V 전원 라인에서 120kHz 스위칭 주파수 유도 노이즈 리플(85mVpp) 관찰됨.\n[해결] LTspice 시뮬레이션을 통해 LC Pi-Filter 재설계 및 MCU 핀 2mm 이내에 MLCC 배치하여 리플을 12mVpp 이하로 감쇄시킴.",
        imageUrl: ""
      }
    },
    overview: "산업용 소형 노드 단말기를 위해 STM32F103 기반의 Custom 4-Layer PCB를 KiCad로 직접 설계 및 제작했습니다. 스위칭 레귤레이터의 EMI 노이즈를 최소화하는 Ground Plane 분리 패턴, CAN/RS485 임피던스 매칭 차동 신호선 배선, 리플 전압 15mVpp 이하의 전원 안정화를 달성했습니다.",
    purpose: "노이즈가 심한 하드웨어 환경에서도 센서 신호의 왜곡 없이 안정적으로 24시간 원격 데이터를 수집/전송 가능한 전원 및 통신 회로 구축.",
    systemArchitecture: [
      "1. 24V Industrial Power Input -> TVS Diode -> MP2307 Buck Converter (5V)",
      "2. AMS1117-3.3 LDO Regulator (3.3V Clean Power for MCU/Sensors)",
      "3. STM32F103C8T6 Main Controller Core",
      "4. SN65HVD230 CAN Transceiver & MAX485 RS485 Interface",
      "5. High-Precision ADC Sensor Analog Front End Filter"
    ],
    circuitSchematics: {
      pcbLayers: "4-Layer Stackup (Top Signal, Ground, 3.3V/5V Power, Bottom Signal) - Layer Thickness 1.6mm",
      keyComponents: [
        { name: "STM32F103C8T6", spec: "ARM Cortex-M3 @ 72MHz", description: "주 임베디드 컨트롤러" },
        { name: "MP2307DN Switcher", spec: "3A 34V Step-Down Converter", description: "고효율 전원 변환 장치" },
        { name: "SN65HVD230", spec: "3.3V CAN Transceiver", description: "노이즈 내성 강화 차동 통신 칩" }
      ],
      powerDesign: "24V to 5V (88% Efficiency Buck) + LDO for Analog Ripple-free 3.3V line"
    },
    metrics: {
      accuracy: "Voltage Ripple < 12mVpp",
      powerWatts: "0.42 W Idle, 1.1 W Max",
      customMetric: { label: "CAN Bus Differential Impedance Mismatch", value: "< 2.5%" }
    },
    troubleshooting: [
      {
        problem: "오실로스코프 측정 시 3.3V 전원 라인에서 120kHz 스위칭 주파수 유도 고주파 노이즈 리플(85mVpp) 관찰됨.",
        cause: "MP2307 스위칭 인덕터의 출력 루프 면적이 크고 Decoupling Capacitor의 배치 거리가 MCU 핀에서 멀어 일어난 EMI 유도.",
        solution: "LTspice 시뮬레이션을 통해 LC Pi-Filter (10uH + 100nF Ceramic) 재설계 및 PCB 2차 수정 시 MCU 핀 2mm 이내에 MLCC 배치하여 리플을 12mVpp 이하로 감쇄시킴."
      }
    ],
    githubUrl: "https://github.com/jiho-hwang-ee/stm32-4layer-pcb-design",
    pdfReportUrl: "#"
  }
];

export const initialResearch: ResearchItem[] = [
  {
    id: "res-wafermap-cv",
    title: "Generative AI Data Augmentation & Multi-modal CLIP Framework for Semiconductor Wafer Pattern Defect Diagnosis",
    period: "2025.03 - 2026.02 (1년 학부연구생)",
    advisor: "전자공학과 컴퓨터비전 & 반도체 AI 연구실 지도교수",
    labName: "Computer Vision & Semiconductor AI Laboratory",
    tags: ["Undergraduate Researcher", "Wafermap Defect", "Generative AI", "CLIP", "Model Quantization", "Semiconductor Yield"],
    summary: "반도체 제조 공정의 수율 제고를 목적으로, 극소수 결함 데이터 수집 한계를 극복하는 경량 Diffusion 기반 Wafermap 생성 알고리즘 및 CLIP Zero-Shot 결함 분류 프레임워크 연구를 1년 동안 수행함.",
    objective: "WM-811K 등 웨이퍼맵 데이터셋의 90% 이상을 차지하는 None(정상) 데이터 대비 부족한 Center, Donut, Scratch 등 Rare Defect 데이터를 물리적 특성에 맞게 합성 증강하고, 레이블이 지정되지 않은 새로운 형태의 결함까지 인식할 수 있는 Zero-Shot 분류 프레임워크 구축.",
    methodology: "1. WM-811K Dataset 전처리 및 Die Map Matrix 변환\n2. Light-weight Latent Diffusion Generator 구축 및 Fast DDIM Sampling 적용\n3. CLIP Text-Image Multi-modal Space 매핑 및 Prompt Engineering\n4. Spatial Die Map Coordinate Attention Module 추가\n5. TensorRT INT8 양자화를 통한 에지 단말기 배포 가능성 실증",
    keyFindings: [
      "생성된 Wafermap 데이터 증강 시 Classifier F1-Score가 81.2%에서 95.8%로 상승함",
      "CLIP 기반 Zero-Shot 인식을 통해 학습에 포함되지 않은 Complex Multi-Defect 패턴에 대해서도 91.8% Recall 달성",
      "TensorRT 양자화 후에도 Accuracy 손실은 0.6%p에 불과하며 추론 속도는 4.2배 향상됨"
    ],
    metrics: [
      { label: "FID Score", value: "12.4", detail: "높은 생성 웨이퍼맵 화질 및 패턴 유사도" },
      { label: "Classification Accuracy", value: "96.4%", detail: "8가지 핵심 Defect 패턴 기준" },
      { label: "Inference Latency", value: "23.3ms", detail: "Jetson Orin Nano TensorRT INT8" },
      { label: "Zero-Shot Recall", value: "91.8%", detail: "Unseen Novel Defect Pattern" }
    ],
    paperTitle: "A Lightweight Multi-modal CLIP Framework with Generative Augmentation for Semiconductor Wafermap Defect Classification",
    publication: "한국정보과학회 / IEEE AI-HW Joint Workshop Presentation Candidate",
    pdfUrl: "#",
    posterUrl: "#"
  },
  {
    id: "res-fpga-signal",
    title: "FPGA-Accelerated Real-Time Signal Integrity Testing & Logic Analyzer Co-Design",
    period: "2024.09 - 2025.01",
    advisor: "임베디드 하드웨어 시스템 연구실",
    labName: "Embedded Hardware & System Research Lab",
    tags: ["FPGA", "Verilog", "Signal Integrity", "Logic Analyzer", "FSM Debugging"],
    summary: "고속 디지털 회로 설계 시 발생하는 Metastability, Clock Skew, Glitch 현상을 실시간 모니터링하기 위한 FPGA 기반 로직 애널라이저 IP 코어 설계 및 신호 무결성 검증 연구.",
    objective: "외부 비싼 계측기 없이 FPGA 내부 로직 신호를 200MHz 샘플링 속도로 트랩하여 AXI 버스로 호스트 PC에 전달하는 Embedded Analyzer 구축.",
    methodology: "1. Dual-Port Block RAM Ring Buffer 기반 샘플링 하드웨어 코어 설계\n2. Verilog Configurable Trigger Logic (Edge/Pattern Trigger)\n3. Python GUI 수신 소프트웨어 개발 및 타이밍 다이어그램 시각화",
    keyFindings: [
      "Vivado ILA 대비 BRAM 사용량을 40% 절감하면서 동일한 Trigger 성능 확보",
      "UART/SPI 통신 글리치 발생 순간을 5ns 분해능으로 정확히 capture"
    ],
    metrics: [
      { label: "Sampling Clock", value: "200 MHz", detail: "5ns Time Resolution" },
      { label: "Trigger Jitter", value: "< 2.1 ns", detail: "Hardware Real-Time Trap" }
    ],
    paperTitle: "FPGA Embedded Logic Analyzer IP Design for High-Speed Bus Debugging",
    publication: "학부생 창의연구 학술대회 장려상",
    pdfUrl: "#"
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: "gal-wafermap-gen",
    title: "Synthetic vs Real Semiconductor Wafermap Pattern Comparison Grid",
    category: "AI & Wafermap",
    date: "2025.11",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "WM-811K 실제 반도체 FAB 웨이퍼맵(좌측)과 경량 Diffusion 모델로 생성된 가상 웨이퍼맵(우측) 비교. Center, Donut, Scratch 패턴의 Die 불량 분포가 정밀하게 모사됨.",
    technicalSpecs: "Resolution: 52x52 Die Grid, Model: Latent Diffusion + DDIM 15-step, FID: 12.4",
    toolsUsed: ["PyTorch", "WM-811K Dataset", "Matplotlib", "OpenCV"]
  },
  {
    id: "gal-pcb-top",
    title: "STM32F407 4-Layer AMR Main Control Custom PCB Layout",
    category: "PCB & Circuit",
    date: "2025.08",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&w=800&q=80",
    description: "JLCPCB에서 제조된 4층 Custom PCB 탑 레이어. STM32 MCU 주변의 Decoupling Capacitor배치 및 CAN Transceiver 차동 배선(Differential Pair) 임피던스 매칭 구현.",
    technicalSpecs: "4-Layer FR4 1.6mm, 1oz Copper, Controlled Impedance 120 ohm for CAN",
    toolsUsed: ["KiCad 8.0", "JLCPCB SMT", "LTspice"]
  },
  {
    id: "gal-fpga-ila",
    title: "Vivado Logic Analyzer (ILA) FPGA FSM State Transition Capture",
    category: "FPGA & Hardware",
    date: "2025.05",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "100MHz 시스템 클록 환경에서 Verilog AXI4-Lite Slave FSM 상태 전환 순간 및 Handshake 신호(s_axi_arvalid & s_axi_arready) 파형 캡처 화면.",
    technicalSpecs: "Sampling Clock: 100MHz, Probe Depth: 4096 samples, Timing Slack: +0.32ns",
    toolsUsed: ["Xilinx Vivado 2023.2", "Artix-7 FPGA", "Verilog HDL"]
  },
  {
    id: "gal-oscilloscope",
    title: "Keysight Oscilloscope Power Rail Voltage Ripple & Switching Noise Test",
    category: "Lab Environment",
    date: "2025.02",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80",
    description: "3.3V LDO 전원단의 스위칭 노이즈 및 리플 전압 오실로스코프 측정. Pi-Filter 설계 후 11.8mVpp로 안정적인 노이즈 억제 확인.",
    technicalSpecs: "Oscilloscope: Keysight InfiniiVision 200MHz, AC Coupling Mode, 20MHz Bandwidth Limit",
    toolsUsed: ["Keysight Oscilloscope", "Digital Multimeter", "Soldering Station"]
  }
];

export const initialPapers: PaperItem[] = [
  {
    id: "paper-1",
    title: "A Lightweight Multi-modal CLIP Framework with Generative Augmentation for Semiconductor Wafermap Defect Classification",
    type: "Conference",
    authors: "황지호 (제1저자), 지도교수",
    venue: "한국정보과학회 / IEEE AI-HW Joint Workshop",
    year: "2025",
    abstract: "반도체 수율 관리의 핵심인 Wafermap 결함 분류에 있어서 불균형 데이터셋 및 레이블이 없는 새로운 패턴 인식의 한계를 극복하기 위해, 경량 Diffusion 모델 기반 결함 합성과 CLIP 멀티모달 텍스트-이미지 프롬프트 튜닝을 통합한 에지 최적화 분류 체계를 제안한다. 실험 결과 WM-811K 데이터셋에서 96.4%의 분류 정확도와 23.3ms의 추론 속도를 보였다.",
    pdfUrl: "#",
    bibtex: `@inproceedings{hwang2025wafermap,
  title={A Lightweight Multi-modal CLIP Framework with Generative Augmentation for Semiconductor Wafermap Defect Classification},
  author={Hwang, Ji-Ho and Prof. Advisor},
  booktitle={IEEE AI-HW Joint Workshop},
  year={2025}
}`,
    awards: "우수 논문 발표 후보 (Best Paper Nominee)"
  },
  {
    id: "paper-2",
    title: "FPGA-Based Real-Time Signal Synthesizer & Embedded Logic Analyzer Co-Design",
    type: "Poster",
    authors: "황지호, 연구팀",
    venue: "대한전자공학회 학술대회",
    year: "2024",
    abstract: "Artix-7 FPGA를 이용한 고속 디지털 신호 합성기 IP와 AXI 버스 인터페이스 설계 및 디버깅을 위한 내장형 로직 애널라이저 구현 기법을 소개한다.",
    pdfUrl: "#",
    bibtex: `@article{hwang2024fpga,
  title={FPGA-Based Real-Time Signal Synthesizer Design},
  author={Hwang, Ji-Ho},
  journal={KIEES Annual Conference},
  year={2024}
}`,
    awards: "학부생 연구 경진대회 우수상"
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: "blog-wafermap-clip",
    title: "Semiconductor Wafermap Defect Classification using CLIP & Light-Weight Generative AI",
    date: "2026.01.15",
    category: "AI & Semiconductor",
    readTime: "8 min read",
    summary: "WM-811K 반도체 웨이퍼맵 데이터의 클래스 불균형 문제를 해결하기 위해 Latent Diffusion으로 데이터셋을 생성하고, CLIP Zero-Shot 프레임워크를 반도체 도메인에 적용한 연구 일지입니다.",
    tags: ["Wafermap", "CLIP", "Diffusion", "PyTorch", "TensorRT", "Undergraduate Research"],
    content: `### 1. 반도체 FAB 웨이퍼맵(Wafermap) 결함 분석의 도전 과제

반도체 제조 공정(Fabrication)에서 웨이퍼 한 장에는 수천 개의 Die(칩)가 위치합니다. 테스트 공정(EDS)을 거치면 불량 칩의 위치에 따라 **Center, Donut, Scratch, Edge-Ring** 등의 독특한 결함 패턴(Defect Pattern)이 생성됩니다.

문제는 다음과 같습니다:
1. **극심한 데이터 불균형 (Class Imbalance)**: 정상(None) 데이터가 전체의 90% 이상이며, Scratch나 Edge-Loc 같은 치명적 결함은 데이터가 매우 적습니다.
2. **미지의 결함 (Unseen Defects)**: 공정이 변경되면 기존 학습 데이터에 없던 새로운 형태의 Defect가 발생합니다.

---

### 2. 해결책: Generative Diffusion + CLIP Zero-Shot

이 문제를 해결하기 위해 1년간의 학부연구생 기간 동안 다음과 같은 2-Step Architecture를 구축했습니다.

#### (1) Light-weight Diffusion Generator
- WM-811K의 희귀 Defect Die Matrix를 Latent Space에 매핑
- Fast DDIM 15-step Sampling으로 FID 12.4 수준의 고화질 가상 Wafermap 생성 및 데이터 증강

#### (2) CLIP Multi-Modal Prompt Tuning
- Vision Transformer Backbone + Custom Spatial Die Coordinate Attention
- Prompt Template: *"A semiconductor wafermap showing a [CLASS] defect pattern"*

---

### 3. TensorRT 양자화 및 에지 배포 결과

Jetson Orin Nano 단말기 배포를 위해 PyTorch 모델을 ONNX를 거쳐 **TensorRT INT8** 레진으로 변환했습니다.

- **FP32 Memory**: 4.2 GB -> **INT8 Memory**: 1.1 GB (73.8% 감축)
- **Latency**: 98.4ms -> **23.3ms** (4.2배 단속)
- **Accuracy**: 97.0% -> **96.4%** (단 0.6%p 손실)`,
    codeSnippet: {
      language: "python",
      filename: "wafermap_clip_pipeline.py",
      code: `import torch
import clip
from PIL import Image

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("ViT-B/16", device=device)

# Semiconductor Wafermap Defect Prompts
defect_classes = [
    "a wafermap with center defect pattern",
    "a wafermap with donut shape defect ring",
    "a wafermap with edge-ring defect",
    "a wafermap with scratch line defect",
    "a normal wafermap with no defects"
]

text_inputs = torch.cat([clip.tokenize(prompt) for prompt in defect_classes]).to(device)

def classify_wafermap(wafer_img_tensor):
    with torch.no_grad():
        image_features = model.encode_image(wafer_img_tensor)
        text_features = model.encode_text(text_inputs)
        
        # Normalized Cosine Similarity
        image_features /= image_features.norm(dim=-1, keepdim=True)
        text_features /= text_features.norm(dim=-1, keepdim=True)
        
        similarity = (100.0 * image_features @ text_features.T).softmax(dim=-1)
        return similarity`
    }
  },
  {
    id: "blog-fpga-fsm-debug",
    title: "FPGA Verilog FSM & AXI4 Protocol Debugging with Vivado Logic Analyzer (ILA)",
    date: "2025.10.20",
    category: "FPGA & Hardware",
    readTime: "6 min read",
    summary: "Xilinx Artix-7 FPGA 환경에서 Verilog AXI4-Lite Slave FSM을 구현할 때 발생할 수 있는 Timing Slack Violation 및 Bus Hanging 현상을 Vivado ILA 코어로 추적하고 해결한 경험을 공유합니다.",
    tags: ["FPGA", "Verilog", "Vivado", "ILA", "AXI4-Lite", "FSM"],
    content: `### FPGA FSM 디버깅의 중요성

하드웨어 신호 처리는 소프트웨어와 달리 순차 실행이 아닌 **동시적(Concurrent) 파이프라인**으로 작동합니다. AXI4 버스 통신의 경우 single clock cycle에서 Handshake 신호 mismatch가 발생하면 버스가 영구 대기 상태(Bus Hanging)에 빠질 수 있습니다.

---

### 주요 이슈: Negative Setup Slack (-0.45ns)

Vivado Implementation 완료 후 Timing Summary에서 Setup Slack이 음수로 계산되어 100MHz 클록 주기를 만족하지 못했습니다.

#### 원인 분석
DDS Phase Accumulator 연산 후 Lookup Table 메모리 탐색 및 Mux 연산 경로가 단일 Clock Cycle에 나열되어 Combinational Delay가 9.8ns에 달함.

#### 해결 기법: 2-Stage Pipelining
\`\`\`verilog
// Before: Combinational Direct Path
assign wave_out = dac_lut[phase_accumulator[31:20]];

// After: 2-Stage Pipelined Register Path
always @(posedge clk) begin
    if (rst) begin
        lut_addr <= 12'd0;
        wave_out <= 12'd0;
    end else begin
        lut_addr <= phase_accumulator[31:20]; // Stage 1
        wave_out <= dac_lut[lut_addr];          // Stage 2
    end
end
\`\`\`

결과적으로 Setup Slack이 **+0.32ns**로 전환되어 100MHz 동작 안정성을 완벽히 확보했습니다.`,
    codeSnippet: {
      language: "verilog",
      filename: "axi_lite_fsm.v",
      code: `// AXI4-Lite Read FSM State Machine
localparam IDLE  = 2'b00;
localparam READ  = 2'b01;
localparam WAIT  = 2'b10;

always @(posedge S_AXI_ACLK) begin
    if (!S_AXI_ARESETN) begin
        state <= IDLE;
        S_AXI_ARREADY <= 1'b0;
        S_AXI_RVALID  <= 1'b0;
    end else begin
        case (state)
            IDLE: begin
                if (S_AXI_ARVALID) begin
                    S_AXI_ARREADY <= 1'b1;
                    state <= READ;
                end
            end
            READ: begin
                S_AXI_ARREADY <= 1'b0;
                S_AXI_RVALID  <= 1'b1;
                state <= WAIT;
            end
            WAIT: begin
                if (S_AXI_RREADY) begin
                    S_AXI_RVALID <= 1'b0;
                    state <= IDLE;
                end
            end
        endcase
    end
end`
    }
  },
  {
    id: "blog-pcb-power-integrity",
    title: "Key Considerations for 4-Layer PCB Power Integrity & Noise Decoupling on STM32",
    date: "2025.06.12",
    category: "Hardware & PCB",
    readTime: "7 min read",
    summary: "STM32 MCU 기반 4층 PCB 설계 시 24V 스위칭 레귤레이터의 노이즈가 ADC 및 커뮤니케이션 핀에 미치는 영향을 최소화하기 위한 전원 평면(Power Plane) 및 Decoupling Capacitance 배치 노하우.",
    tags: ["KiCad", "PCB Design", "Power Integrity", "STM32", "LTspice", "EMI"],
    content: `### 4-Layer PCB 스택업 전략

2층 PCB 대비 4층 PCB의 가장 큰 장점은 **전용 Ground Plane과 Power Plane**을 가질 수 있어 신호 귀환 경로(Return Path)의 임피던스를 획기적으로 낮출 수 있다는 점입니다.

#### 권장 스택업 (1.6mm FR4)
1. **Top Layer**: Signal Lines + Critical Analog Components
2. **Layer 2**: Continuous Solid GND Plane (가장 중요)
3. **Layer 3**: 3.3V / 5V Power Plane (Split Plane for Analog 3.3V)
4. **Bottom Layer**: Secondary Signal + Bulk Capacitors

---

### Decoupling Capacitor 배치의 철칙

MCU 각 VDD 핀 근처에 100nF MLCC 수식 배치가 필수입니다. 이때 Via 위치가 전원 트레이스보다 먼 쪽에 배치되면 Loop Inductance가 증가하므로:
**VDD Pin -> 100nF Cap Pad -> Via to Power Plane** 순서로 기하학적 최소 거리를 유지해야 합니다.`
  }
];

export const initialSkills: SkillCategory[] = [
  {
    category: "Hardware",
    description: "회로 설계, PCB 레이아웃, 아날로그/디지털 신호 무결성 및 계측기 검증",
    skills: [
      { name: "PCB 설계 (KiCad / Altium)", level: "Expert", relatedProjectsCount: 3, description: "4층 Layer Stackup, 전원/GND Plane 분리, differential pair 임피던스 매칭" },
      { name: "회로 설계 & 노이즈 필터링", level: "Expert", relatedProjectsCount: 4, description: "TVS 보호, LDO/스위칭 벅 변환기, LC Pi-Filter, 센서 AFE" },
      { name: "오실로스코프 & 계측기", level: "Expert", relatedProjectsCount: 4, description: "Keysight/Tektronix 오실로스코프 리플 측정, 로직 애널라이저 버스 프로빙" },
      { name: "브레드보드 & 납땜 (SMD/DIP)", level: "Expert", relatedProjectsCount: 4, description: "SMD 0603/0805 수납땜, 칩 탈착, 납땜 보드 프로토타이핑" }
    ]
  },
  {
    category: "Embedded",
    description: "마이크로컨트롤러 및 에지 AI 단말기 펌웨어/시스템 통합",
    skills: [
      { name: "STM32 (Cortex-M4/M3)", level: "Expert", relatedProjectsCount: 3, description: "HAL/LL 드라이버, NVIC 중계, DMA 전송, Quadrature Encoder, PWM" },
      { name: "FreeRTOS", level: "Advanced", relatedProjectsCount: 2, description: "Multi-Task 스케줄링, Queue, Semaphore, Mutex, Task 우선순위 설계" },
      { name: "NVIDIA Jetson Orin Nano", level: "Expert", relatedProjectsCount: 2, description: "JetPack SDK, Linux Kernel, TensorRT 엔진 통합, C++ CUDA" },
      { name: "버스 프로토콜 (CAN, SPI, I2C, UART)", level: "Expert", relatedProjectsCount: 4, description: "CAN 1Mbps 하드웨어 필터링, SPI 20MHz DMA, RS485 차동 통신" }
    ]
  },
  {
    category: "FPGA",
    description: "Verilog HDL 하드웨어 기술 언어 및 Vivado 로직 합성",
    skills: [
      { name: "Verilog HDL", level: "Expert", relatedProjectsCount: 2, description: "Synthesizable RTL 설계, FSM (Finite State Machine), Pipeline 설계" },
      { name: "Vivado Design Suite", level: "Expert", relatedProjectsCount: 2, description: "Synthesis, Implementation, Timing Closure, Setup/Hold Slack 분석" },
      { name: "AXI4-Lite Bus Protocol", level: "Advanced", relatedProjectsCount: 2, description: "Custom AXI Slave IP 설계, Handshake FSM 구현" },
      { name: "Vivado ILA (Logic Analyzer)", level: "Expert", relatedProjectsCount: 2, description: "On-Chip Signal Capture, Hardware Trigger 파형 모니터링" }
    ]
  },
  {
    category: "AI / Computer Vision",
    description: "컴퓨터비전 학부연구생 1년 경험, 반도체 Wafermap 및 모델 경량화",
    skills: [
      { name: "Computer Vision & OpenCV", level: "Expert", relatedProjectsCount: 2, description: "영상처리, Contour 분석, Color/Spatial Matrix 변환, Augmentation" },
      { name: "Wafermap Defect AI Framework", level: "Expert", relatedProjectsCount: 1, description: "WM-811K 데이터셋 분석, Die Spatial Attention, Defect Pattern Classification" },
      { name: "Generative AI (Diffusion / GAN)", level: "Advanced", relatedProjectsCount: 1, description: "Latent Diffusion Model, DDIM Fast Sampling, Rare Defect Synthetic Generation" },
      { name: "CLIP Multi-Modal AI", level: "Expert", relatedProjectsCount: 1, description: "Vision-Language Zero-Shot Classification, Prompt Engineering, Multi-modal Embedding" },
      { name: "Model Quantization & TensorRT", level: "Expert", relatedProjectsCount: 2, description: "PyTorch -> ONNX -> TensorRT FP16/INT8 Calibration, 4x Speedup" }
    ]
  },
  {
    category: "Programming",
    description: "임베디드부터 AI 모델링, 시뮬레이션까지 시스템 소프트웨어 언어",
    skills: [
      { name: "C / C++", level: "Expert", relatedProjectsCount: 4, description: "임베디드 MCU 펌웨어, Pointer Memory Management, Object-Oriented C++" },
      { name: "Python", level: "Expert", relatedProjectsCount: 3, description: "PyTorch AI 모델링, OpenCV, NumPy, Matplotlib, Data Analysis" },
      { name: "MATLAB", level: "Proficient", relatedProjectsCount: 2, description: "신호 처리, 행렬 연산, 데이터 시각화" },
      { name: "Linux Bash Shell", level: "Proficient", relatedProjectsCount: 3, description: "Jetson/Raspberry Pi 환경 설정, Automation Scripting" }
    ]
  },
  {
    category: "Simulation",
    description: "하드웨어 검증 및 회로 동작 시뮬레이션 툴",
    skills: [
      { name: "LTspice", level: "Expert", relatedProjectsCount: 3, description: "전원부 스위칭 리플 분석, LC 필터 Frequency Response Bode Plot" },
      { name: "MATLAB / Simulink", level: "Proficient", relatedProjectsCount: 2, description: "모터 제어 PID Loop 시뮬레이션" },
      { name: "Proteus / ModelSim", level: "Proficient", relatedProjectsCount: 2, description: "Verilog HDL Testbench 시뮬레이션 및 MCU 회로 시뮬레이션" }
    ]
  }
];
