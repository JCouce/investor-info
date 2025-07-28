'use client';

import { useEffect, useState } from 'react';
import type { InsiderData, Transaction } from '../types/insider-data.types';
import { parseInsiderCompanyData } from '../helpers/parseData';
import InsiderCard from './InsiderCard';
import rawData from '../data.json'; // ✅ importa el JSON directamente

export default function InsiderActivityPanel() {
  const [insiders, setInsiders] = useState<InsiderData[] | null>(null);

  useEffect(() => {
    // ✅ los datos ya están cargados al importar
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

  return (
    <div className="bg-black min-h-screen p-6 space-y-6">
      {insiders.map((insider) =>
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
    </div>
  );
}
