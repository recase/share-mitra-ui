import { Action, createReducer, on } from '@ngrx/store';
import { LiveState } from 'src/app/interface';
import { retrieveLivePrice, updateLivePrice } from './live.actions';
import { liveState } from './live.state';

const _liveReducer = createReducer(
  liveState,
  on(updateLivePrice, (state, action) => {
    return {
      ...state,
      liveStockPriceList: action.livePrice,
    };
  })
);

export function liveReducer(state: LiveState | undefined, action: Action) {
  return _liveReducer(state, action);
}
