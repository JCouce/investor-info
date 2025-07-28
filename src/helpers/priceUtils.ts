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

// Para volumen: destaca si es muy alto
export function getVolumeColorClass(volume: number | null | undefined): string {
  if (volume === null || volume === undefined) return 'text-white';
  if (volume > 1_000_000) return 'text-blue-400';       // volumen muy alto
  if (volume > 200_000) return 'text-blue-300';         // volumen alto
  return 'text-zinc-300';                               // volumen normal
}

// Para volatilidad: destaca si la diferencia high-low es significativa
export function getVolatilityColorClass(volatility: number | null | undefined): string {
  if (volatility === null || volatility === undefined) return 'text-white';
  if (volatility > 20) return 'text-yellow-400';         // muy volátil
  if (volatility > 10) return 'text-yellow-300';         // moderadamente volátil
  return 'text-zinc-300';                                // poco volátil
}