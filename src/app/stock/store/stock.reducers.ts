import { Action, createReducer, on } from '@ngrx/store';
import { StockState } from 'src/app/interface';
import {
  updateCompanyList,
  updateCompanyLoading,
  updateSectorList,
  updateSectorLoading,
  updateStockPriceList,
  // updateLiveStockPriceList,
  updateStockPriceLoading,
  // updateLiveStockLoading,
} from './stock.actions';
import { stockState } from './stock.state';

const _stockReducer = createReducer(
  stockState,
  on(updateCompanyList, (state, action) => {
    return {
      ...state,
      companies: action.companies,
    };
  }),
  on(updateSectorList, (state, action) => {
    return {
      ...state,
      sectors: action.sectors,
    };
  }),
  // on(updateLiveStockPriceList, (state, action) => {
  //   return {
  //     ...state,
  //     liveStockPriceList: action.liveStockList,
  //   };
  // }),
  on(updateStockPriceList, (state, action) => {
    return {
      ...state,
      stockPriceList: action.stockList,
    };
  }),
  on(updateCompanyLoading, (state, action) => {
    return {
      ...state,
      compantDataLoading: action.companyLoading,
    };
  }),
  on(updateSectorLoading, (state, action) => {
    return {
      ...state,
      sectorDataLoading: action.sectorLoading,
    };
  }),
  on(updateStockPriceLoading, (state, action) => {
    return {
      ...state,
      StockPriceLoading: action.stockPriceLoading,
    };
  })
  // on(updateLiveStockLoading, (state, action) => {
  //   return {
  //     ...state,
  //     liveStockLoading: action.liveStockLoading,
  //   };
  // })
);

export function stockReducer(state: StockState | undefined, action: Action) {
  return _stockReducer(state, action);
}
