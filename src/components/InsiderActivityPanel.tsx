'use client';

import { useEffect, useState } from 'react';
import type { InsiderData, Transaction } from '../types/insider-data.types';
import { parseInsiderCompanyData } from '../helpers/parseData';
import InsiderCard from './InsiderCard';
import rawData from '../data.json'; // ✅ importa el JSON directamente

type Props = {
  selectedInsiderId: string | null;
};

export default function InsiderActivityPanel({ selectedInsiderId }: Props) {
  const [insiders, setInsiders] = useState<InsiderData[] | null>(null);

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

  if (!selectedInsiderId) {
    return (
      <div className="text-zinc-400 p-6 text-center">
        Selecciona un insider para ver sus transacciones.
      </div>
    );
  }

  const selected = insiders.find((i) => i.insider.id === selectedInsiderId);

  if (!selected || selected.transactions.length === 0) {
    return (
      <div className="text-zinc-400 p-6 text-center">
        No hay transacciones disponibles para este insider.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {selected.transactions.map((transaction: Transaction) => (
        <InsiderCard
          key={transaction.id}
          insiderName={selected.insider.name}
          insiderRelationship={selected.insider.relationship}
          companyName={selected.company.name_display}
          ticker={selected.company.ticker}
          transaction={transaction}
          holding={selected.holdings}
        />
      ))}
    </div>
  );
}
