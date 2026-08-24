import React, { useState, useMemo } from 'react';
import { Cpu, Layers, Sparkles, Activity, CheckCircle2, Sliders, RefreshCw } from 'lucide-react';

export const WafermapVisualizer: React.FC = () => {
  const [selectedPattern, setSelectedPattern] = useState<'Center' | 'Donut' | 'Edge-Ring' | 'Scratch' | 'Random'>('Center');
  const [mode, setMode] = useState<'real' | 'synthetic'>('synthetic');
  const [gridSize] = useState(24);

  // Generate die grid matrix based on pattern
  const dieMatrix = useMemo(() => {
    const grid: number[][] = [];
    const radius = gridSize / 2;
    const center = radius - 0.5;

    for (let r = 0; r < gridSize; r++) {
      const row: number[] = [];
      for (let c = 0; c < gridSize; c++) {
        const dx = c - center;
        const dy = r - center;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > radius - 0.5) {
          // Outside wafer circle boundary
          row.push(2);
        } else {
          let isDefect = false;
          const randomFactor = (Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;

          if (selectedPattern === 'Center') {
            isDefect = dist < 4.2 + (mode === 'synthetic' ? (randomFactor - 0.5) * 1.5 : 0);
          } else if (selectedPattern === 'Donut') {
            isDefect = dist >= 5.5 && dist <= 8.5 && Math.abs(randomFactor) > 0.25;
          } else if (selectedPattern === 'Edge-Ring') {
            isDefect = dist >= 9.2 && dist <= 11.2 && Math.abs(randomFactor) > 0.2;
          } else if (selectedPattern === 'Scratch') {
            // Diagonal line equation dx - dy ≈ 0
            const lineDist = Math.abs(dx - dy * 0.8 - 1);
            isDefect = lineDist < 1.2 && dist < 10.5 && Math.abs(randomFactor) > 0.15;
          } else if (selectedPattern === 'Random') {
            isDefect = Math.abs(randomFactor) > 0.82;
          }

          row.push(isDefect ? 1 : 0);
        }
      }
      grid.push(row);
    }
    return grid;
  }, [selectedPattern, mode, gridSize]);

  // Statistics calculation
  const stats = useMemo(() => {
    let totalDies = 0;
    let defectiveDies = 0;
    dieMatrix.forEach((row) => {
      row.forEach((val) => {
        if (val === 0) totalDies++;
        if (val === 1) {
          totalDies++;
          defectiveDies++;
        }
      });
    });
    const yieldRate = totalDies > 0 ? (((totalDies - defectiveDies) / totalDies) * 100).toFixed(1) : '100.0';
    return { totalDies, defectiveDies, yieldRate };
  }, [dieMatrix]);

  const patternInfo = {
    Center: {
      prompt: "A semiconductor wafermap showing a concentrated center cluster defect",
      clipConfidence: "98.4%",
      fidScore: "11.2",
      rootCause: "공정 파라미터 미세 튜닝 오차 (Center Pressure Imbalance)"
    },
    Donut: {
      prompt: "A semiconductor wafermap with donut shape defect ring around mid-radius",
      clipConfidence: "96.8%",
      fidScore: "12.8",
      rootCause: "Spin Coater 회전속도 불균일 및 Chemical Dispense 편차"
    },
    'Edge-Ring': {
      prompt: "A semiconductor wafermap with edge-ring continuous defect around wafer border",
      clipConfidence: "97.5%",
      fidScore: "10.9",
      rootCause: "Edge Bead Removal(EBR) 노즐 막힘 및 베벨 오염"
    },
    Scratch: {
      prompt: "A semiconductor wafermap showing a linear diagonal scratch line across dies",
      clipConfidence: "94.2%",
      fidScore: "14.1",
      rootCause: "Robotic End-Effector 픽앤플레이스 기계적 긁힘"
    },
    Random: {
      prompt: "A semiconductor wafermap with randomly scattered particle defects",
      clipConfidence: "93.1%",
      fidScore: "15.0",
      rootCause: "Cleanroom 파티클 부유 오염 (Air Filter Inspection Needed)"
    }
  };

  const currentInfo = patternInfo[selectedPattern];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-xl font-sans">
      
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-400" />
          <h3 className="font-mono font-bold text-sm tracking-wide text-white">
            WAFERMAP GENERATIVE AI & CLIP INFERENCE DEMO
          </h3>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg text-xs font-mono">
          <button
            onClick={() => setMode('synthetic')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              mode === 'synthetic'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Diffusion Synthetic
          </button>
          <button
            onClick={() => setMode('real')}
            className={`px-2.5 py-1 rounded-md transition-all ${
              mode === 'real'
                ? 'bg-blue-600 text-white font-semibold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Real Cleanroom Log
          </button>
        </div>
      </div>

      {/* Main Grid & Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5 items-center">
        
        {/* Wafer Canvas Die Rendering */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center bg-slate-950 p-4 rounded-lg border border-slate-800 relative">
          
          {/* Wafer Outer Ring */}
          <div className="relative p-3 rounded-full border-2 border-slate-700 bg-slate-900/50 shadow-inner">
            
            {/* Wafer Notch indicator at bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-1.5 bg-slate-700 rounded-t-sm z-10" />

            {/* Die Grid */}
            <div 
              className="grid gap-0.5"
              style={{
                gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`
              }}
            >
              {dieMatrix.map((row, rIdx) =>
                row.map((dieVal, cIdx) => {
                  let dieBg = 'bg-transparent border-transparent';
                  if (dieVal === 0) {
                    dieBg = 'bg-emerald-500/80 border-emerald-600/30'; // Normal Pass Die
                  } else if (dieVal === 1) {
                    dieBg = 'bg-rose-500 border-rose-400 shadow-sm animate-pulse'; // Defective Die
                  }

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[1px] ${dieBg} transition-colors`}
                      title={`Die (${rIdx},${cIdx}): ${dieVal === 1 ? 'DEFECT (FAIL)' : dieVal === 0 ? 'PASS' : 'OUTSIDE'}`}
                    />
                  );
                })
              )}
            </div>
          </div>

          {/* Die Legend */}
          <div className="flex items-center gap-4 mt-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" />
              <span>PASS ({stats.totalDies - stats.defectiveDies})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500" />
              <span>DEFECT ({stats.defectiveDies})</span>
            </div>
            <div className="flex items-center gap-1.5 text-blue-400">
              <Activity className="w-3.5 h-3.5" />
              <span>Yield: {stats.yieldRate}%</span>
            </div>
          </div>
        </div>

        {/* Pattern Selection & CLIP Analysis Details */}
        <div className="lg:col-span-6 space-y-4">
          <div>
            <label className="text-xs font-mono text-slate-400 block mb-2 font-semibold">
              SELECT DEFECT PATTERN TYPE (결함 유형 선택):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(['Center', 'Donut', 'Edge-Ring', 'Scratch', 'Random'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPattern(p)}
                  className={`px-3 py-1.5 rounded text-xs font-mono font-bold transition-all ${
                    selectedPattern === p
                      ? 'bg-blue-600 text-white shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* CLIP Prompt Box */}
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 text-blue-400 font-bold">
                <Sparkles className="w-3.5 h-3.5" /> CLIP Zero-Shot Prompt Match:
              </span>
              <span className="text-emerald-400 font-bold">Confidence: {currentInfo.clipConfidence}</span>
            </div>
            <p className="text-slate-200 bg-slate-900 p-2 rounded border border-slate-800">
              &quot;{currentInfo.prompt}&quot;
            </p>
          </div>

          {/* Model Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center font-mono">
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">FID SCORE</div>
              <div className="text-sm font-bold text-blue-400">{currentInfo.fidScore}</div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">TENSORRT PRECISION</div>
              <div className="text-sm font-bold text-emerald-400">INT8 Engine</div>
            </div>
            <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
              <div className="text-[10px] text-slate-400">LATENCY</div>
              <div className="text-sm font-bold text-indigo-400">23.3 ms</div>
            </div>
          </div>

          {/* Diagnostic Root Cause */}
          <div className="bg-blue-950/40 border border-blue-900/60 p-3 rounded-lg text-xs font-sans">
            <span className="font-mono text-blue-400 font-bold block mb-0.5">
              진단 추론 (Diagnostic Cause):
            </span>
            <p className="text-slate-300 leading-relaxed">
              {currentInfo.rootCause}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
