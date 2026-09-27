import React from 'react';
import { Vulnerability } from '../../types';
import { formatINR } from '../../utils/formatters';
import {
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface RemediationPageProps {
  vulnerabilities: Vulnerability[];
  onSelectVulnerability: (vuln: Vulnerability) => void;
  onOpenOptimizer: () => void;
}

export const RemediationPage: React.FC<RemediationPageProps> = ({
  vulnerabilities,
  onSelectVulnerability,
  onOpenOptimizer,
}) => {
  const rankedActions = [
    {
      rank: 1,
      action: 'Patch Payment Server Gateway (CVE-2026-48291)',
      cost: 500000, // ₹5.0 L
      riskReduction: 14500000, // ₹1.45 Cr
      roi: '29.0x',
      recommendation: 'Fix First',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      isTop: true,
      asset: 'PAY-GW-PROD-01',
      cveId: 'CVE-2026-48291',
    },
    {
      rank: 2,
      action: 'Enable MFA for Privileged Accounts & DB Gateway',
      cost: 200000, // ₹2.0 L
      riskReduction: 5800000, // ₹58 L
      roi: '29.0x',
      recommendation: 'High Priority',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      isTop: false,
      asset: 'CUSTOMER-DB-01',
      cveId: 'CVE-2026-39102',
    },
    {
      rank: 3,
      action: 'Improve SIEM Log Correlation & Event Monitoring',
      cost: 800000, // ₹8.0 L
      riskReduction: 8200000, // ₹82 L
      roi: '10.2x',
      recommendation: 'Recommended',
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      isTop: false,
      asset: 'AWS-PROD-US-01',
      cveId: 'CVE-2026-28910',
    },
    {
      rank: 4,
      action: 'Upgrade Endpoint Defense & EDR Coverage Agent',
      cost: 1200000, // ₹12.0 L
      riskReduction: 4400000, // ₹44 L
      roi: '3.6x',
      recommendation: 'Lower Priority',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
      isTop: false,
      asset: 'DEV-LAPTOP-042',
      cveId: 'CVE-2026-11029',
    },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
            Fix What Matters Financially
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              ROI Ranking Engine
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Prioritizing cybersecurity fixes by risk reduction per rupee invested
          </p>
        </div>

        <button
          onClick={onOpenOptimizer}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <Sparkles className="w-4 h-4 text-cyan-300" />
          <span>Launch Fund Optimizer</span>
        </button>
      </div>

      {/* Formula & Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Formula Box */}
        <div className="md:col-span-2 bg-[#0F172A] border border-blue-500/30 rounded-2xl p-4 font-mono text-xs shadow-lg">
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1 font-sans">
            DIGILEX Remediation ROI Ranking Formula
          </span>
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <span className="text-cyan-400">REMEDIATION VALUE (ROSI)</span>
            <span className="text-slate-500">=</span>
            <span className="text-emerald-400">Risk Reduction (EAL)</span>
            <span className="text-slate-500 font-normal">÷</span>
            <span className="text-rose-400">Remediation Cost (INR)</span>
          </div>
        </div>

        {/* Risk Points Metric */}
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">
              Efficiency Metric
            </span>
            <span className="text-lg font-mono font-extrabold text-emerald-400">
              ₹2,900 Risk Reduction
            </span>
            <span className="text-[10px] text-slate-400 block font-sans">Per ₹100 Invested</span>
          </div>
          <Award className="w-8 h-8 text-amber-400 shrink-0" />
        </div>
      </div>

      {/* Top Priority Highlighted Card */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#0F1E36] border-2 border-emerald-500/60 rounded-2xl p-6 shadow-2xl glow-green relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-mono font-extrabold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider">
          #1 HIGHEST ROI ACTION
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-xs font-mono font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                FIX FIRST
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                CVE-2026-48291
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white font-sans">
              Patch Payment Gateway Server (PAY-GW-PROD-01)
            </h2>
            <p className="text-xs text-slate-300 font-sans max-w-2xl">
              Applying patch KB-2026-901 reduces <span className="text-emerald-400 font-bold">₹1.45 Crore</span> of annualized risk exposure for an investment of only <span className="text-slate-200 font-bold">₹5.00 Lakh</span>.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-[#0B0F17] p-4 rounded-xl border border-slate-800 shrink-0">
            <div>
              <span className="text-[10px] font-mono text-slate-400 block">ROSI Return</span>
              <span className="text-2xl font-mono font-extrabold text-emerald-400">29.0x</span>
            </div>
            <button
              onClick={() => onSelectVulnerability(vulnerabilities[0])}
              className="px-3 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-md cursor-pointer"
            >
              Remediate Now
            </button>
          </div>
        </div>
      </div>

      {/* Remediation Ranking Table */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h3 className="text-base font-bold text-white font-sans mb-4">
          Complete ROI-Ranked Remediation Action Backlog
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Action Item</th>
                <th className="py-2.5 px-3">Target Asset</th>
                <th className="py-2.5 px-3 text-right">Cost</th>
                <th className="py-2.5 px-3 text-right">Risk Reduction</th>
                <th className="py-2.5 px-3 text-center">ROI Multiplier</th>
                <th className="py-2.5 px-3">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {rankedActions.map((item) => (
                <tr
                  key={item.rank}
                  className={`hover:bg-slate-800/40 transition-colors ${
                    item.isTop ? 'bg-emerald-950/10' : ''
                  }`}
                >
                  <td className="py-3 px-3 font-mono font-extrabold text-slate-300">
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 inline-flex items-center justify-center text-xs text-cyan-400">
                      #{item.rank}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-bold text-white font-sans">
                    {item.action}
                  </td>
                  <td className="py-3 px-3 font-mono text-cyan-400">{item.asset}</td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    {formatINR(item.cost)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-emerald-400">
                    {formatINR(item.riskReduction)}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-extrabold text-emerald-400 text-sm">
                    {item.roi}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${item.badgeColor}`}
                    >
                      {item.recommendation}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
