import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from 'src/app/interface';

export const AUTH_STATE_NAME = 'auth';

const authSelectors = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const loggedInUserSelector = createSelector(authSelectors, (state) => {
  return state.loggedInUser;
});

export const apiLoadingSelectors = createSelector(authSelectors, (state) => {
  return state.apiLoading;
});

export const loginErrorMsgSelector = createSelector(authSelectors, (state) => {
  return state.loginErrorMessage;
});
export const signupErrorMsgSelector = createSelector(authSelectors, (state) => {
  return state.signupErrorMessage;
});
export const userDetailErrorMsgSelector = createSelector(
  authSelectors,
  (state) => {
    return state.userDetailErrorMessage;
  }
);

export const isAuthenticatedSelector = createSelector(
  authSelectors,
  (state) => {
    return state.isAuthenticated;
  }
);
