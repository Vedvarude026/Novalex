import React, { useState } from 'react';
import {
  X,
  FileSpreadsheet,
  CheckCircle2,
  Download,
  Printer,
  RefreshCw
} from 'lucide-react';
import { DigilexLogo } from '../common/DigilexLogo';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose }) => {
  const [incSummary, setIncSummary] = useState(true);
  const [incTopRisks, setIncTopRisks] = useState(true);
  const [incOptimizer, setIncOptimizer] = useState(true);
  const [incForecasting, setIncForecasting] = useState(true);
  const [incCompliance, setIncCompliance] = useState(true);
  const [incAudit, setIncAudit] = useState(true);

  const [isCompiling, setIsCompiling] = useState(false);
  const [compileSuccess, setCompileSuccess] = useState(false);

  if (!isOpen) return null;

  const handleGeneratePDF = () => {
    setIsCompiling(true);
    setCompileSuccess(false);

    setTimeout(() => {
      setIsCompiling(false);
      setCompileSuccess(true);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#16171A] border border-[#2C2F36] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative space-y-5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#A0A5B1] hover:text-[#FAF8F5] p-1.5 rounded-lg bg-[#222429] hover:bg-[#2C2F36] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with New Logo */}
        <div className="flex items-center justify-between border-b border-[#2C2F36] pb-4 pr-8">
          <DigilexLogo size="lg" showText={true} showTagline={true} />
          <div className="hidden sm:block text-right">
            <span className="text-[10px] font-mono text-[#FAF8F5] bg-[#222429] px-2 py-1 rounded border border-[#2C2F36]">
              CONFIDENTIAL REPORT
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-base font-bold text-[#FAF8F5] font-sans">
            Executive Risk Intelligence Report Generator
          </h2>
          <p className="text-xs text-[#A0A5B1] font-sans mt-0.5">
            Compile board-grade quantified cyber risk intelligence for Acme Financial Services
          </p>
        </div>

        {/* Checkbox Options */}
        <div className="space-y-3">
          <label className="text-xs font-mono font-bold text-[#A0A5B1] uppercase block">
            Select Sections to Include
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
            {[
              { label: 'Executive Risk Summary & Total EAL', state: incSummary, set: setIncSummary },
              { label: 'Top Risk Drivers & Vulnerability Ranking', state: incTopRisks, set: setIncTopRisks },
              { label: '0/1 Knapsack Budget Optimization', state: incOptimizer, set: setIncOptimizer },
              { label: '30 / 60 / 90 Day Risk Forecasting', state: incForecasting, set: setIncForecasting },
              { label: 'Regulatory Compliance Mapping', state: incCompliance, set: setIncCompliance },
              { label: 'Immutable Audit Ledger Evidence', state: incAudit, set: setIncAudit },
            ].map((opt, idx) => (
              <label
                key={idx}
                className="flex items-center gap-2.5 p-2.5 rounded-lg bg-[#121315] border border-[#2C2F36] cursor-pointer hover:border-[#3A3D46] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={opt.state}
                  onChange={(e) => opt.set(e.target.checked)}
                  className="w-4 h-4 accent-[#FAF8F5] bg-[#222429] border-[#2C2F36] rounded"
                />
                <span className="text-[#FAF8F5] text-xs font-medium">{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Compilation Status */}
        {isCompiling && (
          <div className="p-4 rounded-xl bg-[#222429] border border-[#3A3D46] flex items-center gap-3 text-xs font-mono text-[#FAF8F5] animate-pulse">
            <RefreshCw className="w-4 h-4 animate-spin text-[#FAF8F5]" />
            <span>Compiling quantified risk intelligence & rendering cryptographic seals...</span>
          </div>
        )}

        {compileSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between text-xs font-mono text-emerald-400">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Executive Report Compiled Successfully!
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#121214] font-bold flex items-center gap-1.5 cursor-pointer text-xs"
              >
                <Printer className="w-3.5 h-3.5" /> Print PDF
              </button>
            </div>
          </div>
        )}

        {/* Executive Report Preview Document Box */}
        <div className="bg-[#121315] border border-[#2C2F36] rounded-xl p-5 space-y-4 font-sans text-xs text-[#A0A5B1] max-h-60 overflow-y-auto border-dashed">
          <div className="flex justify-between items-center pb-2 border-b border-[#2C2F36] font-mono text-[10px]">
            <span className="font-bold text-[#FAF8F5] tracking-wider">DIGILEX EXECUTIVE REPORT</span>
            <span className="text-[#FAF8F5]">26 SEP 2026 | STAMP: #7F2A89</span>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-[#FAF8F5] text-sm">1. Executive Summary</h3>
            <p className="text-[11px] text-[#A0A5B1]">
              Acme Financial Services maintains a Total Expected Annual Loss (EAL) of <span className="text-rose-400 font-mono font-bold">₹4.82 Crore</span>. Primary exposure stems from Payment Infrastructure (₹1.92 Cr). Implementing the recommended ₹50.00 Lakh budget optimization reduces annualized exposure by <span className="text-emerald-400 font-mono font-bold">₹1.84 Crore</span> (3.79x ROSI).
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-[#FAF8F5] text-sm">2. Priority Remediation Action</h3>
            <p className="text-[11px] text-[#A0A5B1]">
              #1 Priority: Patch Payment Gateway Server (CVE-2026-48291). Cost: ₹5.00 Lakh. EAL Reduced: ₹1.45 Crore/yr.
            </p>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#2C2F36]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#222429] hover:bg-[#2C2F36] text-[#A0A5B1] hover:text-[#FAF8F5] font-bold text-xs cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleGeneratePDF}
            disabled={isCompiling}
            className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#121214] font-bold text-xs flex items-center gap-2 shadow-lg cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{isCompiling ? 'Generating...' : 'Compile & Export PDF'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
