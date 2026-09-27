import React, { useState } from 'react';
import { COMPLIANCE_ITEMS } from '../../data/mockData';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  Filter,
  ShieldAlert,
  ArrowUpRight
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
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2.5">
            <FileCheck className="w-5 h-5 text-blue-400 shrink-0" />
            <span>Compliance Intelligence</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Multi-Standard Mapping
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Automated mapping of financial cyber risk findings to regulatory compliance frameworks
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0B0F17] border border-slate-800 rounded-xl px-3 py-2 shrink-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-xs font-mono text-slate-400 font-medium">Filter:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-transparent text-xs text-slate-200 font-mono focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-[#111827] text-white">All Control Statuses</option>
            <option value="Needs Attention" className="bg-[#111827] text-white">Needs Attention</option>
            <option value="In Progress" className="bg-[#111827] text-white">In Progress</option>
            <option value="Compliant" className="bg-[#111827] text-white">Compliant</option>
          </select>
        </div>
      </div>

      {/* Compliance Score Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex justify-between items-center shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono text-slate-300 font-bold">
                ISO 27001:2022
              </span>
            </div>
            <span className="text-2xl font-mono font-extrabold text-emerald-400 block tracking-tight">
              82%
            </span>
            <span className="text-[11px] text-slate-400 font-sans block">18 of 22 Controls Passed</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-mono font-extrabold text-sm shadow-inner">
            82%
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex justify-between items-center shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono text-slate-300 font-bold">
                NIST CSF 2.0
              </span>
            </div>
            <span className="text-2xl font-mono font-extrabold text-cyan-400 block tracking-tight">
              76%
            </span>
            <span className="text-[11px] text-slate-400 font-sans block">Core Functions Aligned</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-mono font-extrabold text-sm shadow-inner">
            76%
          </div>
        </div>

        <div className="bg-[#111827] border border-slate-800/80 rounded-2xl p-4 flex justify-between items-center shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-mono text-slate-300 font-bold">
                CERT-In Directions 2022
              </span>
            </div>
            <span className="text-2xl font-mono font-extrabold text-blue-400 block tracking-tight">
              91%
            </span>
            <span className="text-[11px] text-slate-400 font-sans block">Log Mandate Compliant</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-mono font-extrabold text-sm shadow-inner">
            91%
          </div>
        </div>
      </div>

      {/* Compliance Mapping Table */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse align-middle">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 align-middle whitespace-nowrap">Security Finding</th>
                <th className="py-3.5 px-4 align-middle">Control Gap</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap text-center">ISO 27001</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap text-center">NIST CSF</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap text-center">CERT-In</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap text-center">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 align-middle font-bold text-white whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{item.finding}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 align-middle text-slate-300 font-sans text-xs leading-snug">
                    {item.controlGap}
                  </td>
                  <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap font-mono">
                    <span className="bg-cyan-950/50 border border-cyan-800/50 text-cyan-300 px-2.5 py-1 rounded-md text-[11px] font-bold inline-block">
                      {item.iso27001}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap font-mono">
                    <span className="bg-blue-950/50 border border-blue-800/50 text-blue-300 px-2.5 py-1 rounded-md text-[11px] font-bold inline-block">
                      {item.nistCsf}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap font-mono">
                    <span className="bg-purple-950/50 border border-purple-800/50 text-purple-300 px-2.5 py-1 rounded-md text-[11px] font-bold inline-block">
                      {item.certIn}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 align-middle text-center whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-md font-mono text-[11px] font-bold ${
                        item.status === 'Needs Attention'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : item.status === 'In Progress'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {item.status === 'Needs Attention' && <AlertCircle className="w-3 h-3 text-rose-400" />}
                      {item.status === 'In Progress' && <Clock className="w-3 h-3 text-amber-400" />}
                      {item.status === 'Compliant' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                      <span>{item.status}</span>
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

