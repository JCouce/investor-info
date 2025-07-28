import './App.css';
import { useState } from 'react';
import InsiderActivityPanel from './components/insider/InsiderActivityPanel';
import InsiderSummaryPanel from './components/layout/InsiderSummaryPanel';
import TabSelector from './components/layout/TabSelector';
import CompanyDetailPanel from './components/company/CompanyDetailPanel';
import CompanySummaryPanel from './components/company/CompanySummaryPanel';

export default function App() {
  const [activeTab, setActiveTab] = useState<'insiders' | 'companies'>('insiders');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedInsiderId, setSelectedInsiderId] = useState<string | null>(null);

  return (
    <main className="bg-black min-h-screen text-white">
      <header className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">Actividad Financiera</h1>
        <p className="text-sm text-zinc-400">
          Monitoreo de transacciones de insiders y evolución de compañías públicas.
        </p>
      </header>

      <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'insiders' && (
        <section className="p-6 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="md:w-1/2 h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold text-white mb-4">Resumen por Insider</h2>
            <InsiderSummaryPanel
              onSelect={setSelectedInsiderId}
              selectedInsiderId={selectedInsiderId}
            />
          </div>
          <div className="md:w-1/2 h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold text-white mb-4">Detalle de Transacciones</h2>
            <InsiderActivityPanel selectedInsiderId={selectedInsiderId} />
          </div>
        </section>
      )}

      {activeTab === 'companies' && (
        <section className="p-6 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
          <div className="md:w-1/2 h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold text-white mb-4">Lista de Compañías</h2>
            <CompanySummaryPanel onSelectCompany={setSelectedCompany} />
          </div>
          <div className="md:w-1/2 h-[calc(100vh-200px)] overflow-y-auto pr-2">
            <h2 className="text-xl font-semibold text-white mb-4">Detalle de Compañía</h2>
            <CompanyDetailPanel selectedCompanyId={selectedCompany} />
          </div>
        </section>
      )}
    </main>
  );
}
