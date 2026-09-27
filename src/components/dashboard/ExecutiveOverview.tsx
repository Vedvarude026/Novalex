import React from 'react';
import { Vulnerability, PageView } from '../../types';
import { formatINR } from '../../utils/formatters';
import { SECTOR_RISK_DATA, RISK_TRAJECTORY_DATA } from '../../data/mockData';
import {
  TrendingUp,
  AlertTriangle,
  Zap,
  PiggyBank,
  ArrowUpRight,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell
} from 'recharts';

interface ExecutiveOverviewProps {
  vulnerabilities: Vulnerability[];
  setActivePage: (page: PageView) => void;
  onSelectVulnerability: (vuln: Vulnerability) => void;
  onOpenCopilot: () => void;
}

export const ExecutiveOverview: React.FC<ExecutiveOverviewProps> = ({
  vulnerabilities,
  setActivePage,
  onSelectVulnerability,
  onOpenCopilot,
}) => {
  const topPriorities = vulnerabilities.slice(0, 3);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner Greeting & Timestamp */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#18191C] border border-[#2C2F36] rounded-2xl p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-[#FAF8F5] bg-[#222429] border border-[#3A3D46] px-2 py-0.5 rounded">
              FINANCIAL RISK INTELLIGENCE
            </span>
            <span className="text-xs text-[#A0A5B1] font-mono">Acme Financial Services</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#FAF8F5] tracking-tight font-sans">
            Good evening, Security Team
          </h1>
          <p className="text-xs sm:text-sm text-[#A0A5B1] mt-1 font-sans">
            Here is your organization's quantified cyber risk posture and financial exposure.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right sm:border-l sm:border-[#2C2F36] sm:pl-4">
            <p className="text-[10px] text-[#A0A5B1] uppercase font-mono tracking-wider">
              Last Risk Calculation
            </p>
            <p className="text-xs font-mono font-bold text-[#FAF8F5] mt-0.5">
              26 Sep 2026, 21:42 IST
            </p>
          </div>
          <button
            onClick={onOpenCopilot}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#121214] text-xs font-bold transition-all shadow-md cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#121214] animate-pulse" />
            <span>Ask AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Cards Grid (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: TOTAL EXPECTED ANNUAL LOSS */}
        <div className="bg-[#18191C] border border-[#2C2F36] hover:border-[#3A3D46] rounded-2xl p-4 shadow-xl transition-all duration-200 glow-red">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-semibold text-[#A0A5B1] uppercase tracking-wider">
              Total Expected Annual Loss
            </span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-300">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#FAF8F5] tracking-tight">
              ₹4.82 Cr
            </span>
            <span className="text-xs font-mono font-bold text-rose-400 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" />
              8.4%
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#2C2F36] flex items-center justify-between">
            <span className="text-[10px] text-[#A0A5B1] font-sans">Status</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              CRITICAL EXPOSURE
            </span>
          </div>
        </div>

        {/* CARD 2: TOP RISK DRIVER */}
        <div className="bg-[#18191C] border border-[#2C2F36] hover:border-[#3A3D46] rounded-2xl p-4 shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-semibold text-[#A0A5B1] uppercase tracking-wider">
              Top Risk Driver
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#282A30] border border-[#3A3D46] flex items-center justify-center text-[#FAF8F5]">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <p className="text-sm font-bold text-[#FAF8F5] truncate font-sans">
            Payment Gateway Server
          </p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-lg font-mono font-bold text-[#FAF8F5]">
              ₹1.92 Cr<span className="text-xs text-[#A0A5B1] font-sans">/yr</span>
            </span>
            <span className="text-[10px] font-mono bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded">
              CVSS 9.8
            </span>
          </div>
          <div className="mt-3 pt-2.5 border-t border-[#2C2F36] flex items-center justify-between">
            <span className="text-[10px] text-[#A0A5B1] font-mono">CVE-2026-48291</span>
            <button
              onClick={() => onSelectVulnerability(vulnerabilities[0])}
              className="text-[10px] text-[#FAF8F5] hover:underline font-bold flex items-center gap-0.5 cursor-pointer"
            >
              Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* CARD 3: OPTIMIZABLE RISK */}
        <div className="bg-[#18191C] border border-[#2C2F36] hover:border-[#3A3D46] rounded-2xl p-4 shadow-xl transition-all duration-200 glow-green">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-semibold text-[#A0A5B1] uppercase tracking-wider">
              Optimizable Risk
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-300">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-300 tracking-tight">
              ₹2.76 Cr
            </span>
          </div>
          <p className="text-[11px] text-[#A0A5B1] mt-1 font-sans">
            Reducible within current security budget
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#2C2F36] flex items-center justify-between">
            <span className="text-[10px] text-[#A0A5B1]">Optimization Efficiency</span>
            <span className="text-[10px] font-mono font-bold text-emerald-300">57.2%</span>
          </div>
        </div>

        {/* CARD 4: CURRENT SECURITY BUDGET */}
        <div className="bg-[#18191C] border border-[#2C2F36] hover:border-[#3A3D46] rounded-2xl p-4 shadow-xl transition-all duration-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono font-semibold text-[#A0A5B1] uppercase tracking-wider">
              Current Security Budget
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#282A30] border border-[#3A3D46] flex items-center justify-center text-[#FAF8F5]">
              <PiggyBank className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl sm:text-3xl font-mono font-extrabold text-[#FAF8F5] tracking-tight">
              ₹50.00 L
            </span>
          </div>
          <p className="text-[11px] text-[#FAF8F5] mt-1 font-sans font-medium">
            Potential optimized reduction: <span className="font-mono font-bold text-emerald-300">₹1.84 Cr</span>
          </p>
          <div className="mt-3 pt-2.5 border-t border-[#2C2F36] flex items-center justify-between">
            <span className="text-[10px] text-[#A0A5B1]">Knapsack ROSI</span>
            <button
              onClick={() => setActivePage('fund-optimizer')}
              className="text-[10px] font-mono font-bold text-[#FAF8F5] hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Open Optimizer <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Multi-Chart Executive View */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT CHART: Cyber Risk Trajectory */}
        <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#FAF8F5] font-sans">
                Cyber Risk Trajectory
              </h3>
              <p className="text-xs text-[#A0A5B1] font-sans">
                Projected organizational exposure over 90 days (Expected Annual Loss in ₹ Cr)
              </p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-[#A0A5B1]">No Remediation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FAF8F5]"></span>
                <span className="text-[#A0A5B1]">Prioritized Remediation</span>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={RISK_TRAJECTORY_DATA} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2F36" vertical={false} />
                <XAxis dataKey="day" stroke="#8A8F9B" tick={{ fontSize: 11, fill: '#A0A5B1' }} />
                <YAxis
                  stroke="#8A8F9B"
                  tick={{ fontSize: 11, fill: '#A0A5B1' }}
                  tickFormatter={(val) => `₹${val}Cr`}
                  domain={[2, 7]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16171A',
                    borderColor: '#3A3D46',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                    color: '#FAF8F5'
                  }}
                  formatter={(value: any, name: any) => [
                    `₹${value} Cr`,
                    name === 'unpatched' ? 'Unpatched Exposure' : 'Optimized Exposure'
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="unpatched"
                  stroke="#E55353"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#E55353' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="optimized"
                  stroke="#FAF8F5"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#FAF8F5' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RIGHT CHART: Risk Exposure by Business Sector */}
        <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-5 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-[#FAF8F5] font-sans">
                Risk Exposure by Business Sector
              </h3>
              <p className="text-xs text-[#A0A5B1] font-sans">
                Financial risk concentration ranked by sector EAL
              </p>
            </div>
            <span className="text-xs font-mono text-[#FAF8F5] font-semibold bg-[#282A30] border border-[#3A3D46] px-2 py-0.5 rounded">
              Total ₹4.82 Cr
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={SECTOR_RISK_DATA}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2C2F36" horizontal={false} />
                <XAxis type="number" stroke="#8A8F9B" tickFormatter={(val) => `₹${val}Cr`} tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" stroke="#A0A5B1" tick={{ fontSize: 11 }} width={110} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#16171A',
                    borderColor: '#3A3D46',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                    color: '#FAF8F5'
                  }}
                  formatter={(value: any) => [`₹${value} Cr`, 'Sector EAL']}
                />
                <Bar dataKey="ealCr" radius={[0, 6, 6, 0]}>
                  {SECTOR_RISK_DATA.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? '#E55353'
                          : index === 1
                          ? '#FAF8F5'
                          : index === 2
                          ? '#B2B7C2'
                          : '#717682'
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TOP RISK PRIORITIES TABLE */}
      <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-[#FAF8F5] font-sans flex items-center gap-2">
              Highest Financial Risk Exposure
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Action Required
              </span>
            </h3>
            <p className="text-xs text-[#A0A5B1] font-sans">
              Vulnerabilities ranked by Expected Annual Loss and Return on Security Investment (ROSI)
            </p>
          </div>
          <button
            onClick={() => setActivePage('vulnerabilities')}
            className="text-xs text-[#FAF8F5] hover:underline font-bold flex items-center gap-1 cursor-pointer"
          >
            View All 247 Vulnerabilities <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2C2F36] text-[11px] font-mono uppercase text-[#A0A5B1]">
                <th className="py-2.5 px-3 whitespace-nowrap">Priority</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Asset</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Vulnerability</th>
                <th className="py-2.5 px-3 whitespace-nowrap">CVSS</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Likelihood</th>
                <th className="py-2.5 px-3 text-right whitespace-nowrap">EAL</th>
                <th className="py-2.5 px-3 text-right whitespace-nowrap">Cost</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">ROSI</th>
                <th className="py-2.5 px-3 whitespace-nowrap">Recommended Action</th>
                <th className="py-2.5 px-3 text-right whitespace-nowrap">Analysis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C2F36] text-xs">
              {topPriorities.map((vuln) => (
                <tr
                  key={vuln.id}
                  className="hover:bg-[#222429] transition-colors group cursor-pointer"
                  onClick={() => onSelectVulnerability(vuln)}
                >
                  <td className="py-3 px-3 font-mono font-bold text-[#A0A5B1] whitespace-nowrap">
                    <span className="w-6 h-6 rounded-full bg-[#121315] border border-[#2C2F36] inline-flex items-center justify-center text-xs text-rose-300">
                      #{vuln.priorityRank}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-bold text-[#FAF8F5] whitespace-nowrap">{vuln.assetName}</div>
                    <div className="text-[10px] font-mono text-[#A0A5B1] whitespace-nowrap">{vuln.businessSector}</div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[#FAF8F5] bg-[#222429] border border-[#3A3D46] px-1.5 py-0.5 rounded text-[11px] font-bold shrink-0">
                        {vuln.cveId}
                      </span>
                      <span className="text-[#A0A5B1] line-clamp-1">{vuln.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {vuln.cvss}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[#A0A5B1] whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <div className="w-12 bg-[#121315] rounded-full h-1.5 overflow-hidden shrink-0">
                        <div
                          className="bg-rose-400 h-full rounded-full"
                          style={{ width: `${vuln.attackLikelihood}%` }}
                        ></div>
                      </div>
                      <span className="text-[11px] tabular-nums">{vuln.attackLikelihood}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-extrabold text-rose-300 text-sm whitespace-nowrap tabular-nums">
                    {formatINR(vuln.ealAmount)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-[#FAF8F5] text-xs whitespace-nowrap tabular-nums">
                    {formatINR(vuln.remediationCost)}
                  </td>
                  <td className="py-3 px-3 text-center whitespace-nowrap">
                    <span className="font-mono font-extrabold text-emerald-300 bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded inline-block text-xs tabular-nums">
                      {vuln.rosiRatio}x
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-[#FAF8F5] whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-[#222429] text-[#FAF8F5] border border-[#3A3D46] text-[11px]">
                      {vuln.recommendedAction}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVulnerability(vuln);
                      }}
                      className="px-2.5 py-1 rounded bg-[#2A2C32] hover:bg-[#383B42] text-[#FAF8F5] text-[11px] font-mono font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
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
