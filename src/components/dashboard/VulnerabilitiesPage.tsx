import React, { useState } from 'react';
import { Vulnerability } from '../../types';
import { formatINR } from '../../utils/formatters';
import {
  ShieldAlert,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  Flame,
  CheckCircle,
  XCircle,
  AlertOctagon,
  TrendingUp
} from 'lucide-react';

interface VulnerabilitiesPageProps {
  vulnerabilities: Vulnerability[];
  onSelectVulnerability: (vuln: Vulnerability) => void;
  globalSearchQuery: string;
}

export const VulnerabilitiesPage: React.FC<VulnerabilitiesPageProps> = ({
  vulnerabilities,
  onSelectVulnerability,
  globalSearchQuery,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'EAL' | 'ROSI' | 'CVSS'>('EAL');

  const activeSearch = searchQuery || globalSearchQuery;

  const filteredVulns = vulnerabilities
    .filter((v) => {
      const matchesSearch =
        v.cveId.toLowerCase().includes(activeSearch.toLowerCase()) ||
        v.title.toLowerCase().includes(activeSearch.toLowerCase()) ||
        v.assetName.toLowerCase().includes(activeSearch.toLowerCase());

      if (!matchesSearch) return false;

      if (activeFilter === 'CRITICAL') return v.severity === 'CRITICAL';
      if (activeFilter === 'HIGH') return v.severity === 'HIGH';
      if (activeFilter === 'KNOWN_EXPLOITED') return v.knownExploited;
      if (activeFilter === 'PATCH_AVAILABLE') return v.patchAvailable;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'EAL') return b.ealAmount - a.ealAmount;
      if (sortBy === 'ROSI') return b.rosiRatio - a.rosiRatio;
      if (sortBy === 'CVSS') return b.cvss - a.cvss;
      return 0;
    });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Badges */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
              Vulnerability Intelligence
            </h1>
            <p className="text-xs text-slate-400 font-sans mt-1">
              Technical vulnerabilities mapped to financial impact, threat signals, and ROSI
            </p>
          </div>

          {/* Severity Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs font-mono font-bold">
              Total: 247
            </span>
            <span className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-mono font-bold">
              Critical: 12
            </span>
            <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-mono font-bold">
              High: 46
            </span>
            <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
              Medium: 103
            </span>
            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 border border-slate-700 text-xs font-mono font-bold">
              Low: 86
            </span>
          </div>
        </div>
      </div>

      {/* Attack Likelihood Synthesis Section */}
      <div className="bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#0D1527] border border-amber-500/40 rounded-2xl p-5 shadow-xl glow-cyan">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              ORGANIZATION ATTACK LIKELIHOOD SYNTHESIS
            </span>
            <h3 className="text-lg font-bold text-white font-sans mt-0.5">
              72% High Likelihood of Exploitation
            </h3>
          </div>
          <div className="w-full md:w-64 bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
            <div className="bg-gradient-to-r from-amber-500 to-rose-500 h-full rounded-full" style={{ width: '72%' }}></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-4 text-xs font-mono">
          <div className="bg-[#0B0F17] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Technical Exploitability</span>
            <span className="text-rose-400 font-bold">+22%</span>
          </div>
          <div className="bg-[#0B0F17] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Exploit Available</span>
            <span className="text-amber-400 font-bold">+18%</span>
          </div>
          <div className="bg-[#0B0F17] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Active Threat Feed</span>
            <span className="text-rose-400 font-bold">+16%</span>
          </div>
          <div className="bg-[#0B0F17] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Internet Exposure</span>
            <span className="text-cyan-400 font-bold">+12%</span>
          </div>
          <div className="bg-[#0B0F17] p-2.5 rounded-lg border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Weak SIEM Baseline</span>
            <span className="text-purple-400 font-bold">+4%</span>
          </div>
        </div>
      </div>

      {/* Filter, Search & Sorting Controls */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search CVE, title, asset..."
            className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 font-sans"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {['ALL', 'CRITICAL', 'HIGH', 'KNOWN_EXPLOITED', 'PATCH_AVAILABLE'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                activeFilter === f
                  ? 'bg-blue-600 text-white'
                  : 'bg-[#0B0F17] text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {f.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Sort Select */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#0B0F17] border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 font-mono focus:outline-none"
          >
            <option value="EAL">Sort by Highest EAL</option>
            <option value="ROSI">Sort by Highest ROSI</option>
            <option value="CVSS">Sort by Highest CVSS</option>
          </select>
        </div>
      </div>

      {/* Vulnerabilities Table */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">CVE ID</th>
                <th className="py-2.5 px-3">Asset Target</th>
                <th className="py-2.5 px-3">CVSS</th>
                <th className="py-2.5 px-3">Exploit Status</th>
                <th className="py-2.5 px-3">Known Exploited</th>
                <th className="py-2.5 px-3">Patch</th>
                <th className="py-2.5 px-3 text-right">EAL (INR)</th>
                <th className="py-2.5 px-3 text-right">Cost</th>
                <th className="py-2.5 px-3 text-center">ROSI</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredVulns.map((v) => (
                <tr
                  key={v.id}
                  onClick={() => onSelectVulnerability(v)}
                  className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-mono font-bold text-cyan-400">
                    <span className="bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                      {v.cveId}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-white">{v.assetName}</p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 font-sans">{v.title}</p>
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded font-bold ${
                        v.cvss >= 9.0
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}
                    >
                      {v.cvss}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-300">
                    {v.exploitStatus}
                  </td>
                  <td className="py-3 px-3">
                    {v.knownExploited ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30 inline-flex items-center gap-1">
                        <Flame className="w-3 h-3" /> YES
                      </span>
                    ) : (
                      <span className="text-slate-500 font-mono text-[10px]">NO</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    {v.patchAvailable ? (
                      <span className="text-emerald-400 font-mono text-[11px] inline-flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Ready
                      </span>
                    ) : (
                      <span className="text-amber-400 font-mono text-[11px]">Mitigation Only</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-extrabold text-rose-400 text-sm">
                    {formatINR(v.ealAmount)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-300">
                    {formatINR(v.remediationCost)}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-extrabold text-emerald-400">
                    {v.rosiRatio}x
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVulnerability(v);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 font-mono text-[11px] font-bold cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Analyze</span>
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
