import { Action, createReducer, on } from '@ngrx/store';
import { PortfolioState } from 'src/app/interface';
import {
  resetPortfolioData,
  updateCompanayList,
  updateCreatePortfolioApiLoading,
  updatePortfolioApiLoading,
  updatePortfolioData,
  updateTransactionApiLoading,
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
  }),
  on(updateCompanayList, (state, action) => {
    return {
      ...state,
      companyList: action.companyList,
    };
  }),
  on(updateCreatePortfolioApiLoading, (state, action) => {
    return {
      ...state,
      createPortfolioApiLoading: action.flag,
    };
  }),
  on(updateTransactionApiLoading, (state, action) => {
    return {
      ...state,
      transactionApiLoading: action.flag,
    };
  })
);

export function PortfolioReducer(
  state: PortfolioState | undefined,
  action: Action
) {
  return _portfolioReducet(state, action);
}
