import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiveStockRoutingModule } from './live-stock-routing.module';
import { LiveStockComponent } from './live-stock.component';
import { LiveComponent } from './components/live/live.component';


@NgModule({
  declarations: [
    LiveStockComponent,
    LiveComponent
  ],
  imports: [
    CommonModule,
    LiveStockRoutingModule
  ]
})
export class LiveStockModule { }
