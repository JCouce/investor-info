import './App.css';
import { useState } from 'react';
import InsiderActivityPanel from './components/InsiderActivityPanel';
import InsiderSummaryPanel from './components/InsiderSummaryPanel';

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

      <section className="p-6 md:grid md:grid-cols-2 md:gap-6 space-y-12 md:space-y-0">
        {/* Panel izquierdo: Resumen */}
        <div className="bg-zinc-950 rounded-xl p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          <h2 className="text-xl font-semibold text-white mb-4">Resumen por Insider</h2>
          <InsiderSummaryPanel
            onSelect={setSelectedInsiderId}
            selectedInsiderId={selectedInsiderId}
          />
        </div>

        {/* Panel derecho: Detalle de transacciones */}
        <div className="bg-zinc-950 rounded-xl p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          <h2 className="text-xl font-semibold text-white mb-4">Detalle de Transacciones</h2>
          <InsiderActivityPanel selectedInsiderId={selectedInsiderId} />
        </div>
      </section>
    </main>
  );
}
