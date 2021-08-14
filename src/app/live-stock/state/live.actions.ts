import { createAction, props } from '@ngrx/store';
import { LiveStockList } from 'src/app/interface';

export const updateLivePrice = createAction(
  '[live] updateLivePrice',
  props<{ livePrice: LiveStockList }>()
);
export const retrieveLivePrice = createAction('[live] retrieveLivePrice');
