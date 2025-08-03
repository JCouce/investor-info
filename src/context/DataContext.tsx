import { createContext, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import rawData from '../data.json';
import { parseInsiderCompanyData } from '../helpers/parseData';
import type { InsiderData } from '../types/insider-data.types';
import type { CompanyData } from '../types/company-data.types';

interface DataContextType {
  insiders: InsiderData[];
  companies: CompanyData[];
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  // Memoizamos el parseo de datos para evitar recálculos innecesarios
  const parsedData = useMemo(() => {
    try {
      return parseInsiderCompanyData(rawData as any);
    } catch (error) {
      console.error('Error parsing data:', error);
      return { insiders: [], companies: [] };
    }
  }, []);

  const contextValue = useMemo(() => ({
    insiders: parsedData.insiders,
    companies: parsedData.companies,
    isLoading: false, // En el futuro esto podría ser true mientras se cargan datos de una API
  }), [parsedData]);

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
}

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}