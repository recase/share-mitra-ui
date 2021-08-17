import { createAction, props } from '@ngrx/store';
import { NewUser, User } from 'src/app/interface';

export const loginAction = createAction(
  '[auth] login',
  props<{ email: string; password: string }>()
);
export const loginSuccessAction = createAction('[auth] loginSuccess');
export const loginFailedAction = createAction('[auth] loginFailed');

export const signupAction = createAction(
  '[auth] signup',
  props<{ newUser: NewUser }>()
);
export const signupSuccessAction = createAction('[auth] signupSuccess');
export const signupFailedAction = createAction('[auth] signupFailed');

export const userInfoAction = createAction('[auth] userInfo');
export const userInfoSuccessAction = createAction(
  '[auth] userInfoSuccess',
  props<{ user: User }>()
);

export const logoutAction = createAction('[auth] logout');
export const logoutSuccessAction = createAction('[auth] logoutSuccess');

export const updateApiLoadingAction = createAction(
  '[auth] apiLoading',
  props<{ flag: boolean }>()
);
export const updateLoginErrorAction = createAction(
  '[auth] loginError',
  props<{ errorMsg: string | null }>()
);
export const updateSignupErrorAction = createAction(
  '[auth] signupError',
  props<{ errorMsg: string | null }>()
);
export const updateUserDetailErrorAction = createAction(
  '[auth] userDetailError',
  props<{ errorMsg: string | null }>()
);
export const resetLoggedInUser = createAction('[auth] resetUser');
export const updateIsAuthenticate = createAction(
  '[auth] isAuthenticated',
  props<{ isAuthenticate: boolean }>()
);
