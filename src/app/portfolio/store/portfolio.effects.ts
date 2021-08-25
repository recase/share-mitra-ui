import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import {
  Alert,
  PortfolioState,
  TargetLoss,
  Watchlist,
} from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import {
  createAlertAction,
  createPortfolio,
  createPortfolioSuccess,
  createTargetLossAction,
  createTransaction,
  createWatchlistAction,
  deleteAlertAction,
  deletePortfolio,
  deleteTargetLossAction,
  deleteTransaction,
  deleteWatchlistAction,
  partailUpdateAlertAction,
  partailUpdateTargetLossAction,
  retrieveAlertAction,
  retrieveCompanyList,
  retrievePortfolioData,
  retrieveTargetLossAction,
  retrieveWatchlistAction,
  transactionSuccess,
  updateAlertAction,
  updateAlertList,
  updateApiErrorMsg,
  updateApiLoading,
  updateCompanayList,
  updateCreatePortfolioApiLoading,
  updatePortfolioApiLoading,
  updatePortfolioData,
  updateTargetLossAction,
  updateTargetLossList,
  updateTransaction,
  updateTransactionApiLoading,
  updateWatchlistAction,
  updateWatchlistData,
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

  $deletePortfolio = createEffect(() => {
    return this.action$.pipe(
      ofType(deletePortfolio),
      mergeMap((action) => {
        this.store.dispatch(updateTransactionApiLoading({ flag: true }));
        return this.api.deletePortfolio(action.portfolioId).pipe(
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

  $retrieveAlertList = createEffect(() => {
    return this.action$.pipe(
      ofType(retrieveAlertAction),
      mergeMap(() => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.retrieveAlerts().pipe(
          map((data: Alert[]) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return updateAlertList({ alerts: data });
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $createAlert = createEffect(() => {
    return this.action$.pipe(
      ofType(createAlertAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.createAlert(action.alert).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveAlertAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $updateAlert = createEffect(() => {
    return this.action$.pipe(
      ofType(updateAlertAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.updateAlert(action.alert).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveAlertAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $partialUpdateAlert = createEffect(() => {
    return this.action$.pipe(
      ofType(partailUpdateAlertAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.partialUpdateAlert(action.alertId, action.data).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveAlertAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $deleteAlert = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteAlertAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.deleteAlert(action.alertId).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveAlertAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $retrieveWatchlist = createEffect(() => {
    return this.action$.pipe(
      ofType(retrieveWatchlistAction),
      mergeMap(() => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.retrieveWatchlist().pipe(
          map((data: Watchlist[]) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return updateWatchlistData({ watchlist: data });
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $createWatchlist = createEffect(() => {
    return this.action$.pipe(
      ofType(createWatchlistAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.createWatchlist(action.watchlist).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveWatchlistAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $updateWatchlist = createEffect(() => {
    return this.action$.pipe(
      ofType(updateWatchlistAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.updateWatchlist(action.watchlist).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveWatchlistAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $deleteWatchlist = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteWatchlistAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.deleteWatchlist(action.watchlistId).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveWatchlistAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $retrieveTargetLossList = createEffect(() => {
    return this.action$.pipe(
      ofType(retrieveTargetLossAction),
      mergeMap(() => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.retrieveTargetLoss().pipe(
          map((data: TargetLoss[]) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return updateTargetLossList({ targetLoss: data });
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $createTargetLoss = createEffect(() => {
    return this.action$.pipe(
      ofType(createTargetLossAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.createTargetLoss(action.targetLoss).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveTargetLossAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $updateTargetLoss = createEffect(() => {
    return this.action$.pipe(
      ofType(updateTargetLossAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.updateTargetLoss(action.targetLoss).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveTargetLossAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });

  $partialUpdateTargetLoss = createEffect(() => {
    return this.action$.pipe(
      ofType(partailUpdateTargetLossAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api
          .partialUpdateTargetLoss(action.targetLossId, action.data)
          .pipe(
            map(() => {
              this.store.dispatch(updateApiLoading({ flag: false }));
              return retrieveTargetLossAction();
            }),
            catchError((error) => {
              this.store.dispatch(updateApiLoading({ flag: false }));
              return of(updateApiErrorMsg({ msg: error }));
            })
          );
      })
    );
  });

  $deleteTargetLoss = createEffect(() => {
    return this.action$.pipe(
      ofType(deleteTargetLossAction),
      mergeMap((action) => {
        this.store.dispatch(updateApiErrorMsg({ msg: '' }));
        this.store.dispatch(updateApiLoading({ flag: true }));
        return this.api.deleteTargetLoss(action.targetLossId).pipe(
          map(() => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return retrieveTargetLossAction();
          }),
          catchError((error) => {
            this.store.dispatch(updateApiLoading({ flag: false }));
            return of(updateApiErrorMsg({ msg: error }));
          })
        );
      })
    );
  });
}
