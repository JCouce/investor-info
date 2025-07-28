'use client';

import { useEffect, useState } from 'react';
import type { InsiderData, Transaction } from '../types/insider-data.types';
import { parseInsiderCompanyData } from '../helpers/parseData';
import InsiderCard from './InsiderCard';
import rawData from '../data.json'; // ✅ importa el JSON directamente


export default function InsiderActivityPanel() {
  const [insiders, setInsiders] = useState<InsiderData[] | null>(null);
  const [expanded, setExpanded] = useState(false);
  const VISIBLE_COUNT = 5;

  useEffect(() => {
    const { insiders } = parseInsiderCompanyData(rawData);
    setInsiders(insiders);
  }, []);

  if (!insiders) {
    return (
      <div className="text-white p-6 text-center">
        Cargando transacciones de insiders...
      </div>
    );
  }

  if (insiders.length === 0) {
    return (
      <div className="text-zinc-400 p-6 text-center">
        No se encontraron transacciones recientes.
      </div>
    );
  }

  const visibleInsiders = expanded ? insiders : insiders.slice(0, VISIBLE_COUNT);

  return (
    <div className="space-y-6">
      {visibleInsiders.map((insider) =>
        insider.transactions.map((transaction: Transaction) => (
          <InsiderCard
            key={transaction.id}
            insiderName={insider.insider.name}
            insiderRelationship={insider.insider.relationship}
            companyName={insider.company.name_display}
            ticker={insider.company.ticker}
            transaction={transaction}
            holding={insider.holdings}
          />
        ))
      )}

      {insiders.length > VISIBLE_COUNT && (
        <div className="text-center pt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm px-4 py-2 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600"
          >
            {expanded ? 'Ver menos' : `Ver ${insiders.length - VISIBLE_COUNT} más`}
          </button>
        </div>
      )}
    </div>
  );
}
