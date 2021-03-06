import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';

import { MatTableModule } from '@angular/material/table';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { TodaysPriceComponent } from './components/todays-price/todays-price.component';
import { SectorComponent } from './components/sector/sector.component';
import { CompanyComponent } from './components/company/company.component';
import { MatSortModule } from '@angular/material/sort';
import { EffectsModule } from '@ngrx/effects';
import { StockEffects } from './store/stock.effects';
import { StoreModule } from '@ngrx/store';
import { STOCK_STATE } from './store/stock.selectors';
import { stockReducer } from './store/stock.reducers';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    StockComponent,
    TodaysPriceComponent,
    SectorComponent,
    CompanyComponent,
  ],
  imports: [
    CommonModule,
    StockRoutingModule,
    SharedModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    EffectsModule.forFeature([StockEffects]),
    StoreModule.forFeature(STOCK_STATE, stockReducer),
  ],
})
export class StockModule {}
