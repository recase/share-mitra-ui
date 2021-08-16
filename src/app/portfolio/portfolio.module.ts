import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { SummaryComponent } from './shared/component/summary/summary.component';
import { CardComponent } from './shared/component/card/card.component';
import { PortfolioListComponent } from './component/portfolio-list/portfolio-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PortfolioComponent,
    SummaryComponent,
    CardComponent,
    PortfolioListComponent,
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PortfolioModule {}
