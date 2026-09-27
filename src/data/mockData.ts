import { Asset, Vulnerability, AuditLog, ComplianceControl, ThreatAlert } from '../types';

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'asset-1',
    name: 'PAY-GW-PROD-01',
    type: 'Server',
    ipAddress: '10.0.12.45',
    environment: 'Production',
    criticality: 'Critical',
    owner: 'Payments Infra Team',
    dataClassification: 'PCI-DSS / Confidential',
    vulnerabilityCount: 12,
    ealAmount: 19200000, // ₹1.92 Cr
    valueAtRisk: 85000000, // ₹8.5 Cr
  },
  {
    id: 'asset-2',
    name: 'CUSTOMER-DB-01',
    type: 'Database',
    ipAddress: '10.0.21.14',
    environment: 'Production',
    criticality: 'Critical',
    owner: 'Database Engineering',
    dataClassification: 'PII / Sensitive',
    vulnerabilityCount: 8,
    ealAmount: 12100000, // ₹1.21 Cr
    valueAtRisk: 62000000, // ₹6.2 Cr
  },
  {
    id: 'asset-3',
    name: 'AWS-PROD-US-01',
    type: 'Cloud Infrastructure',
    ipAddress: '54.210.89.120',
    environment: 'Production',
    criticality: 'High',
    owner: 'Cloud Ops',
    dataClassification: 'Internal',
    vulnerabilityCount: 19,
    ealAmount: 820000, // ₹82 L
    valueAtRisk: 35000000, // ₹3.5 Cr
  },
  {
    id: 'asset-4',
    name: 'API-GW-02',
    type: 'API Gateway',
    ipAddress: '10.0.15.88',
    environment: 'Production',
    criticality: 'High',
    owner: 'Core API Services',
    dataClassification: 'PCI-DSS / Confidential',
    vulnerabilityCount: 6,
    ealAmount: 4500000, // ₹45 L
    valueAtRisk: 22000000, // ₹2.2 Cr
  },
  {
    id: 'asset-5',
    name: 'DEV-LAPTOP-042',
    type: 'Endpoint',
    ipAddress: '10.0.45.92',
    environment: 'Development',
    criticality: 'Low',
    owner: 'DevOps Lead',
    dataClassification: 'Internal',
    vulnerabilityCount: 3,
    ealAmount: 280000, // ₹2.8 L
    valueAtRisk: 1500000, // ₹15 L
  },
  {
    id: 'asset-6',
    name: 'CORE-BANKING-SVC',
    type: 'Internal Service',
    ipAddress: '10.0.10.12',
    environment: 'Production',
    criticality: 'Critical',
    owner: 'Fintech Core Team',
    dataClassification: 'PCI-DSS / Confidential',
    vulnerabilityCount: 15,
    ealAmount: 3400000, // ₹34 L
    valueAtRisk: 120000000, // ₹12 Cr
  }
];

