import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LiveState } from 'src/app/interface';

export const LIVE_PRICE_STATE = 'livePriceState';
const livePriceSelector = createFeatureSelector<LiveState>(LIVE_PRICE_STATE);

export const retrieveLivePriceState = createSelector(
  livePriceSelector,
  (state) => {
    return state.liveStockPriceList;
  }
);
