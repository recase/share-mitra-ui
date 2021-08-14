import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StockState } from 'src/app/interface';
export const STOCK_STATE = 'stock';

const getStockSelector = createFeatureSelector<StockState>(STOCK_STATE);

export const companiesSelector = createSelector(getStockSelector, (state) => {
  return state.companies;
});

export const sectorSelector = createSelector(getStockSelector, (state) => {
  return state.sectors;
});

export const stockPriceSelector = createSelector(getStockSelector, (state) => {
  return state.stockPriceList;
});
// export const liveStockPriceSelector = createSelector(
//   getStockSelector,
//   (state) => {
//     return state.liveStockPriceList;
//   }
// );

export const companyLoading = createSelector(getStockSelector, (state) => {
  return state.compantDataLoading;
});
export const sectorLoading = createSelector(getStockSelector, (state) => {
  return state.sectorDataLoading;
});
export const stockPriceLoading = createSelector(getStockSelector, (state) => {
  return state.StockPriceLoading;
});