export const INITIAL_VULNERABILITIES: Vulnerability[] = [
  {
    id: 'vuln-1',
    cveId: 'CVE-2026-48291',
    title: 'Unauthenticated Remote Code Execution in Payment Ingress Controller',
    assetId: 'asset-1',
    assetName: 'Payment Gateway Server (PAY-GW-PROD-01)',
    cvss: 9.8,
    severity: 'CRITICAL',
    attackLikelihood: 88,
    exploitStatus: 'ACTIVE',
    knownExploited: true,
    patchAvailable: true,
    ealAmount: 19200000, // ₹1.92 Cr
    remediationCost: 500000, // ₹5.00 L
    rosiRatio: 28.4,
    priorityRank: 1,
    recommendedAction: 'Patch Immediately',
    description: 'A flaw in memory allocation permits an remote attacker to execute arbitrary code with root privileges on the primary payment processing gateway.',
    threatVector: 'Internet Facing Ingress',
    businessSector: 'Payments',
    technicalExposureScore: 9.8,
    assetCriticalityScore: 9.5,
    threatExposureScore: 9.2,
    controlEffectivenessScore: 4.0,
  },
  {
    id: 'vuln-2',
    cveId: 'CVE-2026-39102',
    title: 'SQL Injection in Customer Data Query Endpoint',
    assetId: 'asset-2',
    assetName: 'Customer Database (CUSTOMER-DB-01)',
    cvss: 9.1,
    severity: 'CRITICAL',
    attackLikelihood: 76,
    exploitStatus: 'EXPLOITED_IN_WILD',
    knownExploited: true,
    patchAvailable: true,
    ealAmount: 12100000, // ₹1.21 Cr
    remediationCost: 350000, // ₹3.50 L
    rosiRatio: 21.7,
    priorityRank: 2,
    recommendedAction: 'Patch + MFA',
    description: 'Improper parameter sanitization enables complete dump of customer financial records and authorization tokens.',
    threatVector: 'Database Middleware',
    businessSector: 'Customer Data',
    technicalExposureScore: 9.1,
    assetCriticalityScore: 9.8,
    threatExposureScore: 8.5,
    controlEffectivenessScore: 5.2,
  },
  {
    id: 'vuln-3',
    cveId: 'CVE-2026-28910',
    title: 'IAM Privilege Escalation via AWS Role Assumption',
    assetId: 'asset-3',
    assetName: 'AWS Production Instance (AWS-PROD-US-01)',
    cvss: 8.7,
    severity: 'HIGH',
    attackLikelihood: 64,
    exploitStatus: 'POC_AVAILABLE',
    knownExploited: false,
    patchAvailable: true,
    ealAmount: 8200000, // ₹82.00 L
    remediationCost: 200000, // ₹2.00 L
    rosiRatio: 18.2,
    priorityRank: 3,
    recommendedAction: 'Restrict Access',
    description: 'Overly permissive IAM inline policies allow compromised ec2 instances to assume full organization admin access.',
    threatVector: 'Cloud IAM Policy',
    businessSector: 'Cloud Infrastructure',
    technicalExposureScore: 8.7,
    assetCriticalityScore: 8.0,
    threatExposureScore: 6.8,
    controlEffectivenessScore: 6.0,
  },
  {
    id: 'vuln-4',
    cveId: 'CVE-2026-19283',
    title: 'JWT Authentication Bypass in Internal API Proxy',
    assetId: 'asset-4',
    assetName: 'API Gateway (API-GW-02)',
    cvss: 8.4,
    severity: 'HIGH',
    attackLikelihood: 58,
    exploitStatus: 'POC_AVAILABLE',
    knownExploited: false,
    patchAvailable: true,
    ealAmount: 4500000, // ₹45.00 L
    remediationCost: 150000, // ₹1.50 L
    rosiRatio: 15.0,
    priorityRank: 4,
    recommendedAction: 'Upgrade Auth Proxy',
    description: 'Algorithm parameter manipulation allowed signature verification bypass for internal Microservice API calls.',
    threatVector: 'API Auth Service',
    businessSector: 'Internal Operations',
    technicalExposureScore: 8.4,
    assetCriticalityScore: 7.8,
    threatExposureScore: 6.0,
    controlEffectivenessScore: 6.5,
  },
  {
    id: 'vuln-5',
    cveId: 'CVE-2026-11029',
    title: 'Local Escalation of Privilege on Developer Workstation Agent',
    assetId: 'asset-5',
    assetName: 'Endpoint (DEV-LAPTOP-042)',
    cvss: 6.5,
    severity: 'MEDIUM',
    attackLikelihood: 32,
    exploitStatus: 'THEORETICAL',
    knownExploited: false,
    patchAvailable: true,
    ealAmount: 280000, // ₹2.80 L
    remediationCost: 50000, // ₹50,000
    rosiRatio: 3.6,
    priorityRank: 5,
    recommendedAction: 'Patch Endpoint Agent',
    description: 'DLL hijacking vulnerability in background update daemon on employee laptops.',
    threatVector: 'Local Device',
    businessSector: 'Endpoints',
    technicalExposureScore: 6.5,
    assetCriticalityScore: 4.0,
    threatExposureScore: 3.5,
    controlEffectivenessScore: 7.0,
  }
];

export const SECTOR_RISK_DATA = [
  { name: 'Payments', ealCr: 1.92, label: '₹1.92 Cr' },
  { name: 'Customer Data', ealCr: 1.21, label: '₹1.21 Cr' },
  { name: 'Cloud Infrastructure', ealCr: 0.82, label: '₹82 L' },
  { name: 'Internal Operations', ealCr: 0.45, label: '₹45 L' },
  { name: 'Endpoints', ealCr: 0.28, label: '₹28 L' },
  { name: 'Development Systems', ealCr: 0.14, label: '₹14 L' },
];

