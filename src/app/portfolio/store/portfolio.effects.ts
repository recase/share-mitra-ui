import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PortfolioState } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import {
  retrievePortfolioData,
  updatePortfolioApiLoading,
  updatePortfolioData,
} from './portfolio.actions';

@Injectable()
export class PortfolioEffects {
  constructor(
    private action$: Actions,
    private api: ApiService,
    private store: Store<PortfolioState>
  ) {}

  $retrievePortfolio = createEffect(() => {
    return this.action$.pipe(
      ofType(retrievePortfolioData),
      mergeMap(() => {
        this.store.dispatch(updatePortfolioApiLoading({ flag: true }));
        return this.api.retrievePortfolioData().pipe(
          map((data) => {
            debugger;
            this.store.dispatch(updatePortfolioApiLoading({ flag: false }));
            return updatePortfolioData({ completePortfolio: data });
          }),
          catchError((err) => {
            return of(updatePortfolioApiLoading({ flag: false }));
          })
        );
      })
    );
  });
}
