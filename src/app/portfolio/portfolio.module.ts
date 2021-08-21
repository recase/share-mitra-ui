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
import { StoreModule } from '@ngrx/store';
import { PORTFOLIO_STATE_NAME } from './store/portfolio.selectors';
import { PortfolioReducer } from './store/portfolio.reducers';
import { EffectsModule } from '@ngrx/effects';
import { PortfolioEffects } from './store/portfolio.effects';
import { AddPrtfolioComponent } from './modals/add-prtfolio/add-prtfolio.component';
import { EditTransactionComponent } from './modals/edit-transaction/edit-transaction.component';
import { DeleteTransactionComponent } from './modals/delete-transaction/delete-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  DateAdapter,
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MY_FORMATS } from '../shared/date-picker-format';
import { CustomDateAdapter } from '../shared/date-adapter';
import { Platform } from '@angular/cdk/platform';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { AddTransactionComponent } from './modals/add-transaction/add-transaction.component';

@NgModule({
  declarations: [
    PortfolioComponent,
    SummaryComponent,
    CardComponent,
    PortfolioListComponent,
    PortfolioModalComponent,
    TransactionCardComponent,
    AddPrtfolioComponent,
    EditTransactionComponent,
    DeleteTransactionComponent,
    AddTransactionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PortfolioRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    EffectsModule.forFeature([PortfolioEffects]),
    StoreModule.forFeature(PORTFOLIO_STATE_NAME, PortfolioReducer),
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
  ],

  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PortfolioModule {}
