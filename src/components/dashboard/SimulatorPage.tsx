import React, { useState } from 'react';
import { formatINR } from '../../utils/formatters';
import {
  SlidersHorizontal,
  TrendingDown,
  Clock,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';

export const SimulatorPage: React.FC = () => {
  // Toggles
  const [patchVuln, setPatchVuln] = useState(true);
  const [enableMfa, setEnableMfa] = useState(true);
  const [improveSIEM, setImproveSIEM] = useState(false);
  const [deployEDR, setDeployEDR] = useState(false);
  const [segmentation, setSegmentation] = useState(true);
  const [delayPatch, setDelayPatch] = useState(false);

  // Sliders
  const [patchDelayDays, setPatchDelayDays] = useState<number>(30);
  const [investment, setInvestment] = useState<number>(4650000); // ₹46.5 L
  const [controlEffectiveness, setControlEffectiveness] = useState<number>(65);

  // Dynamic calculations
  let baseEAL = 48200000; // ₹4.82 Cr baseline
  let riskReductionPercent = 0;

  if (patchVuln) riskReductionPercent += 28;
  if (enableMfa) riskReductionPercent += 12;
  if (improveSIEM) riskReductionPercent += 15;
  if (deployEDR) riskReductionPercent += 10;
  if (segmentation) riskReductionPercent += 14;

  if (delayPatch) {
    riskReductionPercent -= Math.min(25, Math.floor(patchDelayDays / 5));
  }

  riskReductionPercent = Math.max(0, Math.min(85, riskReductionPercent));

  const simulatedEAL = Math.round(baseEAL * (1 - riskReductionPercent / 100));
  const riskReducedAmount = baseEAL - simulatedEAL;
  const rosi = investment > 0 ? (riskReducedAmount / investment).toFixed(2) : '0.00';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
            What-If Decision Simulator
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Interactive Scenario Modeling
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Model security decisions and patch delays before spending money
          </p>
        </div>

        <button
          onClick={() => {
            setPatchVuln(true);
            setEnableMfa(true);
            setImproveSIEM(false);
            setDeployEDR(false);
            setSegmentation(true);
            setDelayPatch(false);
            setPatchDelayDays(30);
            setInvestment(4650000);
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold border border-slate-700 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Scenario</span>
        </button>
      </div>

      {/* Scenario Toggles Chips */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 space-y-3">
        <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
          Scenario Controls (Toggle Remediation Actions)
        </label>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Patch Vulnerability', state: patchVuln, set: setPatchVuln },
            { label: 'Enable MFA', state: enableMfa, set: setEnableMfa },
            { label: 'Improve SIEM Monitoring', state: improveSIEM, set: setImproveSIEM },
            { label: 'Deploy EDR Agent', state: deployEDR, set: setDeployEDR },
            { label: 'Network Segmentation', state: segmentation, set: setSegmentation },
            { label: 'Delay Remediation', state: delayPatch, set: setDelayPatch },
          ].map((chip) => (
            <button
              key={chip.label}
              onClick={() => chip.set(!chip.state)}
              className={`px-3 py-2 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                chip.state
                  ? 'bg-blue-600/20 border-blue-500 text-blue-300 shadow-sm'
                  : 'bg-[#0B0F17] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {chip.state ? '✓ ' : '+ '} {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Slider 1: Patch Delay */}
        <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">Patch Delay Days</span>
            <span className="text-amber-400 font-extrabold">{patchDelayDays} Days</span>
          </div>
          <input
            type="range"
            min="0"
            max="180"
            value={patchDelayDays}
            onChange={(e) => setPatchDelayDays(parseInt(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 font-sans">
            Simulates exposure compounding over patch windows
          </p>
        </div>

        {/* Slider 2: Security Investment */}
        <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">Security Investment</span>
            <span className="text-cyan-400 font-extrabold">{formatINR(investment)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="20000000"
            step="250000"
            value={investment}
            onChange={(e) => setInvestment(parseInt(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 font-sans">
            Allocated budget for simulation run
          </p>
        </div>

        {/* Slider 3: Control Effectiveness */}
        <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-slate-300 font-bold">Control Effectiveness</span>
            <span className="text-purple-400 font-extrabold">{controlEffectiveness}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={controlEffectiveness}
            onChange={(e) => setControlEffectiveness(parseInt(e.target.value))}
            className="w-full accent-purple-500 cursor-pointer"
          />
          <p className="text-[10px] text-slate-400 font-sans">
            Estimated mitigation coverage
          </p>
        </div>
      </div>

      {/* Dynamic Scenario Result Comparison Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CURRENT STATE */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-5">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
            CURRENT BASELINE STATE
          </span>
          <div className="text-3xl font-mono font-extrabold text-rose-400">
            {formatINR(baseEAL)}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Unmitigated Annual Risk Exposure
          </p>
        </div>

        {/* SIMULATED AFTER STATE */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#0D1E30] border-2 border-emerald-500/50 rounded-2xl p-5 glow-green transition-all">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              AFTER SIMULATION STATE
            </span>
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Risk Reduced: {riskReductionPercent}%
            </span>
          </div>
          <div className="text-3xl font-mono font-extrabold text-emerald-400">
            {formatINR(simulatedEAL)}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800 flex justify-between text-xs font-mono">
            <div>
              <span className="text-slate-400 block text-[10px]">Estimated Investment</span>
              <span className="text-cyan-400 font-bold">{formatINR(investment)}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Simulation ROSI</span>
              <span className="text-emerald-400 font-bold">{rosi}x</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
