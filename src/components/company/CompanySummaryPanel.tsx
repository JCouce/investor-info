import { useEffect, useState } from 'react';
import rawData from '../../data.json';
import type { CompanyData } from '../../types/company-data.types';
import { calculateGrowthPercentage, getGrowthColorClass, getVolumeColorClass, getVolatilityColorClass } from '../../helpers/priceUtils';

interface Props {
  onSelectCompany: (id: string) => void;
}

type SortKey = 'growth' | 'volume' | 'volatility' | 'trend5d';
type SortOrder = 'asc' | 'desc';

export default function CompanySummaryPanel({ onSelectCompany }: Props) {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('growth');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    setCompanies(rawData.companies);
  }, []);

  const handleSortChange = (key: SortKey) => {
    if (key === sortKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const getVolatility = (eod: CompanyData['eod']) => {
    const highs = eod.map((d) => d.high);
    const lows = eod.map((d) => d.low);
    return Math.max(...highs) - Math.min(...lows);
  };

  const get5dTrend = (eod: CompanyData['eod']) => {
    if (eod.length < 5) return 0;
    const last = eod[eod.length - 1].close;
    const prev = eod[eod.length - 5].close;
    return ((last - prev) / prev) * 100;
  };

  const filteredCompanies = companies
    .filter((company) => {
      const query = searchQuery.toLowerCase();
      return (
        company.name.toLowerCase().includes(query) ||
        company.name_display.toLowerCase().includes(query) ||
        company.ticker.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      let valA = 0;
      let valB = 0;
      if (sortKey === 'growth') {
        valA = calculateGrowthPercentage(a.eod) || 0;
        valB = calculateGrowthPercentage(b.eod) || 0;
      } else if (sortKey === 'volume') {
        valA = a.eod.at(-1)?.volume || 0;
        valB = b.eod.at(-1)?.volume || 0;
      } else if (sortKey === 'volatility') {
        valA = getVolatility(a.eod);
        valB = getVolatility(b.eod);
      } else if (sortKey === 'trend5d') {
        valA = get5dTrend(a.eod);
        valB = get5dTrend(b.eod);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Buscar compañía..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full px-3 py-2 rounded bg-zinc-800 text-white placeholder-zinc-400 border border-zinc-700"
      />

      <div className="flex justify-between gap-2 text-sm">
        <button
          onClick={() => handleSortChange('growth')}
          className={`px-2 py-1 rounded border ${sortKey === 'growth' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300'}`}
        >
          Growth
        </button>
        <button
          onClick={() => handleSortChange('volume')}
          className={`px-2 py-1 rounded border ${sortKey === 'volume' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300'}`}
        >
          Volumen
        </button>
        <button
          onClick={() => handleSortChange('volatility')}
          className={`px-2 py-1 rounded border ${sortKey === 'volatility' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300'}`}
        >
          Volatilidad
        </button>
        <button
          onClick={() => handleSortChange('trend5d')}
          className={`px-2 py-1 rounded border ${sortKey === 'trend5d' ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-300'}`}
        >
          5D Trend
        </button>
      </div>

      {filteredCompanies.map((company) => {
        const growth = calculateGrowthPercentage(company.eod);
        const growthClass = getGrowthColorClass(growth);
        const latest = company.eod.at(-1);
        const trend5d = get5dTrend(company.eod);
        const trendClass = getGrowthColorClass(trend5d);
        const highlight = sortKey === 'growth'
          ? <span className={`${growthClass} text-sm`}>Growth: {growth !== null ? `${growth.toFixed(2)}%` : 'N/A'}</span>
          : sortKey === 'volume'
          ? <span className={`${getVolumeColorClass(latest?.volume)} text-sm`}>Volumen: {latest?.volume.toLocaleString() || 'N/A'}</span>
          : sortKey === 'volatility'
          ? <span className={`${getVolatilityColorClass(getVolatility(company.eod))} text-sm`}>Volatilidad: {getVolatility(company.eod).toFixed(2)}</span>
          : <span className={`${trendClass} text-sm`}>5D Trend: {trend5d.toFixed(2)}%</span>;

        return (
          <div
            key={company.id}
            onClick={() => onSelectCompany(company.id)}
            className="cursor-pointer bg-zinc-900 hover:bg-zinc-800 p-4 rounded-xl border border-zinc-700 transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{company.name_display}</h3>
                <p className="text-sm text-zinc-400">{company.ticker}</p>
              </div>
              <div className="text-right text-sm text-zinc-300">
                <p>Cierre: ${latest?.close.toFixed(2)}</p>
                <p>Volumen: {latest?.volume.toLocaleString()}</p>
              </div>
            </div>
            <div className="pt-2">{highlight}</div>
          </div>
        );
      })}
    </div>
  );
}
