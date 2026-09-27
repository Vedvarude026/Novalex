import React from 'react';
import { RISK_TRAJECTORY_DATA } from '../../data/mockData';
import {
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const ForecastingPage: React.FC = () => {
  const forecastDrivers = [
    { name: 'Unpatched Critical CVE (CVE-2026-48291)', contribution: '+₹1.92 Cr', type: 'Negative' },
    { name: 'Active Exploit Campaign (APT-44)', contribution: '+₹82 L', type: 'Negative' },
    { name: 'Direct Internet Facing Endpoint Exposure', contribution: '+₹45 L', type: 'Negative' },
    { name: 'Patch Window Window Delay (>30 Days)', contribution: '+₹28 L', type: 'Negative' },
    { name: 'Knapsack Optimized Patch Deployment', contribution: '-₹1.84 Cr', type: 'Positive' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
          Cyber Risk Trajectory Forecast
          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            90-Day Financial Projections
          </span>
        </h1>
        <p className="text-xs text-slate-400 font-sans mt-1">
          Predicting organizational financial loss trajectory based on patch timing and threat feeds
        </p>
      </div>

      {/* Projection Cards Bar (30 / 60 / 90 Days) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-mono text-slate-400 font-bold block uppercase">
            30-Day Forecast
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-rose-400 font-mono font-extrabold text-lg">₹5.12 Cr</span>
            <span className="text-emerald-400 font-mono font-bold text-sm">vs ₹4.01 Cr</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">No Fix vs Prioritized Remediation</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-mono text-slate-400 font-bold block uppercase">
            60-Day Forecast
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-rose-400 font-mono font-extrabold text-lg">₹5.74 Cr</span>
            <span className="text-emerald-400 font-mono font-bold text-sm">vs ₹3.48 Cr</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">No Fix vs Prioritized Remediation</p>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-mono text-slate-400 font-bold block uppercase">
            90-Day Forecast
          </span>
          <div className="flex items-baseline justify-between">
            <span className="text-rose-400 font-mono font-extrabold text-lg">₹6.45 Cr</span>
            <span className="text-emerald-400 font-mono font-bold text-sm">vs ₹2.91 Cr</span>
          </div>
          <p className="text-[10px] text-slate-400 font-sans">No Fix vs Prioritized Remediation</p>
        </div>
      </div>

      {/* Area Trajectory Chart */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h3 className="text-base font-bold text-white font-sans mb-4">
          Visualizing the Remediation Divergence
        </h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={RISK_TRAJECTORY_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUnpatched" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorOptimized" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="#64748B" tick={{ fontSize: 11 }} />
              <YAxis stroke="#64748B" tickFormatter={(v) => `₹${v}Cr`} tick={{ fontSize: 11 }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '0.75rem'
                }}
              />
              <Area
                type="monotone"
                dataKey="unpatched"
                stroke="#EF4444"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUnpatched)"
              />
              <Area
                type="monotone"
                dataKey="optimized"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorOptimized)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forecast Drivers Breakdown */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h3 className="text-base font-bold text-white font-sans mb-3">
          Key Risk Trajectory Drivers
        </h3>
        <div className="space-y-2">
          {forecastDrivers.map((driver, idx) => (
            <div
              key={idx}
              className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs"
            >
              <span className="font-semibold text-slate-200">{driver.name}</span>
              <span
                className={`font-mono font-bold px-2 py-0.5 rounded ${
                  driver.type === 'Negative'
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {driver.contribution}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
