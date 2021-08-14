import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CompanyData, Sector, StockState } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import {
  retrieveCompanyData,
  retrieveSectorData,
  retrieveStockPrice,
  updateCompanyList,
  updateCompanyLoading,
  //   updateLiveStockLoading,
  //   updateLiveStockPriceList,
  updateSectorList,
  updateSectorLoading,
  updateStockPriceList,
  updateStockPriceLoading,
} from './stock.actions';

@Injectable()
export class StockEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store<StockState>
  ) {}

  $retrieveCompanyList = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(retrieveCompanyData),
        mergeMap((action) => {
          this.store.dispatch(updateCompanyLoading({ companyLoading: true }));
          return this.api.retrieveCompanies().pipe(
            map((data: CompanyData[]) => {
              this.store.dispatch(updateCompanyList({ companies: data }));
              this.store.dispatch(
                updateCompanyLoading({ companyLoading: false })
              );
            }),
            catchError(() => {
              this.store.dispatch(
                updateCompanyLoading({ companyLoading: false })
              );
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  $retrieveSectorList = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(retrieveSectorData),
        mergeMap((action) => {
          this.store.dispatch(updateSectorLoading({ sectorLoading: true }));
          return this.api.retrieveSectors().pipe(
            map((data: Sector[]) => {
              this.store.dispatch(updateSectorList({ sectors: data }));
              this.store.dispatch(
                updateSectorLoading({ sectorLoading: false })
              );
            }),
            catchError(() => {
              this.store.dispatch(
                updateSectorLoading({ sectorLoading: false })
              );
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  $retrieveStockPrice = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(retrieveStockPrice),
        mergeMap((action) => {
          this.store.dispatch(
            updateStockPriceLoading({ stockPriceLoading: true })
          );
          return this.api.retrieveStockPrice().pipe(
            map((data) => {
              this.store.dispatch(updateStockPriceList({ stockList: data }));
              this.store.dispatch(
                updateStockPriceLoading({ stockPriceLoading: false })
              );
            }),
            catchError((err) => {
              this.store.dispatch(
                updateStockPriceLoading({ stockPriceLoading: false })
              );
              return of();
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  //   $retriveLiveStockPrice = createEffect(
  //     () => {
  //       return this.actions$.pipe(
  //         ofType(updateLiveStockPriceList),
  //         mergeMap((action) => {
  //           this.store.dispatch(
  //             updateLiveStockLoading({ liveStockLoading: false })
  //           );
  //           return this.api.retrieveLivePrice().pipe(
  //             map((data) => {
  //               this.store.dispatch(
  //                 updateLiveStockPriceList({ liveStockList: data })
  //               ),
  //                 this.store.dispatch(
  //                   updateLiveStockLoading({ liveStockLoading: false })
  //                 );
  //             }),
  //             catchError(() => {
  //               this.store.dispatch(
  //                 updateLiveStockLoading({ liveStockLoading: false })
  //               );
  //               return of();
  //             })
  //           );
  //         })
  //       );
  //     },
  //     { dispatch: false }
  //   );
}
