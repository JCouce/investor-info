// Tipos importables desde tus modelos
import type { InsiderData }  from '../types/insider-data.types';
import type { CompanyData } from '../types/company-data.types';

type RawData = {
  insiders: InsiderData[];
  companies: CompanyData[];
};

type ParsedData = {
  insiders: InsiderData[];
  companies: CompanyData[];
};

/**
 * Separa y transforma datos brutos de insiders y compañías.
 * - Filtra insiders sin transacciones.
 * - Ordena datos EOD de cada compañía en orden descendente (más reciente primero).
 */
export function parseInsiderCompanyData(data: RawData): ParsedData {
  const insiders = data.insiders.filter((insider) => insider.transactions?.length > 0);

  const companies = data.companies.map((company) => ({
    ...company,
    eod: [...company.eod].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    ),
  }));

  return { insiders, companies };
}