export const RISK_TRAJECTORY_DATA = [
  { day: 'Today', unpatched: 4.82, optimized: 4.82 },
  { day: '30 Days', unpatched: 5.12, optimized: 4.01 },
  { day: '60 Days', unpatched: 5.74, optimized: 3.48 },
  { day: '90 Days', unpatched: 6.45, optimized: 2.91 },
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-101',
    timestamp: '26 Sep 2026 21:32:44 IST',
    user: 'security.admin@digilex.demo',
    action: 'Approved Remediation Ticket',
    object: 'CVE-2026-48291',
    previousState: 'Pending Budget Approval',
    newState: 'Approved for ₹5.0 L Allocation',
    eventHash: '7f2a890e42b1c938d4a993e1104f2918bc371290a184e9b8d',
    status: 'Verified',
  },
  {
    id: 'log-102',
    timestamp: '26 Sep 2026 20:15:10 IST',
    user: 'system.autopolicy',
    action: 'Recalculated EAL Metric',
    object: 'Acme Financial Services Portfolio',
    previousState: '₹4.68 Cr',
    newState: '₹4.82 Cr (Updated Threat Feed)',
    eventHash: '9a13f0194812a1e09c8511209a84d2810f7412e8471b028',
    status: 'Verified',
  },
  {
    id: 'log-103',
    timestamp: '26 Sep 2026 18:40:02 IST',
    user: 'ciso.officer@digilex.demo',
    action: 'Fund Optimizer Simulation',
    object: '₹50 Lakh Budget Scenario',
    previousState: 'Unallocated',
    newState: 'Selected 4 High-ROSI Remediation Tasks',
    eventHash: '318e9a20412e8870129a101b9a2c38d1012e8a12048f128',
    status: 'Verified',
  },
  {
    id: 'log-104',
    timestamp: '26 Sep 2026 15:22:19 IST',
    user: 'asset.scanner.daemon',
    action: 'Discovered New Cloud Asset',
    object: 'API-GW-02 (10.0.15.88)',
    previousState: 'Unregistered',
    newState: 'Registered under Core API Services',
    eventHash: '008a28f112e91024b12c8a901e129f128a10e82110291e',
    status: 'Verified',
  }
];

export const COMPLIANCE_ITEMS: ComplianceControl[] = [
  {
    id: 'comp-1',
    finding: 'Missing MFA on Production Database Access',
    controlGap: 'Access Control & Authentication Gap',
    iso27001: 'A.5.17 Authentication',
    nistCsf: 'PR.AA-01 Privilege Mgmt',
    certIn: 'Direction 6(a) Multi-factor',
    status: 'Needs Attention',
    riskLevel: 'CRITICAL',
  },
  {
    id: 'comp-2',
    finding: 'Unpatched Gateway RCE (CVE-2026-48291)',
    controlGap: 'Vulnerability & Patch Management',
    iso27001: 'A.8.8 Technical Vulnerability',
    nistCsf: 'ID.RA-01 Vulnerability Analysis',
    certIn: 'Direction 4 Timely Patching',
    status: 'Needs Attention',
    riskLevel: 'CRITICAL',
  },
  {
    id: 'comp-3',
    finding: 'SIEM Log Retention Below 180 Days',
    controlGap: 'Log Monitoring & Incident Response',
    iso27001: 'A.8.15 Logging',
    nistCsf: 'DE.AE-03 Event Correlation',
    certIn: 'Direction 5 Mandatory 180-Day Logs',
    status: 'In Progress',
    riskLevel: 'HIGH',
  },
  {
    id: 'comp-4',
    finding: 'EDR Coverage Active on 98% Endpoints',
    controlGap: 'Endpoint Defense Control',
    iso27001: 'A.8.7 Malware Protection',
    nistCsf: 'PR.DS-01 Data Protection',
    certIn: 'Direction 7 Endpoint Security',
    status: 'Compliant',
    riskLevel: 'LOW',
  }
];

export const THREAT_ALERTS: ThreatAlert[] = [
  {
    id: 'threat-1',
    title: 'Active Ransomware Exploitation Campaign Targeting Payment Gateways',
    threatActor: 'APT-44 Financial Syndicate',
    category: 'Critical Active Threat',
    description: 'Threat actors are actively leveraging zero-day and unpatched Remote Code Execution exploits against payment routing software across South Asian financial networks.',
    affectedAssetsCount: 3,
    potentialEalExposure: 23400000, // ₹2.34 Cr
    publishedDate: '26 Sep 2026, 19:30 IST',
    mitigation: 'Apply vendor patch KB-2026-901 or restrict port 443 inbound access via web application firewall rules.',
  },
  {
    id: 'threat-2',
    title: 'Credential Harvesting Targeting Banking API Middleware',
    threatActor: 'Storm-0821',
    category: 'High Activity',
    description: 'Phishing campaigns attempting token theft and JWT token replay against OAuth 2.0 implementation on public API endpoints.',
    affectedAssetsCount: 2,
    potentialEalExposure: 8800000, // ₹88 L
    publishedDate: '25 Sep 2026, 14:15 IST',
    mitigation: 'Enforce asymmetric token signing and short JWT expiration limits.',
  }
];
