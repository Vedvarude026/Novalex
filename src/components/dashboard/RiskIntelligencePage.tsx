import React, { useState } from 'react';
import { Vulnerability } from '../../types';
import { formatINR, calculateEAL } from '../../utils/formatters';
import {
  BrainCircuit,
  Sliders,
  ShieldAlert,
  Server,
  Zap,
  CheckCircle,
  HelpCircle,
  BarChart2,
  Lock,
  Flame
} from 'lucide-react';

interface RiskIntelligencePageProps {
  vulnerabilities: Vulnerability[];
  onSelectVulnerability: (vuln: Vulnerability) => void;
}

export const RiskIntelligencePage: React.FC<RiskIntelligencePageProps> = ({
  vulnerabilities,
  onSelectVulnerability,
}) => {
  const [selectedVulnId, setSelectedVulnId] = useState<string>(vulnerabilities[0]?.id || '');
  
  // Interactive sliders state
  const currentVuln = vulnerabilities.find((v) => v.id === selectedVulnId) || vulnerabilities[0];
  
  const [cvss, setCvss] = useState<number>(currentVuln?.cvss || 9.8);
  const [assetValue, setAssetValue] = useState<number>(85000000); // ₹8.5 Cr
  const [likelihood, setLikelihood] = useState<number>(currentVuln?.attackLikelihood || 88);
  const [controlEffectiveness, setControlEffectiveness] = useState<number>(40); // 40%

  // Recalculated EAL
  const calculatedEAL = calculateEAL(likelihood, assetValue, controlEffectiveness);

  const handleSelectVuln = (id: string) => {
    setSelectedVulnId(id);
    const v = vulnerabilities.find((item) => item.id === id);
    if (v) {
      setCvss(v.cvss);
      setLikelihood(v.attackLikelihood);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[#282A30] border border-[#3A3D46] flex items-center justify-center text-[#FAF8F5]">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#FAF8F5] font-sans">
              Financial Risk Quantification Engine
            </h1>
            <p className="text-xs text-[#A0A5B1] font-sans">
              Transforming technical vulnerabilities into business financial impact.
            </p>
          </div>
        </div>

        {/* Equation Visualization Banner */}
        <div className="mt-4 p-4 rounded-xl bg-[#121315] border border-[#2C2F36] font-mono text-xs overflow-x-auto">
          <p className="text-[#A0A5B1] text-[10px] uppercase tracking-wider mb-1 font-sans">
            DIGILEX Quantitative Risk Formula
          </p>
          <div className="flex items-center gap-2 text-[#FAF8F5] whitespace-nowrap">
            <span className="font-extrabold text-rose-300 bg-rose-950/60 border border-rose-800/50 px-2 py-1 rounded">
              EXPECTED ANNUAL LOSS (EAL)
            </span>
            <span className="text-[#717682] font-bold">=</span>
            <span className="text-[#FAF8F5] font-bold">P(Exploitation)</span>
            <span className="text-[#717682]">×</span>
            <span className="text-emerald-300 font-bold">Asset Value at Risk</span>
            <span className="text-[#717682]">×</span>
            <span className="text-amber-300 font-bold">Loss Magnitude</span>
            <span className="text-[#717682]">×</span>
            <span className="text-purple-300 font-bold">(1 - Control Effectiveness)</span>
          </div>
        </div>
      </div>

      {/* Vulnerability Selector Selector Bar */}
      <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-1/2">
          <label className="text-xs font-mono font-bold text-[#FAF8F5] uppercase block mb-1">
            Select Target Vulnerability
          </label>
          <select
            value={selectedVulnId}
            onChange={(e) => handleSelectVuln(e.target.value)}
            className="w-full bg-[#121315] border border-[#2C2F36] rounded-lg px-3 py-2 text-xs text-[#FAF8F5] font-mono focus:border-[#FAF8F5] focus:outline-none"
          >
            {vulnerabilities.map((v) => (
              <option key={v.id} value={v.id}>
                {v.cveId} - {v.assetName} (EAL: {formatINR(v.ealAmount)})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onSelectVulnerability(currentVuln)}
            className="px-3 py-2 rounded-lg bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#121214] text-xs font-bold transition-all cursor-pointer"
          >
            Full Deep Analysis
          </button>
        </div>
      </div>

      {/* Interactive Risk Parameters Grid (4 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: TECHNICAL EXPOSURE */}
        <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-[#FAF8F5] font-bold text-xs font-sans pb-2 border-b border-[#2C2F36]">
            <Flame className="w-4 h-4" />
            <span>TECHNICAL EXPOSURE</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#FAF8F5]">
              <span>CVSS v3.1 Score</span>
              <span className="text-rose-300 font-bold">{cvss}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="10.0"
              step="0.1"
              value={cvss}
              onChange={(e) => setCvss(parseFloat(e.target.value))}
              className="w-full accent-rose-400"
            />
            <div className="text-[10px] text-[#A0A5B1] space-y-1 font-sans">
              <div className="flex justify-between">
                <span>Exploit Availability:</span>
                <span className="text-[#FAF8F5] font-mono">Functional PoC</span>
              </div>
              <div className="flex justify-between">
                <span>Remote Exploitability:</span>
                <span className="text-rose-300 font-mono">Network / Unauth</span>
              </div>
              <div className="flex justify-between">
                <span>Attack Complexity:</span>
                <span className="text-emerald-300 font-mono">Low</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: ASSET CRITICALITY */}
        <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-[#FAF8F5] font-bold text-xs font-sans pb-2 border-b border-[#2C2F36]">
            <Server className="w-4 h-4" />
            <span>ASSET CRITICALITY</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#FAF8F5]">
              <span>Value at Risk</span>
              <span className="text-emerald-300 font-bold">{formatINR(assetValue)}</span>
            </div>
            <input
              type="range"
              min="5000000"
              max="200000000"
              step="5000000"
              value={assetValue}
              onChange={(e) => setAssetValue(parseInt(e.target.value))}
              className="w-full accent-emerald-400"
            />
            <div className="text-[10px] text-[#A0A5B1] space-y-1 font-sans">
              <div className="flex justify-between">
                <span>Business Function:</span>
                <span className="text-[#FAF8F5] font-mono">Core Payments</span>
              </div>
              <div className="flex justify-between">
                <span>Data Classification:</span>
                <span className="text-rose-300 font-mono">PCI-DSS / Confidential</span>
              </div>
              <div className="flex justify-between">
                <span>Revenue Dependency:</span>
                <span className="text-amber-300 font-mono">Critical (98%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3: THREAT ACTIVITY */}
        <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-[#FAF8F5] font-bold text-xs font-sans pb-2 border-b border-[#2C2F36]">
            <Zap className="w-4 h-4" />
            <span>THREAT ACTIVITY</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#FAF8F5]">
              <span>Attack Likelihood</span>
              <span className="text-amber-300 font-bold">{likelihood}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="99"
              value={likelihood}
              onChange={(e) => setLikelihood(parseInt(e.target.value))}
              className="w-full accent-amber-400"
            />
            <div className="text-[10px] text-[#A0A5B1] space-y-1 font-sans">
              <div className="flex justify-between">
                <span>Known Exploited:</span>
                <span className="text-rose-300 font-mono">CISA KEV Listed</span>
              </div>
              <div className="flex justify-between">
                <span>Actor Activity:</span>
                <span className="text-amber-300 font-mono">APT-44 Active</span>
              </div>
              <div className="flex justify-between">
                <span>Industry Targeting:</span>
                <span className="text-rose-300 font-mono">High (BFSI)</span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: CONTROL EFFECTIVENESS */}
        <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-[#FAF8F5] font-bold text-xs font-sans pb-2 border-b border-[#2C2F36]">
            <Lock className="w-4 h-4" />
            <span>CONTROL EFFECTIVENESS</span>
          </div>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-[#FAF8F5]">
              <span>Mitigation Level</span>
              <span className="text-purple-300 font-bold">{controlEffectiveness}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="95"
              value={controlEffectiveness}
              onChange={(e) => setControlEffectiveness(parseInt(e.target.value))}
              className="w-full accent-purple-400"
            />
            <div className="text-[10px] text-[#A0A5B1] space-y-1 font-sans">
              <div className="flex justify-between">
                <span>MFA Status:</span>
                <span className="text-[#FAF8F5] font-mono">Enforced Admin</span>
              </div>
              <div className="flex justify-between">
                <span>EDR Agent:</span>
                <span className="text-emerald-300 font-mono">Active Monitoring</span>
              </div>
              <div className="flex justify-between">
                <span>Network Segment:</span>
                <span className="text-amber-300 font-mono">Partial DMZ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CALCULATED FINANCIAL IMPACT RESULT BOX */}
      <div className="bg-[#18191C] border-2 border-rose-500/40 rounded-2xl p-6 shadow-2xl glow-red">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
              QUANTIFIED EXPECTED ANNUAL LOSS (EAL)
            </span>
            <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-[#FAF8F5] mt-2 tracking-tight">
              {formatINR(calculatedEAL)}
            </h2>
            <p className="text-xs text-[#A0A5B1] mt-1 font-sans">
              Calculated annualized financial risk for {currentVuln?.assetName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-[#121315] p-4 rounded-xl border border-[#2C2F36]">
            <div>
              <span className="text-[10px] font-mono text-[#A0A5B1] block">Calculation Confidence</span>
              <span className="text-lg font-mono font-bold text-[#FAF8F5]">87% High</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#A0A5B1] block">Risk Category</span>
              <span className="text-lg font-mono font-bold text-rose-300">CRITICAL</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
