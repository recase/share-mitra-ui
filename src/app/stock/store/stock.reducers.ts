import { Action, createReducer, on } from '@ngrx/store';
import { StockState } from 'src/app/interface';
import {
  updateCompanyList,
  updateCompanyLoading,
  updateSectorList,
  updateSectorLoading,
  updateStockPriceList,
  updateStockPriceLoading,
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
      StockPriceDateLoading: action.stockPriveLoading,
    };
  })
);

export function stockReducer(state: StockState | undefined, action: Action) {
  return _stockReducer(state, action);
}
