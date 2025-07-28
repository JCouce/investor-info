'use client';

import { useEffect, useState } from 'react';
import type { InsiderData } from '../../types/insider-data.types';
import { parseInsiderCompanyData } from '../../helpers/parseData';
import rawData from '../../data.json';
import { useFilteredInsiders } from '../../hooks/useFilteredInsiders';

type Props = {
  onSelect: (insiderId: string) => void;
  selectedInsiderId: string | null;
};

function sortInsidersByValue(insiders: InsiderData[]): InsiderData[] {
  return [...insiders].sort(
    (a, b) => Math.abs(b.net_securities_value) - Math.abs(a.net_securities_value)
  );
}


export default function InsiderSummaryPanel({ onSelect, selectedInsiderId }: Props) {
  const [insiders, setInsiders] = useState<InsiderData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_COUNT = 5;

  useEffect(() => {
    const { insiders } = parseInsiderCompanyData(rawData);
    const sorted = sortInsidersByValue(insiders);
    setInsiders(sorted);
  }, []);

  const filteredInsiders = useFilteredInsiders(insiders, searchQuery);
  const visibleInsiders = expanded ? filteredInsiders : filteredInsiders.slice(0, VISIBLE_COUNT);

  return (
    <div className="space-y-6">
      <input
        type="text"
        placeholder="Search insiders..."
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setExpanded(false);
        }}
        className="w-full px-4 py-2 mb-4 rounded-xl bg-zinc-800 text-white placeholder-zinc-500 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <h3>Sorted by total transaction value</h3>
      {visibleInsiders.map((insider) => {
        const {
          insider: insiderInfo,
          company,
          total_securities_purchased,
          total_securities_purchased_value,
          total_securities_sold,
          total_securities_sold_value,
          net_securities,
          net_securities_value,
          holdings,
        } = insider;

        const isBuyer = net_securities > 0;
        const isSeller = net_securities < 0;
        const isSelected = selectedInsiderId === insiderInfo.id;

        return (
          <div
            key={insiderInfo.id}
            onClick={() => onSelect(insiderInfo.id)}
            className={`bg-zinc-900 border rounded-2xl p-4 shadow cursor-pointer transition 
              ${isSelected ? 'border-green-400 bg-zinc-800' : 'border-zinc-700 hover:border-zinc-600'}
            `}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-white">{insiderInfo.name}</h2>
                <p className="text-sm text-zinc-400 capitalize">{insiderInfo.relationship}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{company.name_display}</p>
                <p className="text-xs text-zinc-500">{company.ticker}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div>
                <p className="text-zinc-400">Shares Purchased</p>
                <p className="text-green-400 font-semibold">
                  {total_securities_purchased.toLocaleString()} (${total_securities_purchased_value.toLocaleString(undefined, { maximumFractionDigits: 0 })})
                </p>
              </div>
              <div>
                <p className="text-zinc-400">Shares Sold</p>
                <p className="text-red-400 font-semibold">
                  {total_securities_sold.toLocaleString()} (${total_securities_sold_value.toLocaleString(undefined, { maximumFractionDigits: 0 })})
                </p>
              </div>
              <div>
                <p className="text-zinc-400">Net Balance</p>
                <p className={isBuyer ? 'text-green-400 font-semibold' : isSeller ? 'text-red-400 font-semibold' : 'text-white'}>
                  {net_securities.toLocaleString()} (${net_securities_value.toLocaleString(undefined, { maximumFractionDigits: 0 })})
                </p>
              </div>
              <div>
                <p className="text-zinc-400">Total Shares Owned</p>
                <p className="text-white font-semibold">
                  {holdings.total_shares.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <a
                href={insider.transactions[0]?.humanUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-zinc-400 hover:text-zinc-200 underline"
              >
                View on SEC →
              </a>
            </div>
          </div>
        );
      })}

      {filteredInsiders.length > VISIBLE_COUNT && (
        <div className="text-center pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600"
          >
            {expanded ? 'View Less' : `View ${filteredInsiders.length - VISIBLE_COUNT} More`}
          </button>
        </div>
      )}
    </div>
  );
}
