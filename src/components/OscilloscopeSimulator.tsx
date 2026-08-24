import React, { useState, useMemo } from 'react';
import { Activity, Sliders, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

export const OscilloscopeSimulator: React.FC = () => {
  const [signalType, setSignalType] = useState<'power_ripple' | 'fpga_dds' | 'can_bus'>('power_ripple');
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [frequency, setFrequency] = useState(120); // kHz

  // Generate SVG waveform points
  const wavePoints = useMemo(() => {
    const points: string[] = [];
    const pointsDiff: string[] = [];
    const width = 450;
    const height = 140;
    const midY = height / 2;

    for (let x = 0; x <= width; x += 2) {
      const t = x / 30;
      let y = midY;
      let yDiff = midY;

      if (signalType === 'power_ripple') {
        // Switching Noise Ripple
        const baseNoise = Math.sin(t * (frequency / 20)) * (filterEnabled ? 6 : 38);
        const spike = (!filterEnabled && x % 40 === 0) ? (Math.random() - 0.5) * 45 : 0;
        y = midY + baseNoise + spike;
      } else if (signalType === 'fpga_dds') {
        // 25MHz Synthesized Sine Wave with slight quantization step
        const stepT = Math.floor(t * 8) / 8;
        y = midY - Math.sin(stepT * 2) * 45;
      } else if (signalType === 'can_bus') {
        // CAN Bus Differential Signals CAN_H and CAN_L
        const bitState = (Math.floor(x / 30) % 2 === 0); // Dominant (0) vs Recessive (1)
        if (bitState) {
          // Dominant: CAN_H = 3.5V, CAN_L = 1.5V
          y = midY - 32; // CAN_H
          yDiff = midY + 32; // CAN_L
        } else {
          // Recessive: CAN_H = 2.5V, CAN_L = 2.5V
          y = midY - 5;
          yDiff = midY + 5;
        }
      }

      points.push(`${x},${y}`);
      if (signalType === 'can_bus') {
        pointsDiff.push(`${x},${yDiff}`);
      }
    }

    return { main: points.join(' '), secondary: pointsDiff.join(' ') };
  }, [signalType, filterEnabled, frequency]);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-xl p-5 border border-slate-800 shadow-xl font-mono text-xs">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          <span className="font-bold text-sm text-white">KEYSIGHT DSO-X 200MHz SIGNAL ANALYZER</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            TRIG: AUTO 20.0mV
          </span>
        </div>
      </div>

      {/* Screen Display */}
      <div className="mt-4 bg-slate-950 rounded-lg p-3 border border-slate-800 relative overflow-hidden">
        
        {/* Oscilloscope Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-15 pointer-events-none">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="border border-emerald-500/40" />
          ))}
        </div>

        {/* Waveform SVG */}
        <div className="relative h-36 flex items-center justify-center">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 450 140" preserveAspectRatio="none">
            {/* Center Reference Axis */}
            <line x1="0" y1="70" x2="450" y2="70" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
            
            {/* Main Trace */}
            <polyline
              fill="none"
              stroke={signalType === 'can_bus' ? '#38bdf8' : '#34d399'}
              strokeWidth="2"
              points={wavePoints.main}
            />

            {/* Differential Second Trace (CAN_L) */}
            {signalType === 'can_bus' && (
              <polyline
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2"
                points={wavePoints.secondary}
              />
            )}
          </svg>
        </div>

        {/* Measurement Legend */}
        <div className="mt-2 flex flex-wrap items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
          <div>
            CH1: <span className="text-emerald-400 font-bold">10.0mV/div</span>
          </div>
          <div>
            TIME: <span className="text-blue-400 font-bold">5.00us/div</span>
          </div>
          <div>
            {signalType === 'power_ripple' ? (
              <span>Vpp: <span className="text-amber-400 font-bold">{filterEnabled ? '11.8 mV' : '85.4 mV'}</span></span>
            ) : signalType === 'fpga_dds' ? (
              <span>FREQ: <span className="text-emerald-400 font-bold">25.000 MHz</span></span>
            ) : (
              <span>DIFF VOLT: <span className="text-sky-400 font-bold">2.0 V (Dominant)</span></span>
            )}
          </div>
        </div>
      </div>

      {/* Control Knobs & Selector */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setSignalType('power_ripple')}
          className={`p-2.5 rounded-lg border text-left transition-all ${
            signalType === 'power_ripple'
              ? 'bg-blue-950/80 border-blue-600 text-white shadow'
              : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="font-bold text-xs text-blue-400 mb-0.5">1. STM32 Power Ripple</div>
          <p className="text-[10px] text-slate-400 font-sans">Pi-Filter LC 3.3V LDO 노이즈 분석</p>
        </button>

        <button
          onClick={() => setSignalType('fpga_dds')}
          className={`p-2.5 rounded-lg border text-left transition-all ${
            signalType === 'fpga_dds'
              ? 'bg-blue-950/80 border-blue-600 text-white shadow'
              : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="font-bold text-xs text-blue-400 mb-0.5">2. FPGA Verilog DDS</div>
          <p className="text-[10px] text-slate-400 font-sans">100MHz System Clock Sine Wave</p>
        </button>

        <button
          onClick={() => setSignalType('can_bus')}
          className={`p-2.5 rounded-lg border text-left transition-all ${
            signalType === 'can_bus'
              ? 'bg-blue-950/80 border-blue-600 text-white shadow'
              : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:bg-slate-800'
          }`}
        >
          <div className="font-bold text-xs text-blue-400 mb-0.5">3. CAN_H / CAN_L Bus</div>
          <p className="text-[10px] text-slate-400 font-sans">1Mbps Differential Signal Pair</p>
        </button>
      </div>

      {/* Filter Switch for Power Ripple Mode */}
      {signalType === 'power_ripple' && (
        <div className="mt-3 bg-slate-950 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between">
          <span className="text-slate-300 font-sans text-xs">
            Pi-Filter (LC 10uH + 100nF MLCC) 노이즈 감쇄 회로 적용:
          </span>
          <button
            onClick={() => setFilterEnabled(!filterEnabled)}
            className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
              filterEnabled ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
            }`}
          >
            {filterEnabled ? 'ON (11.8mVpp Pass)' : 'OFF (85.4mVpp Noise)'}
          </button>
        </div>
      )}
    </div>
  );
};
