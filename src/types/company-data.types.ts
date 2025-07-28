export type CompanyData = {
  id: string;
  name: string;
  name_display: string;
  ticker: string;
  eodhd_symbol: string | null;
  eod: DailyEOD[];
};

export type DailyEOD = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted_close: number;
  volume: number;
};
