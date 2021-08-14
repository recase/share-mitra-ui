import { liveReducer } from '../live-stock/state/live.reducers';
import { LIVE_PRICE_STATE } from '../live-stock/state/live.selectors';
import { stockReducer } from '../stock/store/stock.reducers';
import { STOCK_STATE } from '../stock/store/stock.selectors';

export const appReducer = {
  [STOCK_STATE]: stockReducer,
  [LIVE_PRICE_STATE]: liveReducer,
};
