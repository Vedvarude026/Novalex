import React from 'react';
import { FileSpreadsheet, Download, Eye, Sparkles } from 'lucide-react';

interface ReportsPageProps {
  onOpenReportModal: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ onOpenReportModal }) => {
  const reportsList = [
    { title: 'Executive Risk Report', type: 'C-Suite / CEO', date: '26 Sep 2026', size: '2.4 MB' },
    { title: 'Board Security Summary', type: 'Board of Directors', date: '25 Sep 2026', size: '1.8 MB' },
    { title: 'Vulnerability Risk Report', type: 'Security Operations', date: '24 Sep 2026', size: '4.1 MB' },
    { title: 'Budget Optimization Report', type: 'CFO / Finance', date: '22 Sep 2026', size: '1.2 MB' },
    { title: 'Compliance Mapping Report', type: 'Auditors / GRC', date: '20 Sep 2026', size: '3.0 MB' },
    { title: 'Audit Trail Ledger Report', type: 'Compliance', date: '18 Sep 2026', size: '5.2 MB' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
            Executive Reports & Export Intelligence
          </h1>
          <p className="text-xs text-slate-400 font-sans mt-1">
            Generate board-ready financial cyber risk PDF summaries in one click
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/20 flex items-center gap-2 cursor-pointer shrink-0"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Generate New PDF Report</span>
        </button>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportsList.map((rep, i) => (
          <div
            key={i}
            className="bg-[#111827]/90 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded uppercase">
                  {rep.type}
                </span>
                <span className="text-[10px] font-mono text-slate-500">{rep.date}</span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans">{rep.title}</h3>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">{rep.size} PDF</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenReportModal}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" /> Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
