import React from 'react';
import { INITIAL_AUDIT_LOGS } from '../../data/mockData';
import { History, ShieldCheck, CheckCircle2, Lock, Hash } from 'lucide-react';

export const AuditTrailPage: React.FC = () => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
            Immutable Audit Trail
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Integrity Verified
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Cryptographically stamped security decisions, risk recalculations, and budget approvals
          </p>
        </div>
      </div>

      {/* Verification Summary Banner */}
      <div className="bg-[#0F172A] border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-between glow-green">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="text-xs font-bold text-white font-sans">
              Cryptographic Ledger Integrity Active
            </p>
            <p className="text-[10px] text-slate-400 font-mono">
              SHA256 Merkle tree verification passing. Zero tampering detected across 1,420 events.
            </p>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-mono uppercase text-slate-400">
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">User</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Target Object</th>
                <th className="py-2.5 px-3">State Change</th>
                <th className="py-2.5 px-3">SHA256 Hash</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-mono">
              {INITIAL_AUDIT_LOGS.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 text-slate-300 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-3 font-bold text-cyan-400">{log.user}</td>
                  <td className="py-3 px-3 text-white font-sans font-semibold">{log.action}</td>
                  <td className="py-3 px-3 text-slate-300 font-sans">{log.object}</td>
                  <td className="py-3 px-3 text-[11px]">
                    <span className="text-slate-500">{log.previousState}</span>
                    <span className="text-slate-400 mx-1">→</span>
                    <span className="text-emerald-400 font-bold">{log.newState}</span>
                  </td>
                  <td className="py-3 px-3 text-[10px] text-slate-400 truncate max-w-[140px]" title={log.eventHash}>
                    {log.eventHash}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ✓ {log.status}
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
