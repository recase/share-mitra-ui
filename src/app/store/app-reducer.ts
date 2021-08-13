import { stockReducer } from '../stock/store/stock.reducers';
import { STOCK_STATE } from '../stock/store/stock.selectors';

export const appReducer = {
  [STOCK_STATE]: stockReducer,
};
