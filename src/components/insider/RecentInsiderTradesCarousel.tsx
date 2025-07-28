'use client';

import { useEffect, useState } from 'react';
import rawData from '../../data.json';
import { parseInsiderCompanyData } from '../../helpers/parseData';
import type { InsiderData, LastTransaction } from '../../types/insider-data.types';

type TransactionWithMeta = LastTransaction & {
  insiderName: string;
  insiderRole: string;
  companyName: string;
  ticker: string;
};

export default function RecentInsiderTradesCarousel() {
  const [transactions, setTransactions] = useState<TransactionWithMeta[]>([]);

  useEffect(() => {
    const { insiders } = parseInsiderCompanyData(rawData);

    const allTransactions: TransactionWithMeta[] = insiders.flatMap((entry: InsiderData) =>
      entry.holdings.last_transactions.map((tx) => ({
        ...tx,
        insiderName: entry.insider.name,
        insiderRole: entry.insider.relationship,
        companyName: entry.company.name_display,
        ticker: entry.company.ticker,
      }))
    );

    allTransactions.sort((a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime());

    setTransactions(allTransactions.slice(0, 50)); // top 50
  }, []);

  return (
    <div className="w-full border-b border-zinc-800 bg-zinc-900 py-2 overflow-hidden relative">
      <div className="flex whitespace-nowrap animate-scroll px-4 gap-6">
        {transactions.map((tx, index) => {
          const isBuy = tx.acquired_or_disposed === 'A';
          const color = isBuy ? 'text-green-400' : 'text-red-400';
          const verb = isBuy ? 'bought' : 'sold';
          const date = new Date(tx.transaction_date).toLocaleDateString();

          return (
            <a
              key={index}
              href={tx.human_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-sm text-zinc-200 shadow"
            >
              <p className="font-medium">{tx.insiderName}</p>
              <p className="text-xs text-zinc-400">{tx.insiderRole}</p>
              <p className={`${color}`}>
                {verb} {tx.shares?.toLocaleString()} shares of {tx.companyName} ({tx.ticker})
              </p>
              <p className="text-xs text-zinc-500">{date}</p>
            </a>
          );
        })}
      </div>
    </div>
  );
}
