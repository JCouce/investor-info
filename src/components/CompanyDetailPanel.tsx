import type { CompanyData } from '../types/company-data.types';
import rawData from '../data.json';
import { calculateGrowthPercentage, getGrowthColorClass } from '../helpers/priceUtils';


interface Props {
  selectedCompanyId: string | null;
}

export default function CompanyDetailPanel({ selectedCompanyId }: Props) {
  const { companies } = rawData;
  const company: CompanyData | undefined = companies.find((c) => c.id === selectedCompanyId);

  if (!selectedCompanyId || !company) {
    return (
      <div className="text-zinc-400 text-center pt-12">
        Selecciona una compañía para ver los detalles
      </div>
    );
  }

  const latest = company.eod.at(-1);
  const growth = calculateGrowthPercentage(company.eod);
  const growthClass = getGrowthColorClass(growth);

  return (
    <div className="p-4 border border-zinc-700 rounded-xl h-[80vh] overflow-y-auto bg-zinc-900">
      <div className="mb-6">
        <h2 className="text-2xl text-white font-bold">{company.name_display}</h2>
        <p className="text-zinc-400 text-sm">{company.ticker}</p>
        <span className={`${growthClass} text-sm`}>
          {growth !== null ? `${growth.toFixed(2)}%` : 'N/A'}
        </span>
        {latest && (
          <div className="mt-4 space-y-2 text-sm text-zinc-300">
            <p>
              <strong>Último cierre:</strong> ${latest.close.toFixed(2)}
            </p>
            <p>
              <strong>Volumen:</strong> {latest.volume.toLocaleString()}
            </p>
            <p>
              <strong>Fecha:</strong> {latest.date}
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-700 pt-4">
        <h3 className="text-lg font-semibold text-white mb-2">Histórico reciente</h3>
        <table className="w-full text-sm text-zinc-300">
          <thead>
            <tr className="text-zinc-500 border-b border-zinc-700">
              <th className="text-left py-1">Fecha</th>
              <th className="text-right py-1">Cierre</th>
              <th className="text-right py-1">Volumen</th>
            </tr>
          </thead>
          <tbody>
            {company.eod
              .slice(-10)
              .reverse()
              .map((eod) => (
                <tr key={eod.date} className="border-b border-zinc-800">
                  <td>{eod.date}</td>
                  <td className="text-right">${eod.close.toFixed(2)}</td>
                  <td className="text-right">{eod.volume.toLocaleString()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
