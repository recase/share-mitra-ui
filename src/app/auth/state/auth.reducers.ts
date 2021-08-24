import { Action, createReducer, on } from '@ngrx/store';
import { AuthState } from 'src/app/interface';
import {
  logoutSuccessAction,
  resetLoggedInUser,
  updateApiLoadingAction,
  updateApiSuccess,
  updateIsAuthenticate,
  updateLoginErrorAction,
  updateSignupErrorAction,
  updateUserDetailErrorAction,
  userInfoSuccessAction,
} from './auth.actions';
import { authState } from './auth.state';

const _authReducer = createReducer(
  authState,
  on(userInfoSuccessAction, (state, action) => {
    return {
      ...state,
      loggedInUser: action.user,
    };
  }),
  on(logoutSuccessAction, (state) => {
    return {
      ...state,
      loggedInUser: null,
    };
  }),
  on(updateApiLoadingAction, (state, action) => {
    return {
      ...state,
      apiLoading: action.flag,
    };
  }),
  on(updateLoginErrorAction, (state, action) => {
    return {
      ...state,
      loginErrorMessage: action.errorMsg,
    };
  }),
  on(updateSignupErrorAction, (state, action) => {
    return {
      ...state,
      signupErrorMessage: action.errorMsg,
    };
  }),
  on(updateUserDetailErrorAction, (state, action) => {
    return {
      ...state,
      userDetailErrorMessage: action.errorMsg,
    };
  }),
  on(resetLoggedInUser, (state) => {
    return {
      ...state,
      loggedInUser: null,
    };
  }),
  on(updateIsAuthenticate, (state, action) => {
    return {
      ...state,
      isAuthenticated: action.isAuthenticate,
    };
  }),
  on(updateApiSuccess, (state, action) => {
    return {
      ...state,
      apiSuccess: action.flag,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
