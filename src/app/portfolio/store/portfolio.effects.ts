import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { PortfolioState } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import {
  createPortfolio,
  createPortfolioSuccess,
  createTransaction,
  deleteTransaction,
  retrieveCompanyList,
  retrievePortfolioData,
  transactionSuccess,
  updateCompanayList,
  updateCreatePortfolioApiLoading,
  updatePortfolioApiLoading,
  updatePortfolioData,
  updateTransaction,
  updateTransactionApiLoading,
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

  $retrieveCompanyList = createEffect(
    () => {
      return this.action$.pipe(
        ofType(retrieveCompanyList),
        mergeMap(() => {
          return this.api.retrieveCompanyListing().pipe(
            map((data) => {
              this.store.dispatch(updateCompanayList({ companyList: data }));
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  $createPortfolio = createEffect(() => {
    return this.action$.pipe(
      ofType(createPortfolio),
      mergeMap((action) => {
        this.store.dispatch(updateCreatePortfolioApiLoading({ flag: true }));
        return this.api.createPortfolio(action.portfolio).pipe(
          map(() => {
            this.store.dispatch(
              updateCreatePortfolioApiLoading({ flag: false })
            );
            return createPortfolioSuccess();
          })
        );
      })
    );
  });

  $createPortfolioSuccess = createEffect(() => {
    return this.action$.pipe(
      ofType(...[createPortfolioSuccess, transactionSuccess]),
      map(() => {
        return retrievePortfolioData();
      })
    );
  });

  $createTransaction = createEffect(() => {
    return this.action$.pipe(
      ofType(createTransaction),
      mergeMap((action) => {
        this.store.dispatch(updateTransactionApiLoading({ flag: true }));
        return this.api.createPortfolioTransaction(action.transaction).pipe(
          map(() => {
            this.store.dispatch(updateTransactionApiLoading({ flag: false }));
            return transactionSuccess();
          }),
          catchError(() => {
            return of(updateTransactionApiLoading({ flag: false }));
          })
        );
      })
    );
  });

  $updateTransaction = createEffect(() => {
    return this.action$.pipe(
      ofType(updateTransaction),
      mergeMap((action) => {
        this.store.dispatch(updateTransactionApiLoading({ flag: true }));
        return this.api.updatePortfolioTransaction(action.transaction).pipe(
          map(() => {
            this.store.dispatch(updateTransactionApiLoading({ flag: false }));
            return transactionSuccess();
          }),
          catchError(() => {
            return of(updateTransactionApiLoading({ flag: false }));
          })
        );
      })
    );
  });
  $deleteTransaction = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteTransaction),
      mergeMap((action) => {
        this.store.dispatch(updateTransactionApiLoading({ flag: true }));
        return this.api.deletePortfolioTransaction(action.transactionId).pipe(
          map(() => {
            this.store.dispatch(updateTransactionApiLoading({ flag: false }));
            return transactionSuccess();
          }),
          catchError(() => {
            return of(updateTransactionApiLoading({ flag: false }));
          })
        );
      })
    );
  });
}
