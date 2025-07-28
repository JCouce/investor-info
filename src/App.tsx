import './App.css';
import InsiderActivityPanel from './components/InsiderActivityPanel';
import InsiderSummaryPanel from './components/InsiderSummaryPanel';
import { useState } from 'react';

export default function App() {
  const [selectedInsiderId, setSelectedInsiderId] = useState<string | null>(null);

  return (
    <main className="bg-black min-h-screen text-white">
      <header className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Actividad de Insiders</h1>
        <p className="text-sm text-zinc-400">
          Transacciones relevantes de ejecutivos en empresas públicas
        </p>
      </header>

      <section className="h-[calc(100vh-96px)] p-6"> {/* 96px = altura header */}
        <div className="flex flex-col lg:flex-row gap-8 h-full">
          <div className="w-full lg:w-1/2 h-full overflow-y-auto">
            <h2 className="text-xl font-semibold text-white mb-4 sticky top-0 bg-black z-10 py-2">
              Resumen por Insider
            </h2>
            <InsiderSummaryPanel
              onSelect={setSelectedInsiderId}
              selectedInsiderId={selectedInsiderId}
            />
          </div>

          <div className="w-full lg:w-1/2 h-full overflow-y-auto">
            <h2 className="text-xl font-semibold text-white mb-4 sticky top-0 bg-black z-10 py-2">
              Detalle de Transacciones
            </h2>
            <InsiderActivityPanel selectedInsiderId={selectedInsiderId} />
          </div>
        </div>
      </section>
    </main>
  );
}
