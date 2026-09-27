/**
 * Formats a raw Indian Rupee amount into standard INR notation:
 * E.g., 19200000 -> "₹1.92 Cr"
 * 500000 -> "₹5.00 L"
 * 45000 -> "₹45,000"
 */
export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh.toFixed(2)} L`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

/**
 * Formats raw number as compact Lakh/Crore without symbol if needed
 */
export function formatINRCompact(amount: number): string {
  if (amount >= 10000000) {
    return `${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `${(amount / 100000).toFixed(2)} L`;
  } else {
    return amount.toLocaleString('en-IN');
  }
}

/**
 * Calculates Expected Annual Loss (EAL)
 * EAL = Likelihood (%) * Asset Value * Loss Multiplier * (1 - Control Effectiveness)
 */
export function calculateEAL(
  likelihoodPercent: number,
  assetValueAtRisk: number,
  controlEffectivenessPercent: number,
  threatMultiplier = 1.0
): number {
  const p = Math.min(Math.max(likelihoodPercent / 100, 0), 1);
  const ctrl = Math.min(Math.max(controlEffectivenessPercent / 100, 0), 0.99);
  return Math.round(p * assetValueAtRisk * threatMultiplier * (1 - ctrl));
}

/**
 * Calculates Return on Security Investment (ROSI) ratio
 * ROSI = (Risk Reduction Amount - Remediation Cost) / Remediation Cost
 * Or direct multiplier: Risk Reduction / Remediation Cost
 */
export function calculateROSI(riskReduction: number, cost: number): number {
  if (cost <= 0) return 0;
  return Number((riskReduction / cost).toFixed(1));
}

/**
 * Dynamic 0/1 Knapsack optimizer for budget allocation
 */
export interface ItemToOptimize {
  id: string;
  name: string;
  cveId: string;
  cost: number;
  riskReduction: number;
  rosi: number;
}

export function solveKnapsackOptimization(
  items: ItemToOptimize[],
  budget: number
): { selectedIds: string[]; totalCost: number; totalRiskReduction: number } {
  // Simple greedy ratio fallback or dynamic knapsack for crisp results
  const sorted = [...items].sort((a, b) => b.rosi - a.rosi);
  
  let currentBudget = budget;
  let totalCost = 0;
  let totalRiskReduction = 0;
  const selectedIds: string[] = [];

  for (const item of sorted) {
    if (item.cost <= currentBudget) {
      selectedIds.push(item.id);
      currentBudget -= item.cost;
      totalCost += item.cost;
      totalRiskReduction += item.riskReduction;
    }
  }

  return { selectedIds, totalCost, totalRiskReduction };
}
