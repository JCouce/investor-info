import {
  calculateGrowthPercentage,
  getGrowthColorClass,
  getVolumeColorClass,
  getVolatilityColorClass,
  isPennyStock
} from '../priceUtils';

import type { DailyEOD } from '../../types/company-data.types';

describe('priceUtils', () => {
  describe('calculateGrowthPercentage', () => {
    it('returns null for empty array', () => {
      expect(calculateGrowthPercentage([])).toBeNull();
    });

    it('returns correct growth for valid input', () => {
      const data: DailyEOD[] = [
        { adjusted_close: 100, date: '', open: 0, high: 0, low: 0, close: 0, volume: 0 },
        { adjusted_close: 110, date: '', open: 0, high: 0, low: 0, close: 0, volume: 0 }
      ];
      expect(calculateGrowthPercentage(data)).toBeCloseTo(10);
    });

    it('returns null when first adjusted_close is 0', () => {
      const data: DailyEOD[] = [
        { adjusted_close: 0, date: '', open: 0, high: 0, low: 0, close: 0, volume: 0 },
        { adjusted_close: 10, date: '', open: 0, high: 0, low: 0, close: 0, volume: 0 }
      ];
      expect(calculateGrowthPercentage(data)).toBeNull();
    });
  });

  describe('getGrowthColorClass', () => {
    it('returns green for positive growth', () => {
      expect(getGrowthColorClass(5)).toBe('text-green-400');
    });

    it('returns red for negative growth', () => {
      expect(getGrowthColorClass(-5)).toBe('text-red-400');
    });

    it('returns white for null or zero', () => {
      expect(getGrowthColorClass(0)).toBe('text-white');
      expect(getGrowthColorClass(null)).toBe('text-white');
    });
  });

  describe('getVolumeColorClass', () => {
    it('returns blue-400 for very high volume', () => {
      expect(getVolumeColorClass(1_500_000)).toBe('text-blue-400');
    });

    it('returns blue-300 for high volume', () => {
      expect(getVolumeColorClass(300_000)).toBe('text-blue-300');
    });

    it('returns zinc-300 for normal volume', () => {
      expect(getVolumeColorClass(50_000)).toBe('text-zinc-300');
    });
  });

  describe('getVolatilityColorClass', () => {
    it('returns yellow-400 for very high volatility', () => {
      expect(getVolatilityColorClass(25)).toBe('text-yellow-400');
    });

    it('returns yellow-300 for moderate volatility', () => {
      expect(getVolatilityColorClass(15)).toBe('text-yellow-300');
    });

    it('returns zinc-300 for low volatility', () => {
      expect(getVolatilityColorClass(5)).toBe('text-zinc-300');
    });
  });

  describe('isPennyStock', () => {
    it('returns true when any adjusted_close is below $1 with volume', () => {
      const data: DailyEOD[] = [
        { adjusted_close: 0.5, volume: 1000, open: 0, high: 0, low: 0, close: 0, date: '' }
      ];
      expect(isPennyStock(data)).toBe(true);
    });

    it('returns false if all adjusted_close values are >= $1', () => {
      const data: DailyEOD[] = [
        { adjusted_close: 5, volume: 1000, open: 0, high: 0, low: 0, close: 0, date: '' }
      ];
      expect(isPennyStock(data)).toBe(false);
    });

    it('returns false if adjusted_close < $1 but volume is 0', () => {
      const data: DailyEOD[] = [
        { adjusted_close: 0.5, volume: 0, open: 0, high: 0, low: 0, close: 0, date: '' }
      ];
      expect(isPennyStock(data)).toBe(false);
    });
  });
});
