import { AuthState } from 'src/app/interface';

export const authState: AuthState = {
  isAuthenticated: false,
  loggedInUser: null,
  apiLoading: false,
  loginErrorMessage: null,
  signupErrorMessage: null,
  userDetailErrorMessage: null,
};
