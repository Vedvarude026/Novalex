import React, { useState } from 'react';
import { COMPLIANCE_ITEMS } from '../../data/mockData';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter
} from 'lucide-react';

export const CompliancePage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const filteredItems = COMPLIANCE_ITEMS.filter((item) => {
    if (selectedStatus === 'ALL') return true;
    return item.status === selectedStatus;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
          Compliance Intelligence
          <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            Multi-Standard Mapping
          </span>
        </h1>
        <p className="text-xs text-slate-400 font-sans mt-1">
          Automated mapping of financial cyber risk findings to regulatory compliance frameworks
        </p>
      </div>

      {/* Compliance Score Cards (ISO 27001, NIST CSF, CERT-In) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono text-slate-400 font-bold block">
              ISO 27001:2022
            </span>
            <span className="text-2xl font-mono font-extrabold text-emerald-400 mt-1 block">
              82%
            </span>
            <span className="text-[10px] text-slate-400 font-sans">18 / 22 Controls Passed</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
            82%
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono text-slate-400 font-bold block">
              NIST CSF 2.0
            </span>
            <span className="text-2xl font-mono font-extrabold text-cyan-400 mt-1 block">
              76%
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Core Functions Aligned</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
            76%
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800 rounded-2xl p-4 flex justify-between items-center">
          <div>
            <span className="text-xs font-mono text-slate-400 font-bold block">
              CERT-In Directions 2022
            </span>
            <span className="text-2xl font-mono font-extrabold text-blue-400 mt-1 block">
              91%
            </span>
            <span className="text-[10px] text-slate-400 font-sans">Log Mandate Compliant</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-bold text-xs">
            91%
          </div>
        </div>
      </div>

      {/* Table Filters */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-4 flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-slate-300">Filter Controls</span>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-[#0B0F17] border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono focus:outline-none"
        >
          <option value="ALL">All Statuses</option>
          <option value="Needs Attention">Needs Attention</option>
          <option value="In Progress">In Progress</option>
          <option value="Compliant">Compliant</option>
        </select>
      </div>

      {/* Compliance Mapping Table */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">Security Finding</th>
                <th className="py-2.5 px-3">Control Gap</th>
                <th className="py-2.5 px-3">ISO 27001</th>
                <th className="py-2.5 px-3">NIST CSF</th>
                <th className="py-2.5 px-3">CERT-In</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-bold text-white">{item.finding}</td>
                  <td className="py-3 px-3 text-slate-300">{item.controlGap}</td>
                  <td className="py-3 px-3 font-mono text-cyan-400">{item.iso27001}</td>
                  <td className="py-3 px-3 font-mono text-blue-400">{item.nistCsf}</td>
                  <td className="py-3 px-3 font-mono text-purple-400">{item.certIn}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.status === 'Needs Attention'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : item.status === 'In Progress'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      }`}
                    >
                      {item.status}
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
