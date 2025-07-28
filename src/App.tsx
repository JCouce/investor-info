import './App.css';
import InsiderActivityPanel from './components/InsiderActivityPanel';
import InsiderSummaryPanel from './components/InsiderSummaryPanel';

export default function App() {
  return (
    <main className="bg-black min-h-screen text-white">
      <header className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Actividad de Insiders</h1>
        <p className="text-sm text-zinc-400">
          Transacciones relevantes de ejecutivos en empresas públicas
        </p>
      </header>

      <section className="p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold text-white mb-4">Resumen por Insider</h2>
            <InsiderSummaryPanel />
          </div>

          <div className="w-full lg:w-1/2">
            <h2 className="text-xl font-semibold text-white mb-4">Detalle de Transacciones</h2>
            <InsiderActivityPanel />
          </div>
        </div>
      </section>
    </main>
  );
}
