import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveStockComponent } from './live-stock.component';

const routes: Routes = [{ path: '', component: LiveStockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiveStockRoutingModule { }
