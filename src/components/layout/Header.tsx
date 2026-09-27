import React, { useState } from 'react';
import { PageView } from '../../types';
import { DigilexLogo } from '../common/DigilexLogo';
import {
  Search,
  Bell,
  FileSpreadsheet,
  Menu,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  onOpenReportModal: () => void;
  onOpenCopilot: () => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  onToggleMobileSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  onOpenReportModal,
  onOpenCopilot,
  globalSearchQuery,
  setGlobalSearchQuery,
  onToggleMobileSidebar,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const getPageTitle = (page: PageView) => {
    switch (page) {
      case 'overview':
        return { category: 'Overview', title: 'Executive Risk Intelligence' };
      case 'risk-intelligence':
        return { category: 'Quantification', title: 'Risk Intelligence Engine' };
      case 'assets':
        return { category: 'Inventory', title: 'Asset Intelligence & Discovery' };
      case 'vulnerabilities':
        return { category: 'Threats', title: 'Vulnerability Intelligence' };
      case 'threat-intel':
        return { category: 'Intelligence', title: 'Threat Intelligence & Campaigns' };
      case 'fund-optimizer':
        return { category: 'Optimization', title: '0/1 Knapsack Fund Optimizer' };
      case 'simulator':
        return { category: 'Simulation', title: 'What-If Decision Simulator' };
      case 'forecasting':
        return { category: 'Projections', title: 'Risk Trajectory Forecasting' };
      case 'remediation':
        return { category: 'Ranking', title: 'Remediation Intelligence' };
      case 'compliance':
        return { category: 'Governance', title: 'Compliance Mapping' };
      case 'audit-trail':
        return { category: 'Security', title: 'Immutable Audit Trail' };
      case 'reports':
        return { category: 'Exports', title: 'Executive Reports & Summaries' };
      case 'settings':
        return { category: 'System', title: 'Organization Settings' };
      default:
        return { category: 'DIGILEX', title: 'Cyber Risk Intelligence' };
    }
  };

  const pageInfo = getPageTitle(activePage);

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#16171A]/90 backdrop-blur-md border-b border-[#2C2F36] px-4 lg:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Page Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-lg text-[#A0A5B1] hover:text-[#FAF8F5] hover:bg-[#222429]"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <DigilexLogo size="sm" showText={false} />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#A0A5B1] font-mono">
              <span className="font-bold text-[#FAF8F5]">DIGILEX</span>
              <span>/</span>
              <span className="text-[#A0A5B1] font-semibold">{pageInfo.category}</span>
            </div>
            <h2 className="text-sm lg:text-base font-bold text-[#FAF8F5] font-sans leading-none tracking-tight">
              {pageInfo.title}
            </h2>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Global Search Input */}
        <div className="relative hidden md:block w-64 lg:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F9B]" />
          <input
            type="text"
            value={globalSearchQuery}
            onChange={(e) => setGlobalSearchQuery(e.target.value)}
            placeholder="Search vulnerabilities, CVEs, assets..."
            className="w-full bg-[#121315] border border-[#2C2F36] rounded-lg pl-9 pr-3 py-1.5 text-xs text-[#FAF8F5] placeholder-[#717682] focus:outline-none focus:border-[#FAF8F5]/80 focus:ring-1 focus:ring-[#FAF8F5]/30 font-sans"
          />
        </div>

        {/* AI Copilot Button */}
        <button
          onClick={onOpenCopilot}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#222429] hover:bg-[#2C2F36] border border-[#383B43] text-[#FAF8F5] text-xs font-semibold transition-all cursor-pointer"
          title="Open DIGILEX AI Copilot"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FAF8F5] animate-pulse" />
          <span className="hidden sm:inline">Copilot</span>
        </button>

        {/* Live Monitoring Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#1E2024] border border-[#2C2F36] text-[#A0A5B1] text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-[#FAF8F5]">● Monitoring Active</span>
        </div>

        {/* Notifications Icon with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg text-[#A0A5B1] hover:text-[#FAF8F5] hover:bg-[#222429] transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#16171A] border border-[#2C2F36] rounded-xl shadow-2xl p-3 z-50 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#2C2F36]">
                <span className="text-xs font-bold text-[#FAF8F5]">System Notifications</span>
                <span className="text-[10px] font-mono text-[#A0A5B1]">2 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 rounded bg-[#121315] border border-[#2C2F36]">
                  <p className="font-semibold text-rose-300">Active Campaign Detected</p>
                  <p className="text-[11px] text-[#A0A5B1] mt-0.5">
                    APT-44 targeting Payment Gateway CVE-2026-48291.
                  </p>
                  <span className="text-[9px] font-mono text-[#717682]">10 mins ago</span>
                </div>
                <div className="p-2 rounded bg-[#121315] border border-[#2C2F36]">
                  <p className="font-semibold text-emerald-300">Scan Completed</p>
                  <p className="text-[11px] text-[#A0A5B1] mt-0.5">
                    Discovered 50 network assets and updated EAL index.
                  </p>
                  <span className="text-[9px] font-mono text-[#717682]">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Generate Report Button */}
        <button
          onClick={onOpenReportModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#121214] text-xs font-bold shadow-md transition-all cursor-pointer"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Generate Executive Report</span>
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-[#2A2C32] border border-[#3A3D46] flex items-center justify-center text-xs font-bold text-[#FAF8F5] shadow-xs cursor-pointer">
          SA
        </div>
      </div>
    </header>
  );
};
