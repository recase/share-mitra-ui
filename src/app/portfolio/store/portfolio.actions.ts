import { createAction, props } from '@ngrx/store';
import { CompletePortfolio } from 'src/app/interface';

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
