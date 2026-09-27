import React, { useState } from 'react';
import { Asset } from '../../types';
import { formatINR } from '../../utils/formatters';
import {
  Server,
  Radar,
  Filter,
  Search,
  ShieldAlert,
  Database,
  Cloud,
  Laptop,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';

interface AssetsPageProps {
  assets: Asset[];
  globalSearchQuery: string;
}

export const AssetsPage: React.FC<AssetsPageProps> = ({ assets, globalSearchQuery }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStatusMessage, setScanStatusMessage] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCriticality, setSelectedCriticality] = useState<string>('ALL');
  const [selectedType, setSelectedType] = useState<string>('ALL');

  const activeSearch = searchQuery || globalSearchQuery;

  // Simulate Asset Discovery Scan
  const handleRunDiscovery = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanStatusMessage('Initializing network subnets & AWS cloud discovery...');

    setTimeout(() => {
      setScanProgress(23);
      setScanStatusMessage('Scanning active IP addresses in 10.0.0.0/16 and cloud VPCs...');
    }, 800);

    setTimeout(() => {
      setScanProgress(67);
      setScanStatusMessage('Fingerprinting OS, open ports, software agents, and database schemas...');
    }, 1800);

    setTimeout(() => {
      setScanProgress(100);
      setScanStatusMessage('Scan Complete! Cataloged 50 assets and synchronized EAL financial indexes.');
      setTimeout(() => {
        setIsScanning(false);
      }, 1500);
    }, 2800);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(activeSearch.toLowerCase()) ||
      asset.ipAddress.includes(activeSearch) ||
      asset.owner.toLowerCase().includes(activeSearch.toLowerCase());

    const matchesCriticality =
      selectedCriticality === 'ALL' || asset.criticality === selectedCriticality;

    const matchesType = selectedType === 'ALL' || asset.type === selectedType;

    return matchesSearch && matchesCriticality && matchesType;
  });

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case 'Server':
        return <Server className="w-4 h-4 text-blue-400" />;
      case 'Database':
        return <Database className="w-4 h-4 text-amber-400" />;
      case 'Cloud Infrastructure':
        return <Cloud className="w-4 h-4 text-cyan-400" />;
      case 'Endpoint':
        return <Laptop className="w-4 h-4 text-emerald-400" />;
      default:
        return <Server className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Scan Trigger */}
      <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-extrabold text-[#FAF8F5] font-sans flex items-center gap-2">
            Asset Intelligence & Discovery
            <span className="text-xs font-mono font-bold bg-[#282A30] text-[#A0A5B1] border border-[#3A3D46] px-2 py-0.5 rounded">
              {assets.length} Assets Registered
            </span>
          </h1>
          <p className="text-xs text-[#A0A5B1] font-sans mt-1">
            Real-time infrastructure discovery mapped to financial value at risk
          </p>
        </div>

        <button
          onClick={handleRunDiscovery}
          disabled={isScanning}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EFECE6] disabled:bg-[#282A30] text-[#121214] text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
        >
          <Radar className={`w-4 h-4 ${isScanning ? 'animate-spin text-[#121214]' : ''}`} />
          <span>{isScanning ? 'Scanning Network...' : 'Run Asset Discovery'}</span>
        </button>
      </div>

      {/* Discovery Scan Progress Modal Banner */}
      {isScanning && (
        <div className="bg-[#18191C] border-2 border-[#FAF8F5]/40 rounded-2xl p-5 shadow-2xl space-y-3 glow-ivory animate-pulse">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#FAF8F5] flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              DISCOVERY SCAN IN PROGRESS
            </span>
            <span className="text-sm font-mono font-extrabold text-[#FAF8F5]">
              {scanProgress}%
            </span>
          </div>

          <div className="w-full bg-[#121315] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#FAF8F5] h-full transition-all duration-300"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>

          <p className="text-xs font-mono text-[#A0A5B1]">{scanStatusMessage}</p>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8F9B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search asset name, IP, owner..."
            className="w-full bg-[#121315] border border-[#2C2F36] rounded-lg pl-9 pr-3 py-2 text-xs text-[#FAF8F5] placeholder-[#717682] focus:outline-none focus:border-[#FAF8F5] font-sans"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={selectedCriticality}
            onChange={(e) => setSelectedCriticality(e.target.value)}
            className="bg-[#121315] border border-[#2C2F36] rounded-lg px-3 py-2 text-xs text-[#FAF8F5] font-mono focus:outline-none"
          >
            <option value="ALL">All Criticality</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-[#121315] border border-[#2C2F36] rounded-lg px-3 py-2 text-xs text-[#FAF8F5] font-mono focus:outline-none"
          >
            <option value="ALL">All Asset Types</option>
            <option value="Server">Server</option>
            <option value="Database">Database</option>
            <option value="Cloud Infrastructure">Cloud Infra</option>
            <option value="Endpoint">Endpoint</option>
            <option value="API Gateway">API Gateway</option>
          </select>
        </div>
      </div>

      {/* Assets Inventory Table */}
      <div className="bg-[#18191C] border border-[#2C2F36] rounded-2xl p-5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#2C2F36] text-[11px] font-mono uppercase text-[#A0A5B1]">
                <th className="py-2.5 px-3">Asset Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">IP Address</th>
                <th className="py-2.5 px-3">Criticality</th>
                <th className="py-2.5 px-3">Owner</th>
                <th className="py-2.5 px-3">Data Classification</th>
                <th className="py-2.5 px-3 text-center">Vulnerabilities</th>
                <th className="py-2.5 px-3 text-right">EAL Exposure</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2C2F36] text-xs">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-[#222429] transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-[#FAF8F5]">
                    <div className="flex items-center gap-2">
                      {getAssetTypeIcon(asset.type)}
                      <span>{asset.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-[#A0A5B1]">{asset.type}</td>
                  <td className="py-3 px-3 font-mono text-[#FAF8F5]">{asset.ipAddress}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        asset.criticality === 'Critical'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : asset.criticality === 'High'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-[#222429] text-[#A0A5B1]'
                      }`}
                    >
                      {asset.criticality}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-[#FAF8F5]">{asset.owner}</td>
                  <td className="py-3 px-3 text-[#A0A5B1] font-mono text-[11px]">
                    {asset.dataClassification}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-[#121315] text-rose-300 border border-[#2C2F36]">
                      {asset.vulnerabilityCount}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-rose-300">
                    {formatINR(asset.ealAmount)}
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
