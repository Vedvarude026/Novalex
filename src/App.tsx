import React, { useState } from 'react';
import { PageView, Vulnerability, ChatMessage } from './types';
import { INITIAL_VULNERABILITIES, INITIAL_ASSETS } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

import { ExecutiveOverview } from './components/dashboard/ExecutiveOverview';
import { RiskIntelligencePage } from './components/dashboard/RiskIntelligencePage';
import { AssetsPage } from './components/dashboard/AssetsPage';
import { VulnerabilitiesPage } from './components/dashboard/VulnerabilitiesPage';
import { RemediationPage } from './components/dashboard/RemediationPage';
import { FundOptimizerPage } from './components/dashboard/FundOptimizerPage';
import { SimulatorPage } from './components/dashboard/SimulatorPage';
import { ForecastingPage } from './components/dashboard/ForecastingPage';
import { CompliancePage } from './components/dashboard/CompliancePage';
import { AuditTrailPage } from './components/dashboard/AuditTrailPage';
import { ThreatIntelPage } from './components/dashboard/ThreatIntelPage';
import { ReportsPage } from './components/dashboard/ReportsPage';
import { SettingsPage } from './components/dashboard/SettingsPage';
import { CopilotPage } from './components/dashboard/CopilotPage';

import { ReportModal } from './components/modals/ReportModal';
import { VulnerabilityDetailModal } from './components/modals/VulnerabilityDetailModal';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activePage, setActivePage] = useState<PageView>('overview');
  const [isOpenMobileSidebar, setIsOpenMobileSidebar] = useState(false);

  const [vulnerabilities] = useState<Vulnerability[]>(INITIAL_VULNERABILITIES);
  const [assets] = useState(INITIAL_ASSETS);

  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState<Vulnerability | null>(null);

  // Copilot Chat History State
  const [copilotMessages, setCopilotMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: `Welcome to DIGILEX Cyber Risk Intelligence.

Organization: Acme Financial Services
Current Total Expected Annual Loss (EAL): ₹4.82 Crore

Your highest financial priority is CVE-2026-48291 on the Payment Gateway Server (EAL ₹1.92 Cr). Remediating it costs ₹5.00 Lakh and yields ₹1.45 Crore in annualized risk reduction (29.0x ROSI).

How can I assist your security or executive team today?`,
      timestamp: '26 Sep 2026, 21:42 IST',
      codeSnippet: {
        language: 'python',
        code: `EAL = P(exploit) * AssetValue * LossMagnitude * (1 - ControlEffectiveness)\n# Current Total Portfolio Exposure: ₹4.82 Crore`,
      },
    },
  ]);

  return (
    <div className="min-h-screen bg-[#121214] text-[#FAF8F5] flex flex-col font-sans selection:bg-[#FAF8F5] selection:text-[#121214]">
      {/* Persistent Left Sidebar */}
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        isOpenMobile={isOpenMobileSidebar}
        setIsOpenMobile={setIsOpenMobileSidebar}
      />

      {/* Main Layout Container */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        {/* Top Header */}
        <Header
          activePage={activePage}
          setActivePage={setActivePage}
          onOpenReportModal={() => setIsReportModalOpen(true)}
          onOpenCopilot={() => setActivePage('fund-optimizer')}
          globalSearchQuery={globalSearchQuery}
          setGlobalSearchQuery={setGlobalSearchQuery}
          onToggleMobileSidebar={() => setIsOpenMobileSidebar(!isOpenMobileSidebar)}
        />

        {/* Dynamic Main Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activePage === 'overview' && (
            <ExecutiveOverview
              vulnerabilities={vulnerabilities}
              setActivePage={setActivePage}
              onSelectVulnerability={(v) => setSelectedVulnerability(v)}
              onOpenCopilot={() => setActivePage('fund-optimizer')}
            />
          )}

          {activePage === 'risk-intelligence' && (
            <RiskIntelligencePage
              vulnerabilities={vulnerabilities}
              onSelectVulnerability={(v) => setSelectedVulnerability(v)}
            />
          )}

          {activePage === 'assets' && (
            <AssetsPage assets={assets} globalSearchQuery={globalSearchQuery} />
          )}

          {activePage === 'vulnerabilities' && (
            <VulnerabilitiesPage
              vulnerabilities={vulnerabilities}
              onSelectVulnerability={(v) => setSelectedVulnerability(v)}
              globalSearchQuery={globalSearchQuery}
            />
          )}

          {activePage === 'remediation' && (
            <RemediationPage
              vulnerabilities={vulnerabilities}
              onSelectVulnerability={(v) => setSelectedVulnerability(v)}
              onOpenOptimizer={() => setActivePage('fund-optimizer')}
            />
          )}

          {activePage === 'fund-optimizer' && <FundOptimizerPage />}

          {activePage === 'simulator' && <SimulatorPage />}

          {activePage === 'forecasting' && <ForecastingPage />}

          {activePage === 'compliance' && <CompliancePage />}

          {activePage === 'audit-trail' && <AuditTrailPage />}

          {activePage === 'threat-intel' && (
            <ThreatIntelPage onOpenCopilot={() => setActivePage('fund-optimizer')} />
          )}

          {activePage === 'reports' && (
            <ReportsPage onOpenReportModal={() => setIsReportModalOpen(true)} />
          )}

          {activePage === 'settings' && <SettingsPage />}
        </main>
      </div>

      {/* Floating Copilot Button */}
      {activePage !== 'fund-optimizer' && (
        <button
          onClick={() => setActivePage('fund-optimizer')}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#FAF8F5] hover:bg-[#EFECE6] text-[#121214] font-bold text-xs shadow-2xl flex items-center gap-2 transition-all transform hover:scale-105 cursor-pointer glow-ivory"
        >
          <Sparkles className="w-4 h-4 text-[#121214] animate-pulse" />
          <span className="font-mono font-extrabold">DIGILEX Copilot</span>
        </button>
      )}

      {/* Report Generator Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {/* Vulnerability Detail Deep Analysis Modal */}
      <VulnerabilityDetailModal
        vulnerability={selectedVulnerability}
        onClose={() => setSelectedVulnerability(null)}
        onOpenCopilot={() => {
          setSelectedVulnerability(null);
          setActivePage('fund-optimizer');
        }}
      />
    </div>
  );
}
