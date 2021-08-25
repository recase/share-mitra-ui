import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  private routerSubscription!: Subscription;
  public activeLink!: string;

  constructor(private store: Store<AuthState>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(userInfoAction());
    this.authenticateSubscription = this.store
      .select(isAuthenticatedSelector)
      .subscribe((isAuthenticated) => {
        if (isAuthenticated !== null) {
          this.isAuthenticated = isAuthenticated;
        }
      });
    this.userSubscription = this.store
      .select(loggedInUserSelector)
      .subscribe((user) => {
        this.user = user;
      });
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routingUrl = event.url.split('/');
        switch (routingUrl[1]) {
          case 'live':
            this.activeLink = 'live';
            break;
          case 'auth':
            if (routingUrl[2] === 'login') this.activeLink = 'login';
            else if (routingUrl[2] === 'signup') this.activeLink = 'signup';
            break;
          case 'portfolio':
            if (routingUrl[2] === 'alerts') this.activeLink = 'alert';
            else if (routingUrl[2] === 'watch-list')
              this.activeLink = 'watchlist';
            else this.activeLink = 'portfolio';
            break;
          default:
            this.activeLink = 'market';
        }
      }
    });
  }

  public toggleNav(): void {
    this.showNav = !this.showNav;
  }

  public logout(): void {
    this.store.dispatch(logoutAction());
  }

  public portfolio(): void {
    this.router.navigate(['portfolio']);
  }

  public navigateTo(link: string[]): void {
    this.showNav = false;
    this.router.navigate(link);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.authenticateSubscription) {
      this.authenticateSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
