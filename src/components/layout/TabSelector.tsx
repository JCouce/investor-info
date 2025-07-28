type TabOption = 'insiders' | 'companies';

interface TabSelectorProps {
  activeTab: TabOption;
  onTabChange: (tab: TabOption) => void;
}

export default function TabSelector({ activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex space-x-4 border-b border-zinc-800 mb-6 px-6">
      <button
        onClick={() => onTabChange('insiders')}
        className={`py-2 px-4 text-sm font-medium ${
          activeTab === 'insiders' ? 'border-b-2 border-white text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        Insiders
      </button>
      <button
        onClick={() => onTabChange('companies')}
        className={`py-2 px-4 text-sm font-medium ${
          activeTab === 'companies' ? 'border-b-2 border-white text-white' : 'text-zinc-400 hover:text-white'
        }`}
      >
        Companies
      </button>
    </div>
  );
}
