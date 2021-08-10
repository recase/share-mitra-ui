export interface StockPrice {
  symbol: string;
  openPrice: number;
  previousClosePrice: number;
  highPrice: number;
  lowPrice: number;
  lastTradedPrice: number;
  change: number;
  totalVolume: number;
}

export interface CompanyData {
  name: string;
  symbol: string;
  instrumentType: string;
  sector: string;
}

export interface Sector {
  name: string;
  regulatoryBody: string;
}
