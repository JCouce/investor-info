import type { Transaction, InsiderData } from '../../types/insider-data.types';

type Props = {
  insiderName: string;
  insiderRelationship: string;
  companyName: string;
  ticker: string;
  transaction: Transaction;
  holding: InsiderData['holdings'];
};

export default function InsiderCard({
  insiderName,
  insiderRelationship,
  companyName,
  ticker,
  transaction,
  holding,
}: Props) {
  const isBuy = transaction.acquiredOrDisposed === 'A';
  const isSell = transaction.acquiredOrDisposed === 'D';

  return (
    <div className="bg-zinc-900 rounded-2xl shadow p-4 flex flex-col gap-3 border border-zinc-700">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-white">{insiderName}</p>
          <p className="text-sm text-zinc-400 capitalize">{insiderRelationship}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-white font-medium">{companyName}</p>
          <p className="text-xs text-zinc-500">{ticker}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-zinc-400">Acción</p>
          <p
            className={
              isBuy
                ? 'text-green-400 font-semibold'
                : isSell
                ? 'text-red-400 font-semibold'
                : 'text-zinc-300'
            }
          >
            {isBuy ? 'Compra' : isSell ? 'Venta' : 'Neutral'}
          </p>
        </div>
        <div>
          <p className="text-zinc-400">Cantidad</p>
          <p className="text-white font-semibold">
            {transaction.quantity?.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-zinc-400">Precio medio</p>
          <p className="text-white font-semibold">
            ${transaction.price?.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-zinc-400">Valor total</p>
          <p className="text-white font-semibold">
            ${transaction.value?.toLocaleString(undefined, {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <div>
          <p className="text-zinc-400">Acciones tras operación</p>
          <p className="text-white font-semibold">
            {transaction.ownedFollowingTransaction.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-zinc-400">Acciones totales (directas + indirectas)</p>
          <p className="text-white font-semibold">
            {holding.total_shares.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <a
          href={transaction.humanUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 hover:text-zinc-200 underline"
        >
          Ver en SEC →
        </a>
      </div>
    </div>
  );
}
