import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';
import { LiveState, LiveStockList } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { retrieveLivePrice, updateLivePrice } from './live.actions';

@Injectable()
export class LivePriceEffect {
  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store<LiveState>
  ) {}

  $retrieveLivePrice = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(retrieveLivePrice),
        mergeMap((action) => {
          return this.api.retrieveLivePrice().pipe(
            map((data: LiveStockList) => {
              this.store.dispatch(updateLivePrice({ livePrice: data }));
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
