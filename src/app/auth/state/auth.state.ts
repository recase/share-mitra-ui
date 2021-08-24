import { AuthState } from 'src/app/interface';

export const authState: AuthState = {
  isAuthenticated: null,
  loggedInUser: null,
  apiLoading: false,
  loginErrorMessage: null,
  signupErrorMessage: null,
  userDetailErrorMessage: null,
  apiSuccess: false,
};
