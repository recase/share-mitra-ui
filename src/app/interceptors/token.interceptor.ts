import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../interface';
import { updateIsAuthenticate } from '../auth/state/auth.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private api: ApiService, private store: Store<AuthState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.api.getToken();
    if (token) {
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          this.api.getRefreshToken()
        ) {
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(
    request: HttpRequest<unknown>,
    token: string
  ): HttpRequest<unknown> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return request;
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      localStorage.removeItem('accessToken');

      return this.api.refreshToken().pipe(
        switchMap((token: { access: string }) => {
          this.isRefreshing = false;
          localStorage.setItem('accessToken', token.access);
          this.store.dispatch(updateIsAuthenticate({ isAuthenticate: true }));
          this.refreshTokenSubject.next(token.access);
          return next.handle(this.addToken(request, token.access));
        }),
        catchError(() => {
          this.store.dispatch(updateIsAuthenticate({ isAuthenticate: false }));
          return next.handle(request);
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((accessToken) => {
          return next.handle(this.addToken(request, accessToken));
        })
      );
    }
  }
}
