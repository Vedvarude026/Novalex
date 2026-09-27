import React from 'react';
import { THREAT_ALERTS } from '../../data/mockData';
import { formatINR } from '../../utils/formatters';
import { Radio, ShieldAlert, Zap, ExternalLink, Globe, AlertTriangle } from 'lucide-react';

interface ThreatIntelPageProps {
  onOpenCopilot: () => void;
}

export const ThreatIntelPage: React.FC<ThreatIntelPageProps> = ({ onOpenCopilot }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
            Threat Intelligence & Active Campaigns
            <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              LIVE Threat Feeds
            </span>
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Real-time threat actor tracking mapped directly to organization EAL exposure
          </p>
        </div>
      </div>

      {/* Threat Feeds Grid */}
      <div className="space-y-4">
        {THREAT_ALERTS.map((alert) => (
          <div
            key={alert.id}
            className="bg-gradient-to-r from-[#0F172A] via-[#111827] to-[#1A1022] border border-rose-500/40 rounded-2xl p-5 shadow-xl glow-red"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  {alert.category}
                </span>
                <span className="text-xs font-mono text-cyan-400 font-bold">{alert.threatActor}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">{alert.publishedDate}</span>
            </div>

            <div className="mt-3 space-y-2">
              <h3 className="text-base font-bold text-white font-sans">{alert.title}</h3>
              <p className="text-xs text-slate-300 font-sans">{alert.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Affected Assets:</span>
                  <span className="font-mono font-bold text-rose-400">{alert.affectedAssetsCount} Servers</span>
                </div>
                <div className="bg-[#0B0F17] p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-400">Potential EAL Exposure:</span>
                  <span className="font-mono font-extrabold text-rose-400 text-sm">
                    {formatINR(alert.potentialEalExposure)}
                  </span>
                </div>
              </div>

              <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-[11px] font-mono text-amber-300">
                  <span className="text-slate-400">Mitigation:</span> {alert.mitigation}
                </p>
                <button
                  onClick={onOpenCopilot}
                  className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shrink-0"
                >
                  Analyze Exposure
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
