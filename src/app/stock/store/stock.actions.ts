import { createAction, props } from '@ngrx/store';
import { CompanyData, Sector, StockList } from 'src/app/interface';

export const retrieveCompanyData = createAction('[stock] retrieveCompanyData');
export const updateCompanyList = createAction(
  '[stock] updateCompanyList',
  props<{ companies: CompanyData[] }>()
);
export const retrieveSectorData = createAction('[stock] retrieveSectorData');
export const updateSectorList = createAction(
  '[stock] updateSectorList',
  props<{ sectors: Sector[] }>()
);
export const retrieveStockPrice = createAction('[stock] retrieveStockData');
export const updateStockPriceList = createAction(
  '[stock] updateStockPriceList',
  props<{ stockList: StockList }>()
);
export const updateCompanyLoading = createAction(
  '[stock] updateCompanyLoading',
  props<{ companyLoading: boolean }>()
);
export const updateSectorLoading = createAction(
  '[stock] updateSectorLoading',
  props<{ sectorLoading: boolean }>()
);
export const updateStockPriceLoading = createAction(
  '[stock] updateStockPriceLoading',
  props<{ stockPriveLoading: boolean }>()
);
