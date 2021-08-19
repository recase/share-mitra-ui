import { Action, createReducer, on } from '@ngrx/store';
import { PortfolioState } from 'src/app/interface';
import {
  resetPortfolioData,
  updatePortfolioApiLoading,
  updatePortfolioData,
} from './portfolio.actions';
import { portfolioState } from './portfolio.state';

const _portfolioReducet = createReducer(
  portfolioState,
  on(updatePortfolioData, (state, action) => {
    return {
      ...state,
      userPortfolioData: action.completePortfolio,
    };
  }),
  on(resetPortfolioData, (state) => {
    return {
      ...state,
      completePortfolio: null,
    };
  }),
  on(updatePortfolioApiLoading, (state, action) => {
    return {
      ...state,
      portfolioApiLoading: action.flag,
    };
  })
);

export function PortfolioReducer(
  state: PortfolioState | undefined,
  action: Action
) {
  return _portfolioReducet(state, action);
}
