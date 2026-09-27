import React from 'react';
import { PageView } from '../../types';
import { DigilexLogo } from '../common/DigilexLogo';
import {
  LayoutDashboard,
  BrainCircuit,
  Server,
  ShieldAlert,
  Radio,
  Calculator,
  SlidersHorizontal,
  TrendingUp,
  FileCheck,
  History,
  FileText,
  Settings,
  Building2,
  UserCheck,
  ChevronDown,
  X
} from 'lucide-react';

interface SidebarProps {
  activePage: PageView;
  setActivePage: (page: PageView) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

interface MenuItem {
  id: PageView;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  setActivePage,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'risk-intelligence', label: 'Risk Intelligence', icon: BrainCircuit },
    { id: 'assets', label: 'Assets', icon: Server },
    { id: 'vulnerabilities', label: 'Vulnerabilities', icon: ShieldAlert, badge: '247' },
    { id: 'threat-intel', label: 'Threat Intelligence', icon: Radio, badge: 'LIVE' },
    { id: 'fund-optimizer', label: 'Fund Optimizer', icon: Calculator, badge: 'AI' },
    { id: 'simulator', label: 'What-If Simulator', icon: SlidersHorizontal },
    { id: 'forecasting', label: 'Forecasting', icon: TrendingUp },
    { id: 'compliance', label: 'Compliance', icon: FileCheck },
    { id: 'audit-trail', label: 'Audit Trail', icon: History },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: PageView) => {
    setActivePage(id);
    setIsOpenMobile(false);
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
          onClick={() => setIsOpenMobile(false)}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#16171A] border-r border-[#2C2F36] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Top Brand Section */}
        <div>
          <div className="p-4 px-5 border-b border-[#2C2F36] flex items-center justify-between">
            <DigilexLogo size="md" showText={true} showTagline={true} />
            <button
              onClick={() => setIsOpenMobile(false)}
              className="lg:hidden text-[#A0A5B1] hover:text-[#FAF8F5] p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF8F5] text-[#121214] font-bold shadow-sm'
                      : 'text-[#A0A5B1] hover:text-[#FAF8F5] hover:bg-[#222429]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#121214]' : 'text-[#8A8F9B]'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-[#121214] text-[#FAF8F5]'
                          : item.badge === 'LIVE'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : item.badge === 'AI'
                          ? 'bg-[#2C2F36] text-[#FAF8F5] border border-[#3A3D46]'
                          : 'bg-[#222429] text-[#A0A5B1]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-[#2C2F36] bg-[#121315] space-y-3">
          {/* Organization Picker */}
          <div className="bg-[#1C1E22] border border-[#2C2F36] rounded-lg p-2 flex items-center justify-between cursor-pointer hover:border-[#3A3D46] transition-colors">
            <div className="flex items-center gap-2.5 min-w-0">
              <Building2 className="w-4 h-4 text-[#FAF8F5] shrink-0" />
              <div className="truncate">
                <p className="text-[11px] font-bold text-[#FAF8F5] truncate">
                  Acme Financial Services
                </p>
                <p className="text-[9px] text-[#A0A5B1] font-mono">FIN-IN-9821</p>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#A0A5B1] shrink-0" />
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 px-1 py-0.5">
            <div className="w-8 h-8 rounded-full bg-[#222429] border border-[#2C2F36] flex items-center justify-center shrink-0">
              <UserCheck className="w-4 h-4 text-[#FAF8F5]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#FAF8F5] truncate">
                Security Administrator
              </p>
              <p className="text-[10px] text-[#A0A5B1] font-mono truncate">
                admin@digilex.demo
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
