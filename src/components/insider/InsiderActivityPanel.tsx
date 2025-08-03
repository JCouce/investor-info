'use client';

import { useMemo } from 'react';
import type { Transaction } from '../../types/insider-data.types';
import InsiderCard from './InsiderCard';
import { useData } from '../../context/DataContext';



type Props = {
  selectedInsiderId: string | null;
};

export default function InsiderActivityPanel({ selectedInsiderId }: Props) {
  const { insiders } = useData();

  // Memoizamos la búsqueda del insider seleccionado
  const selected = useMemo(() => {
    return selectedInsiderId ? insiders.find((i) => i.insider.id === selectedInsiderId) : null;
  }, [insiders, selectedInsiderId]);

  if (!selectedInsiderId) {
    return (
      <div className="text-zinc-400 p-6 text-center">
        Select an insider to view their transactions.
      </div>
    );
  }

  if (!selected || selected.transactions.length === 0) {
    return (
      <div className="text-zinc-400 p-6 text-center">
        No transactions available for this insider.
      </div>
    );
  }

 return (
  <div className="space-y-6">
    {selected.transactions
      .slice()
      .sort((a, b) => new Date(b.filingDate).getTime() - new Date(a.filingDate).getTime())
      .map((transaction: Transaction) => (
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
