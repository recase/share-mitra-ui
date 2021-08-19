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
import { MatDialogModule } from '@angular/material/dialog';
import { PortfolioModalComponent } from './component/portfolio-modal/portfolio-modal.component';
import { TransactionCardComponent } from './component/portfolio-modal/component/transaction-card/transaction-card.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PortfolioComponent,
    SummaryComponent,
    CardComponent,
    PortfolioListComponent,
    PortfolioModalComponent,
    TransactionCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortfolioRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
  ],
})
export class PortfolioModule {}
