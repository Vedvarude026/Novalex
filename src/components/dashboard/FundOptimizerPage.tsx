import React, { useState } from 'react';
import { formatINR, solveKnapsackOptimization, ItemToOptimize } from '../../utils/formatters';
import {
  Calculator,
  Sliders,
  CheckCircle2,
  Sparkles,
  TrendingDown,
  DollarSign,
  Zap,
  RotateCcw
} from 'lucide-react';

export const FundOptimizerPage: React.FC = () => {
  const [budget, setBudget] = useState<number>(5000000); // Default ₹50 Lakhs

  // Candidate investment tasks
  const candidateTasks: ItemToOptimize[] = [
    {
      id: 'opt-1',
      name: 'Patch Payment Gateway Server (CVE-2026-48291)',
      cveId: 'CVE-2026-48291',
      cost: 500000, // ₹5.0 L
      riskReduction: 14500000, // ₹1.45 Cr
      rosi: 29.0,
    },
    {
      id: 'opt-2',
      name: 'Enable MFA for Privileged Accounts & Customer DB Access',
      cveId: 'CVE-2026-39102',
      cost: 200000, // ₹2.0 L
      riskReduction: 5800000, // ₹58 L
      rosi: 29.0,
    },
    {
      id: 'opt-3',
      name: 'Cloud Infrastructure Access Hardening & Role Least Privilege',
      cveId: 'CVE-2026-28910',
      cost: 200000, // ₹2.0 L
      riskReduction: 3500000, // ₹35 L
      rosi: 17.5,
    },
    {
      id: 'opt-4',
      name: 'Improve EDR Coverage Agent Across Production Endpoints',
      cveId: 'CVE-2026-11029',
      cost: 1200000, // ₹12.0 L
      riskReduction: 4400000, // ₹44 L
      rosi: 3.6,
    },
    {
      id: 'opt-5',
      name: 'Upgrade API Gateway JWT Proxy & Rate Limiter',
      cveId: 'CVE-2026-19283',
      cost: 150000, // ₹1.5 L
      riskReduction: 2800000, // ₹28 L
      rosi: 18.6,
    },
    {
      id: 'opt-6',
      name: 'Implement Zero-Trust Microsegmentation in DMZ',
      cveId: 'SEC-ZT-001',
      cost: 2500000, // ₹25.0 L
      riskReduction: 6200000, // ₹62 L
      rosi: 2.48,
    },
  ];

  const presets = [
    { label: '₹10 L', value: 1000000 },
    { label: '₹25 L', value: 2500000 },
    { label: '₹50 L', value: 5000000 },
    { label: '₹1 Cr', value: 10000000 },
    { label: '₹2 Cr', value: 20000000 },
  ];

  // Selected items state
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'opt-1',
    'opt-2',
    'opt-3',
    'opt-5',
  ]);

  const [isOptimizing, setIsOptimizing] = useState(false);

  // Run Knapsack solver
  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const result = solveKnapsackOptimization(candidateTasks, budget);
      setSelectedIds(result.selectedIds);
      setIsOptimizing(false);
    }, 400);
  };

  const toggleItem = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Compute live statistics based on selections
  const totalSelectedCost = candidateTasks
    .filter((t) => selectedIds.includes(t.id))
    .reduce((sum, t) => sum + t.cost, 0);

  const totalRiskReduction = candidateTasks
    .filter((t) => selectedIds.includes(t.id))
    .reduce((sum, t) => sum + t.riskReduction, 0);

  const unusedBudget = Math.max(0, budget - totalSelectedCost);

  const baselineEAL = 48200000; // ₹4.82 Cr
  const remainingEAL = Math.max(0, baselineEAL - totalRiskReduction);

  const portfolioROSI =
    totalSelectedCost > 0 ? (totalRiskReduction / totalSelectedCost).toFixed(2) : '0.00';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
            Fund Optimizer
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              0/1 Knapsack Algorithm
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Maximize risk reduction within your cybersecurity budget.
          </p>
        </div>

        <button
          onClick={handleOptimize}
          disabled={isOptimizing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 cursor-pointer shrink-0 transition-all"
        >
          <Sparkles className={`w-4 h-4 ${isOptimizing ? 'animate-spin text-white' : ''}`} />
          <span>{isOptimizing ? 'Computing Knapsack...' : 'Optimize Portfolio'}</span>
        </button>
      </div>

      {/* Budget Selector & Sliders Controls */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <label className="text-xs font-mono font-bold text-slate-300 uppercase block">
              Available Security Budget
            </label>
            <span className="text-2xl font-mono font-extrabold text-cyan-400">
              {formatINR(budget)}
            </span>
          </div>

          {/* Presets Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono text-slate-400">Presets:</span>
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setBudget(p.value);
                  const res = solveKnapsackOptimization(candidateTasks, p.value);
                  setSelectedIds(res.selectedIds);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  budget === p.value
                    ? 'bg-blue-600 text-white border border-blue-400'
                    : 'bg-[#0B0F17] text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Range Slider */}
        <input
          type="range"
          min="500000"
          max="50000000"
          step="500000"
          value={budget}
          onChange={(e) => setBudget(parseInt(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />
      </div>

      {/* Optimization KPI Counters Bar (5 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Target Budget
          </span>
          <span className="text-base font-mono font-bold text-slate-100">
            {formatINR(budget)}
          </span>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Selected Investment
          </span>
          <span className="text-base font-mono font-bold text-cyan-400">
            {formatINR(totalSelectedCost)}
          </span>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Unused Budget
          </span>
          <span className="text-base font-mono font-bold text-slate-300">
            {formatINR(unusedBudget)}
          </span>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-xl p-3">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Annual Risk Reduction
          </span>
          <span className="text-base font-mono font-bold text-emerald-400">
            {formatINR(totalRiskReduction)}
          </span>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-xl p-3 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase block">
            Remaining EAL Exposure
          </span>
          <span className="text-base font-mono font-bold text-rose-400">
            {formatINR(remainingEAL)}
          </span>
        </div>
      </div>

      {/* Candidate Investments Selection Table */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-white font-sans">
            Optimized Security Portfolio Actions
          </h3>
          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded">
            Portfolio ROSI: {portfolioROSI}x
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">Include</th>
                <th className="py-2.5 px-3">Remediation Action</th>
                <th className="py-2.5 px-3">CVE ID</th>
                <th className="py-2.5 px-3 text-right">Cost</th>
                <th className="py-2.5 px-3 text-right">Risk Reduction</th>
                <th className="py-2.5 px-3 text-center">ROSI</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {candidateTasks.map((item) => {
                const isChecked = selectedIds.includes(item.id);
                return (
                  <tr
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                      isChecked ? 'bg-cyan-950/10' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleItem(item.id)}
                        className="w-4 h-4 accent-cyan-400 rounded cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-200">{item.name}</td>
                    <td className="py-3 px-3 font-mono text-cyan-400">{item.cveId}</td>
                    <td className="py-3 px-3 text-right font-mono text-slate-300">
                      {formatINR(item.cost)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                      {formatINR(item.riskReduction)}
                    </td>
                    <td className="py-3 px-3 text-center font-mono font-bold text-emerald-400">
                      {item.rosi}x
                    </td>
                    <td className="py-3 px-3 text-right">
                      {isChecked ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ✓ SELECTED
                        </span>
                      ) : (
                        <span className="text-slate-500 font-mono text-[10px]">EXCLUDED</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
