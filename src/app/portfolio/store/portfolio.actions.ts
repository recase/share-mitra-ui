import { createAction, props } from '@ngrx/store';
import {
  CompanyListingData,
  CompletePortfolio,
  Portfolio,
  Transaction,
} from 'src/app/interface';

export const retrievePortfolioData = createAction(
  '[portfolio] retrievePortfolio'
);

export const updatePortfolioData = createAction(
  '[portfolio] updatePortfolioData',
  props<{ completePortfolio: CompletePortfolio }>()
);

export const resetPortfolioData = createAction('[portfolio] resetPortfolio');

export const updatePortfolioApiLoading = createAction(
  '[portfolio] updateApiLoading',
  props<{ flag: boolean }>()
);

export const retrieveCompanyList = createAction(
  '[jportfolio] retrieveCompanyList'
);

export const updateCompanayList = createAction(
  '[portfolio] updateCompoanyList',
  props<{ companyList: CompanyListingData[] }>()
);

export const createPortfolio = createAction(
  '[portfolio] createPortfolio',
  props<{ portfolio: Portfolio }>()
);

export const createPortfolioSuccess = createAction(
  '[portfolio] createPoftfolioSuccess'
);

export const updateCreatePortfolioApiLoading = createAction(
  '[portfolio] updateCreatePortfolioApiLoading',
  props<{ flag: boolean }>()
);

export const createTransaction = createAction(
  '[portfolio] createTransaction',
  props<{ transaction: Transaction }>()
);

export const transactionSuccess = createAction(
  '[portfolio] transactionSuccess'
);

export const updateTransaction = createAction(
  '[portfolio] updateTransaction',
  props<{ transaction: Transaction }>()
);

export const deleteTransaction = createAction(
  '[portfolio] deleteTransaction',
  props<{ transactionId: number }>()
);

export const updateTransactionApiLoading = createAction(
  '[portfolio] updateTransactionApiLoading',
  props<{ flag: boolean }>()
);
