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
  id: number;
  name: string;
  symbol: string;
  instrumentType: string;
  sector: string;
}

export interface Sector {
  id: number;
  name: string;
  regulatoryBody: string;
}

export interface StockList {
  date: Date;
  stocks: StockPrice[];
}

export interface StockState {
  companies: CompanyData[];
  sectors: Sector[];
  stockPriceList: StockList | undefined;
  compantDataLoading: boolean;
  sectorDataLoading: boolean;
  StockPriceDateLoading: boolean;
}
