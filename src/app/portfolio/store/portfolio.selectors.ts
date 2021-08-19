import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PortfolioState } from 'src/app/interface';

export const PORTFOLIO_STATE_NAME = 'portfolio';

const portfolioSelector =
  createFeatureSelector<PortfolioState>(PORTFOLIO_STATE_NAME);

export const portfolioDataSelector = createSelector(
  portfolioSelector,
  (state) => {
    debugger;
    return state.userPortfolioData;
  }
);

export const portfolioApiLoading = createSelector(
  portfolioSelector,
  (state) => {
    return state.portfolioApiLoading;
  }
);
