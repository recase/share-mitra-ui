import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiveComponent } from './components/live/live.component';
import { LiveStockComponent } from './live-stock.component';

const routes: Routes = [
  {
    path: '',
    component: LiveStockComponent,
    children: [{ path: '', component: LiveComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiveStockRoutingModule {}
