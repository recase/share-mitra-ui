import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule),
  },
  {
    path: 'live',
    loadChildren: () =>
      import('./live-stock/live-stock.module').then((m) => m.LiveStockModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'portfolio',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./portfolio/portfolio.module').then((m) => m.PortfolioModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
