import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from 'src/app/interface';

export const PORTFOLIO_STATE_NAME = 'portfolio';

const portfolioSelector =
  createFeatureSelector<PortfolioState>(PORTFOLIO_STATE_NAME);

export const portfolioDataSelector = createSelector(
  portfolioSelector,
  (state) => {
    return state.userPortfolioData;
  }
);

export const portfolioApiLoading = createSelector(
  portfolioSelector,
  (state) => {
    return state.portfolioApiLoading;
  }
);

export const companyListSelector = createSelector(
  portfolioSelector,
  (state) => {
    return state.companyList;
  }
);

export const createPortfolioApiSelector = createSelector(
  portfolioSelector,
  (state) => {
    return state.createPortfolioApiLoading;
  }
);

export const transactionApiLoadingSelector = createSelector(
  portfolioSelector,
  (state) => {
    return state.transactionApiLoading;
  }
);

export const alertSelector = createSelector(portfolioSelector, (state) => {
  return state.alertList;
});

export const watchlistSelector = createSelector(portfolioSelector, (state) => {
  return state.watchlists;
});

export const targetLossSelector = createSelector(portfolioSelector, (state) => {
  return state.targetLossList;
});

export const apiErrorMegSelector = createSelector(
  portfolioSelector,
  (state) => {
    return state.apiErrorMsg;
  }
);

export const apiLoadingSelector = createSelector(portfolioSelector, (state) => {
  return state.apiLoading;
});
