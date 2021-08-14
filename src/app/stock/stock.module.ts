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
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    EffectsModule.forFeature([StockEffects]),
  ],
})
export class StockModule {}
