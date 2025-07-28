export type InsiderData = {
  insider: {
    name: string;
    cik: string;
    id: string;
    relationship: string;
  };
  company: {
    id: string;
    name: string;
    name_display: string;
    ticker: string;
    eodhd_symbol: string;
  };
  total_securities_purchased: number;
  total_securities_purchased_value: number;
  total_securities_sold: number;
  total_securities_sold_value: number;
  net_securities: number;
  net_securities_value: number;
  holdings: {
    direct_shares: number;
    indirect_shares: number;
    derivative_shares: number;
    derivative_potential_shares: number;
    total_shares: number;
    last_transactions: LastTransaction[];
  };
  transactions: Transaction[];
};

export type LastTransaction = {
  transaction_category: string;
  security_title_id: string;
  security_title: string;
  transaction_date: string;
  shares: number | null;
  price_per_share: number | null;
  acquired_or_disposed: 'D' | 'A' | 'N/A' | string;
  shares_owned_following_transaction: number;
  direct_or_indirect_ownership: 'D' | 'I' | string;
  nature_of_ownership: string;
  security_type: string | null;
  exercise_date: string | null;
  expiration_date: string | null;
  form_id: string;
  filing_date: string;
  report_date: string;
  accession_number: string;
  human_url: string;
};

export type Transaction = {
  id: string;
  humanUrl: string;
  acquiredOrDisposed: 'D' | 'A' | 'N/A' | string;
  directOrIndirectOwnership: 'D' | 'I' | string;
  filingDate: string;
  isDerivative: boolean;
  planned: boolean;
  securityTitle: string;
  transactionCoding: string;
  quantity: number | null;
  price: number | null;
  value?: number | null;
  footnotes?: { [key: string]: string[] | undefined } | null;
  ownedFollowingTransaction: number;
  originalTransactions?: OriginalTransaction[];
  natureOfOwnership: string;
  groupType?: string;
  totalValue?: number | null;
  totalQuantity?: number | null;
  averagePrice?: number | null;
  transactionCount?: number | null;
};

export type OriginalTransaction = {
  id: string;
  humanUrl: string;
  acquiredOrDisposed: 'D' | 'A' | 'N/A' | string;
  directOrIndirectOwnership: 'D' | 'I' | string;
  filingDate: string;
  isDerivative: boolean;
  planned: boolean;
  footnotes?: { [key: string]: string[] | undefined } | null;
  price: number | null;
  quantity: number | null;
  securityTitle: string;
  transactionCoding: string;
  ownedFollowingTransaction: number;
  natureOfOwnership: string;
};
