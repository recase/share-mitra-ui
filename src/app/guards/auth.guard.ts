import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { isAuthenticatedSelector } from '../auth/state/auth.selectors';
import { AuthState } from '../interface';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<AuthState>) {}
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthorization();
  }

  private checkAuthorization():
    | Observable<boolean>
    | Promise<boolean>
    | boolean {
    return this.store.select(isAuthenticatedSelector).pipe(
      take(1),
      filter((isAuthenticated) => isAuthenticated != null),
      map((data) => {
        if (data) {
          return true;
        }
        this.router.navigate(['auth', 'login']);
        return false;
      })
    );
  }
}
