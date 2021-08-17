import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { logoutAction, userInfoAction } from 'src/app/auth/state/auth.actions';
import {
  isAuthenticatedSelector,
  loggedInUserSelector,
} from 'src/app/auth/state/auth.selectors';
import { AuthState, User } from 'src/app/interface';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  public showNav = false;
  public user!: User | null;
  public isAuthenticated!: boolean;
  private userSubscription!: Subscription;
  private authenticateSubscription!: Subscription;

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(userInfoAction());
    this.authenticateSubscription = this.store
      .select(isAuthenticatedSelector)
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });
    this.userSubscription = this.store
      .select(loggedInUserSelector)
      .subscribe((user) => {
        this.user = user;
      });
  }

  public toogleNav(): void {
    this.showNav = !this.showNav;
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }

  public portfolio(): void {
    this.router.navigate(['portfolio']);
  }

  public navigateTo(link: string[]): void {
    this.router.navigate(link);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.authenticateSubscription) {
      this.authenticateSubscription.unsubscribe();
    }
  }
}
