import './App.css';
import { useState } from 'react';
import InsiderActivityPanel from './components/insider/InsiderActivityPanel';
import InsiderSummaryPanel from './components/insider/InsiderSummaryPanel';
import TabSelector from './components/layout/TabSelector';
import CompanyDetailPanel from './components/company/CompanyDetailPanel';
import CompanySummaryPanel from './components/company/CompanySummaryPanel';
import RecentInsiderTradesCarousel from './components/insider/RecentInsiderTradesCarousel';

export default function App() {
  const [activeTab, setActiveTab] = useState<'insiders' | 'companies'>('insiders');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedInsiderId, setSelectedInsiderId] = useState<string | null>(null);

  return (
    <main className="bg-black text-white flex flex-col h-screen">
      <header className="p-6 border-b border-zinc-800 shrink-0">
        <h1 className="text-2xl font-bold text-white">Financial Monitoring</h1>
        <p className="text-sm text-zinc-400">
          Monitoring insider transactions and the evolution of public companies.
        </p>
      </header>

      <div className="shrink-0">
        <RecentInsiderTradesCarousel />
      </div>

      <div className="shrink-0 px-6 pt-4">
        <TabSelector activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <section className="flex-1 overflow-hidden p-6 pt-4 flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        {activeTab === 'insiders' && (
          <>
            <div className="md:w-1/2 h-full overflow-y-auto pr-2">
              <h2 className="text-xl font-semibold text-white mb-4">Insider Summary</h2>
              <InsiderSummaryPanel
                onSelect={setSelectedInsiderId}
                selectedInsiderId={selectedInsiderId}
              />
            </div>
            <div className="md:w-1/2 h-full overflow-y-auto pr-2">
              <h2 className="text-xl font-semibold text-white mb-4">Transaction Details</h2>
              <InsiderActivityPanel selectedInsiderId={selectedInsiderId} />
            </div>
          </>
        )}

        {activeTab === 'companies' && (
          <>
            <div className="md:w-1/2 h-full overflow-y-auto pr-2">
              <h2 className="text-xl font-semibold text-white mb-4">Company List</h2>
              <CompanySummaryPanel onSelectCompany={setSelectedCompany} />
            </div>
            <div className="md:w-1/2 h-full overflow-y-auto pr-2">
              <h2 className="text-xl font-semibold text-white mb-4">Company Details</h2>
              <CompanyDetailPanel selectedCompanyId={selectedCompany} />
            </div>
          </>
        )}
      </section>
    </main>
  );
}
