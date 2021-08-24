import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthState } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import {
  loginAction,
  loginSuccessAction,
  logoutAction,
  logoutSuccessAction,
  resetLoggedInUser,
  signupAction,
  signupFailedAction,
  signupSuccessAction,
  updateApiLoadingAction,
  updateApiSuccess,
  updateIsAuthenticate,
  updateLoginErrorAction,
  updateSignupErrorAction,
  updateUserDetailErrorAction,
  userInfoAction,
  userInfoSuccessAction,
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AuthState>,
    private api: ApiService,
    private router: Router
  ) {}

  $register = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiLoadingAction({ flag: true }));
        this.store.dispatch(updateApiSuccess({ flag: false }));
        return this.api.signup(action.newUser).pipe(
          map(() => {
            this.store.dispatch(updateApiLoadingAction({ flag: false }));
            this.store.dispatch(updateSignupErrorAction({ errorMsg: null }));
            // this.store.dispatch(updateApiSuccess({ flag: true }));
            return updateApiSuccess({ flag: true });
          }),
          catchError((err) => {
            this.store.dispatch(updateApiSuccess({ flag: false }));
            this.store.dispatch(updateApiLoadingAction({ flag: false }));
            const errors = err.error[Object.keys(err.error)[0]];
            let errorMsg = '';
            if (Array.isArray(errors)) {
              errorMsg = errors.join('\n');
            } else {
              errorMsg = errors;
            }
            return of(
              updateSignupErrorAction({
                errorMsg,
              })
            );
          })
        );
      })
    );
  });

  $login = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiLoadingAction({ flag: true }));
        return this.api.login(action.email, action.password).pipe(
          map((data) => {
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);
            this.store.dispatch(updateApiLoadingAction({ flag: false }));
            this.store.dispatch(updateLoginErrorAction({ errorMsg: null }));
            this.store.dispatch(updateIsAuthenticate({ isAuthenticate: true }));
            return loginSuccessAction();
          }),
          catchError((err) => {
            this.store.dispatch(updateApiLoadingAction({ flag: false }));
            this.store.dispatch(
              updateIsAuthenticate({ isAuthenticate: false })
            );
            const errors = err.error[Object.keys(err.error)[0]];
            let errorMsg = '';
            if (Array.isArray(errors)) {
              errorMsg = errors.join('\n');
            } else {
              errorMsg = errors;
            }
            return of(
              updateLoginErrorAction({
                errorMsg,
              })
            );
          })
        );
      })
    );
  });

  $logout = createEffect(() => {
    return this.actions$.pipe(
      ofType(logoutAction),
      mergeMap(() => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          this.store.dispatch(updateApiLoadingAction({ flag: true }));
          return this.api.logout(refreshToken).pipe(
            map(() => {
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('accessToken');
              this.store.dispatch(updateApiLoadingAction({ flag: false }));
              this.store.dispatch(
                updateIsAuthenticate({ isAuthenticate: false })
              );
              this.store.dispatch(resetLoggedInUser());
              return logoutSuccessAction();
            }),
            catchError(() => {
              return of(updateApiLoadingAction({ flag: false }));
            })
          );
        } else {
          return of(resetLoggedInUser());
        }
      })
    );
  });

  $userInfo = createEffect(() => {
    return this.actions$.pipe(
      ofType(userInfoAction),
      mergeMap(() => {
        this.store.dispatch(updateApiLoadingAction({ flag: true }));
        return this.api.userInfo().pipe(
          map((data) => {
            this.store.dispatch(updateApiLoadingAction({ flag: false }));
            this.store.dispatch(
              updateUserDetailErrorAction({ errorMsg: null })
            );
            this.store.dispatch(updateIsAuthenticate({ isAuthenticate: true }));
            return userInfoSuccessAction({ user: data });
          }),
          catchError((err) => {
            // this.store.dispatch(updateApiLoadingAction({ flag: false }));
            this.store.dispatch(
              updateIsAuthenticate({ isAuthenticate: false })
            );
            return of(updateApiLoadingAction({ flag: false }));
            // const errors = err.error[Object.keys(err.error)[0]];
            // let errorMsg = '';
            // if (Array.isArray(errors)) {
            //   errorMsg = errors.join(' ');
            // } else {
            //   errorMsg = errors;
            // }
            // return of(
            //   updateUserDetailErrorAction({
            //     errorMsg,
            //   })
            // );
          })
        );
      })
    );
  });

  $loginSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccessAction),
        tap(() => {
          this.store.dispatch(userInfoAction());
          this.router.navigate(['portfolio']);
        })
      );
    },
    { dispatch: false }
  );

  $loginPageRedirect = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[logoutSuccessAction]),
        tap(() => {
          this.router.navigate(['auth', 'login']);
        })
      );
    },
    { dispatch: false }
  );

  $singupSuccess = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(signupSuccessAction),
        tap(() => {
          this.router.navigate(['auth', 'login']);
        })
      );
    },
    { dispatch: false }
  );
}
