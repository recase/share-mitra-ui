import { authReducer } from '../auth/state/auth.reducers';
import { AUTH_STATE_NAME } from '../auth/state/auth.selectors';

export const appReducer = {
  [AUTH_STATE_NAME]: authReducer,
};
