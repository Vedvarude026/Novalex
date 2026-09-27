import React from 'react';
import { INITIAL_AUDIT_LOGS } from '../../data/mockData';
import { History, ShieldCheck, CheckCircle2, Lock, Hash, ArrowRight } from 'lucide-react';

export const AuditTrailPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2.5">
            <History className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Immutable Audit Trail</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Integrity Verified
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Cryptographically stamped security decisions, risk recalculations, and budget approvals
          </p>
        </div>
      </div>

      {/* Verification Summary Banner */}
      <div className="bg-[#0F172A] border border-emerald-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-white font-sans flex items-center gap-2">
              <span>Cryptographic Ledger Integrity Active</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">SHA-256 Merkle</span>
            </p>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              Merkle tree verification passing • Zero tampering detected across 1,420 recorded events.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg shrink-0">
          <Lock className="w-3.5 h-3.5" />
          <span className="font-bold">100% Tamper-Proof</span>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse align-middle">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400">
                <th className="py-3.5 px-4 align-middle whitespace-nowrap">Timestamp</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap">User</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap">Action Taken</th>
                <th className="py-3.5 px-4 align-middle">Target Object</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap">State Transition</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap">SHA256 Hash</th>
                <th className="py-3.5 px-4 align-middle whitespace-nowrap text-right">Ledger Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {INITIAL_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 align-middle text-slate-300 whitespace-nowrap font-mono text-xs">
                    <span className="bg-slate-800/60 border border-slate-700/60 px-2 py-1 rounded text-[11px] inline-block">
                      {log.timestamp}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 align-middle whitespace-nowrap font-bold text-cyan-400">
                    <span className="bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-md text-[11px]">
                      {log.user}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 align-middle text-white font-sans font-semibold text-xs whitespace-nowrap">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4 align-middle text-slate-300 font-sans text-xs">
                    <span className="line-clamp-1">{log.object}</span>
                  </td>
                  <td className="py-3.5 px-4 align-middle whitespace-nowrap text-[11px]">
                    <div className="inline-flex items-center gap-1.5 bg-slate-800/40 border border-slate-800 px-2.5 py-1 rounded-md">
                      <span className="text-slate-400 line-through text-[10px]">{log.previousState}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500" />
                      <span className="text-emerald-400 font-bold">{log.newState}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 align-middle whitespace-nowrap">
                    <div className="inline-flex items-center gap-1 bg-[#0B0F17] border border-slate-800 px-2 py-1 rounded text-[10px] text-slate-400 font-mono" title={log.eventHash}>
                      <Hash className="w-3 h-3 text-slate-500 shrink-0" />
                      <span className="truncate max-w-[120px]">{log.eventHash}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 align-middle text-right whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1 justify-center">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{log.status}</span>
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

