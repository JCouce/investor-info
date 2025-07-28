import type { CompanyData } from '../../types/company-data.types';
import rawData from '../../data.json';
import {
  calculateGrowthPercentage,
  getGrowthColorClass,
  getVolatilityColorClass,
  isPennyStock,
  getVolumeColorClass
} from '../../helpers/priceUtils';

interface Props {
  selectedCompanyId: string | null;
}

export default function CompanyDetailPanel({ selectedCompanyId }: Props) {
  const { companies } = rawData;
  const company: CompanyData | undefined = companies.find((c) => c.id === selectedCompanyId);

  if (!selectedCompanyId || !company || !company.eod || company.eod.length === 0) {
    return (
      <div className="text-zinc-400 text-center pt-12">
        Selecciona una compañía para ver los detalles
      </div>
    );
  }

  const eod = company.eod;
  const latest = eod.at(-1);
  const growth = calculateGrowthPercentage(eod);
  const growthClass = getGrowthColorClass(growth);
  const averageVolume = Math.round(eod.reduce((sum, d) => sum + d.volume, 0) / eod.length);
  const volumeClass = getVolumeColorClass(latest?.volume || 0);
  const volatility = Math.max(...eod.map((d) => d.high)) - Math.min(...eod.map((d) => d.low));
  const volatilityClass = getVolatilityColorClass(volatility);
  const trend5d = eod.length >= 5 && eod.at(-5)?.close
    ? ((eod.at(-1)!.close - eod.at(-5)!.close) / eod.at(-5)!.close) * 100
    : null;
  const trendClass = getGrowthColorClass(trend5d);
  const bullishDays = eod.filter(d => d.close > d.open).length;
  const bearishDays = eod.filter(d => d.close < d.open).length;
  const validCloses = eod.filter(d => typeof d.close === 'number');
  const highestClose = validCloses.length ? [...validCloses].sort((a, b) => b.close - a.close)[0] : null;
  const lowestClose = validCloses.length ? [...validCloses].sort((a, b) => a.close - b.close)[0] : null;
  const isPenny = isPennyStock(eod);


  return (
    <div className="p-4 border border-zinc-700 rounded-xl h-[80vh] overflow-y-auto bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-2xl text-white font-bold">{company.name_display}</h2>
        <p className="text-zinc-400 text-sm">{company.ticker}</p>
        {isPenny && (
          <span className="inline-block text-xs bg-yellow-500 text-black font-semibold px-2 py-0.5 rounded">
            Penny Stock
          </span>
        )}

      </div>

      {/* Sección: Resumen General */}
      <div className="space-y-2 text-sm text-zinc-300 mb-6">
        {latest && (
          <>
            <p><strong>Último cierre:</strong> ${latest.close.toFixed(2)}</p>
            <p><strong>Volumen último día:</strong> <span className={volumeClass}>{latest.volume.toLocaleString()}</span></p>
            <p><strong>Media de volumen:</strong> {averageVolume.toLocaleString()}</p>
            <p><strong>Fecha:</strong> {latest.date}</p>
          </>
        )}
        <p><strong>Growth total:</strong> <span className={growthClass}>{growth?.toFixed(2)}%</span></p>
        <p><strong>Volatilidad total:</strong> <span className={volatilityClass}>{volatility.toFixed(2)}</span></p>
        {trend5d !== null && (
          <p><strong>Tendencia 5D:</strong> <span className={trendClass}>{trend5d.toFixed(2)}%</span></p>
        )}
      </div>

      {/* Sección: Estadísticas de comportamiento */}
      <div className="border-t border-zinc-700 pt-4 mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Comportamiento</h3>
        <div className="text-sm text-zinc-300 space-y-1">
          <p><strong>Días alcistas:</strong> {bullishDays}</p>
          <p><strong>Días bajistas:</strong> {bearishDays}</p>
          {highestClose && (
            <p><strong>Cierre más alto:</strong> ${highestClose.close.toFixed(2)} ({highestClose.date})</p>
          )}
          {lowestClose && (
            <p><strong>Cierre más bajo:</strong> ${lowestClose.close.toFixed(2)} ({lowestClose.date})</p>
          )}
        </div>
      </div>

      {/* Sección: Histórico */}
      <div className="border-t border-zinc-700 pt-4">
        <h3 className="text-lg font-semibold text-white mb-2">Histórico reciente</h3>
        <table className="w-full text-sm text-zinc-300">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-700">
              <th className="text-left py-1">Fecha</th>
              <th className="text-right py-1">Apertura</th>
              <th className="text-right py-1">Cierre</th>
              <th className="text-right py-1">Volumen</th>
            </tr>
          </thead>
          <tbody>
            {eod.slice(-10).reverse().map((d) => (
              <tr key={d.date} className="border-b border-zinc-800">
                <td>{d.date}</td>
                <td className="text-right">${d.open.toFixed(2)}</td>
                <td className="text-right">${d.close.toFixed(2)}</td>
                <td className="text-right">{d.volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
