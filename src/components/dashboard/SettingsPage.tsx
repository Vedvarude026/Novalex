import React, { useState } from 'react';
import { Settings, Building, Lock, Bell, Check } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [currency, setCurrency] = useState('INR');
  const [riskTolerance, setRiskTolerance] = useState('Medium');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl">
      {/* Header */}
      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-5 shadow-xl">
        <h1 className="text-xl font-extrabold text-white font-sans flex items-center gap-2">
          Organization Settings & Financial Thresholds
        </h1>
        <p className="text-xs text-slate-400 font-sans mt-1">
          Configure risk tolerance parameters, currency display, and DIGILEX intelligence models
        </p>
      </div>

      <div className="bg-[#111827]/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white font-sans border-b border-slate-800 pb-2">
            Financial Formatting & Currency
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <label className="text-slate-400 block mb-1">Primary Currency Notation</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
              >
                <option value="INR">Indian Rupee (₹ Lakh / ₹ Crore)</option>
                <option value="USD">US Dollar ($ USD)</option>
                <option value="EUR">Euro (€ EUR)</option>
              </select>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">Organization Risk Appetite</label>
              <select
                value={riskTolerance}
                onChange={(e) => setRiskTolerance(e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-800 rounded-lg p-2 text-slate-200 focus:outline-none"
              >
                <option value="Low">Conservative (Low Loss Threshold)</option>
                <option value="Medium">Balanced (Standard Enterprise)</option>
                <option value="High">Aggressive Growth</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Saved Settings ✓</span>
              </>
            ) : (
              <span>Save Configuration</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
