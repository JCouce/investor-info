import { useEffect, useState } from 'react';
import rawData from '../data.json';
import type { CompanyData } from '../types/company-data.types';

interface Props {
  onSelectCompany: (id: string) => void;
}

export default function CompanySummaryPanel({ onSelectCompany }: Props) {
  const [companies, setCompanies] = useState<CompanyData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setCompanies(rawData.companies);
  }, []);

  const filteredCompanies = companies.filter((company) => {
    const query = searchQuery.toLowerCase();
    return (
      company.name.toLowerCase().includes(query) ||
      company.name_display.toLowerCase().includes(query) ||
      company.ticker.toLowerCase().includes(query)
    );
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

      {filteredCompanies.map((company) => {
        const latest = company.eod.at(-1);
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
              {latest && (
                <div className="text-right text-sm text-zinc-300">
                  <p>Cierre: ${latest.close.toFixed(2)}</p>
                  <p>Volumen: {latest.volume.toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
