export interface LiveStockPrice {
  id: number;
  symbol: string;
  lastTradedPrice: number;
  openPrice: number;
  previousClosePrice: number;
  highPrice: number;
  lowPrice: number;
  lastTradedTime: string;
  change: number;
  lastTradedVolume: number;
  totalVolume: number;
}

export interface PortfolioSummary {
  totalInvestment: number;
  totalAmount: number;
  totalProfit: number;
  todaysProfit: number;
  actualProfit: number;
}

export interface PortfolioDetail {
  symbol: string;
  name: string;
  totalStock: number;
  lastTradedPrice: number;
  totalStockPrice: number;
  stockType: string;
  totalInvestment: number;
  totalStockInvestment: number;
  profitPercentage: number;
  change: number;
  overallProfit: number;
  todaysProfit: number;
}

export interface StockPrice {
  id: number;
  symbol: string;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  previousClosePrice: number;
  closePrice: number;
  percentageChange: number;
  totalvolume: number;
  date: string;
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

export interface LiveStockList {
  date: string;
  stocks: LiveStockPrice[];
}

export interface StockPriceList {
  date: string;
  stocksPrice: StockPrice[];
}

export interface StockState {
  companies: CompanyData[];
  sectors: Sector[];
  stockPriceList: StockPriceList;
  compantDataLoading: boolean;
  sectorDataLoading: boolean;
  StockPriceLoading: boolean;
}

export interface LiveState {
  liveStockPriceList: LiveStockList;
  // liveStockLoading: boolean;
}

export interface NewUser {
  email: string;
  firstName: string;
  middleName: string | null;
  lastName: string;
  password: string;
}
