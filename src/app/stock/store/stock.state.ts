import { StockState } from 'src/app/interface';

export const stockState: StockState = {
  companies: [],
  sectors: [],
  stockPriceList: { date: '', stocksPrice: [] },
  // liveStockPriceList: undefined,
  // liveStockLoading: false,
  StockPriceLoading: false,
  compantDataLoading: false,
  sectorDataLoading: false,
};
