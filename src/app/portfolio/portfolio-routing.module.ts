import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertListComponent } from './component/alert-list/alert-list.component';
import { PortfolioListComponent } from './component/portfolio-list/portfolio-list.component';
import { TargetLossComponent } from './component/target-loss/target-loss.component';
import { WatchListComponent } from './component/watch-list/watch-list.component';
import { PortfolioComponent } from './portfolio.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent,
    children: [
      {
        path: '',
        component: PortfolioListComponent,
      },
      {
        path: 'alerts',
        component: AlertListComponent,
      },
      {
        path: 'watch-list',
        component: WatchListComponent,
      },
      {
        path: 'target-stop-loss',
        component: TargetLossComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortfolioRoutingModule {}
