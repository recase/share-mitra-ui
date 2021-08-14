import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveStockRoutingModule } from './live-stock-routing.module';
import { LiveStockComponent } from './live-stock.component';
import { LiveComponent } from './components/live/live.component';
import { MatTableModule } from '@angular/material/table';
import { EffectsModule } from '@ngrx/effects';
import { LivePriceEffect } from './state/live.effects';

@NgModule({
  declarations: [LiveStockComponent, LiveComponent],
  imports: [
    CommonModule,
    LiveStockRoutingModule,
    MatTableModule,
    EffectsModule.forFeature([LivePriceEffect]),
  ],
})
export class LiveStockModule {}
