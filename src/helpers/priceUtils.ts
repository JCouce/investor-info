import type { DailyEOD } from '../types/company-data.types';

export function calculateGrowthPercentage(eod: DailyEOD[]): number | null {
  if (!eod || eod.length < 2) return null;

  const first = eod[0].adjusted_close;
  const last = eod[eod.length - 1].adjusted_close;

  if (first === 0) return null;

  return ((last - first) / first) * 100;
}

export function getGrowthColorClass(value: number | null): string {
  if (value === null) return 'text-white';
  if (value > 0) return 'text-green-400';
  if (value < 0) return 'text-red-400';
  return 'text-white';
}
