import { createAction, props } from '@ngrx/store';
import {
  Alert,
  CompanyListingData,
  CompletePortfolio,
  Portfolio,
  TargetLoss,
  Transaction,
  Watchlist,
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

export const deletePortfolio = createAction(
  '[portfolio] deletePortfolio',
  props<{ portfolioId: number }>()
);

export const retrieveAlertAction = createAction('[portfolio] retrieveAlert');

export const createAlertAction = createAction(
  '[portfolio] createAlert',
  props<{ alert: Alert }>()
);

export const updateAlertAction = createAction(
  '[portfolio] updateAlert',
  props<{ alert: Alert }>()
);

export const deleteAlertAction = createAction(
  '[portfolio] deleteAlert',
  props<{ alertId: number }>()
);

export const updateAlertList = createAction(
  '[portfolio] updateAlertList',
  props<{ alerts: Alert[] }>()
);

export const retrieveWatchlistAction = createAction(
  '[portfolio] retrieveWatchlist'
);

export const createWatchlistAction = createAction(
  '[portfolio] createWatchlist',
  props<{ watchlist: Watchlist }>()
);

export const updateWatchlistAction = createAction(
  '[portfolio] updateWatchlist',
  props<{ watchlist: Watchlist }>()
);

export const deleteWatchlistAction = createAction(
  '[portfolio] deleteWatchlist',
  props<{ watchlistId: number }>()
);

export const updateWatchlistData = createAction(
  '[portfolio] updateWatchlistData',
  props<{ watchlist: Watchlist[] }>()
);

export const retrieveTargetLossAction = createAction(
  '[portfolio] retrieveTargetLoss'
);

export const createTargetLossAction = createAction(
  '[portfolio] createTargetLoss',
  props<{ targetLoss: TargetLoss }>()
);

export const updateTargetLossAction = createAction(
  '[portfolio] updateTargetLoss',
  props<{ targetLoss: TargetLoss }>()
);

export const deleteTargetLossAction = createAction(
  '[portfolio] deleteTargetLoss',
  props<{ targetLossId: number }>()
);

export const updateTargetLossList = createAction(
  '[portfolio] updateTargetLossList',
  props<{ targetLoss: TargetLoss[] }>()
);

export const updateApiLoading = createAction(
  '[portfolio] updateApiLoading',
  props<{ flag: boolean }>()
);

export const updateApiErrorMsg = createAction(
  '[portfolio] updateApiErrorMsg',
  props<{ msg: string }>()
);

export const partailUpdateTargetLossAction = createAction(
  '[portfolio] partailUpdateTargetLoss',
  props<{ targetLossId: number; data: any }>()
);

export const partailUpdateAlertAction = createAction(
  '[portfolio] partailUpdateAlert',
  props<{ alertId: number; data: any }>()
);
