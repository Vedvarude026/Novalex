export type PageView =
  | 'overview'
  | 'risk-intelligence'
  | 'assets'
  | 'vulnerabilities'
  | 'threat-intel'
  | 'fund-optimizer'
  | 'simulator'
  | 'forecasting'
  | 'remediation'
  | 'compliance'
  | 'audit-trail'
  | 'reports'
  | 'settings';

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Asset {
  id: string;
  name: string;
  type: 'Server' | 'Database' | 'Cloud Infrastructure' | 'Endpoint' | 'API Gateway' | 'Internal Service';
  ipAddress: string;
  environment: 'Production' | 'Staging' | 'Development';
  criticality: 'Critical' | 'High' | 'Medium' | 'Low';
  owner: string;
  dataClassification: 'PCI-DSS / Confidential' | 'PII / Sensitive' | 'Internal' | 'Public';
  vulnerabilityCount: number;
  ealAmount: number; // In INR Rupees
  valueAtRisk: number; // Asset replacement/business impact value in INR
}

export interface Vulnerability {
  id: string;
  cveId: string;
  title: string;
  assetId: string;
  assetName: string;
  cvss: number;
  severity: RiskLevel;
  attackLikelihood: number; // Percentage 0 - 100
  exploitStatus: 'ACTIVE' | 'POC_AVAILABLE' | 'THEORETICAL' | 'EXPLOITED_IN_WILD';
  knownExploited: boolean;
  patchAvailable: boolean;
  ealAmount: number; // Expected Annual Loss in INR
  remediationCost: number; // Cost in INR
  rosiRatio: number; // Return on Security Investment (e.g. 28.4x)
  priorityRank: number;
  recommendedAction: string;
  description: string;
  threatVector: string;
  businessSector: string;
  technicalExposureScore: number;
  assetCriticalityScore: number;
  threatExposureScore: number;
  controlEffectivenessScore: number;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  object: string;
  previousState: string;
  newState: string;
  eventHash: string;
  status: 'Verified' | 'Pending';
}

export interface ComplianceControl {
  id: string;
  finding: string;
  controlGap: string;
  iso27001: string;
  nistCsf: string;
  certIn: string;
  status: 'Needs Attention' | 'Compliant' | 'In Progress';
  riskLevel: RiskLevel;
}

export interface ThreatAlert {
  id: string;
  title: string;
  threatActor: string;
  category: 'Critical Active Threat' | 'High Activity' | 'Emerging' | 'Monitor';
  description: string;
  affectedAssetsCount: number;
  potentialEalExposure: number;
  publishedDate: string;
  mitigation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  codeSnippet?: {
    language: string;
    code: string;
  };
  metrics?: {
    eal?: string;
    cost?: string;
    riskReduction?: string;
  };
}
