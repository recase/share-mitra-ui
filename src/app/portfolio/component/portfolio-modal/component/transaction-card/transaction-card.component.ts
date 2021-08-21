import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TransactionType } from 'src/app/enums';
import { PortfolioState, Transaction } from 'src/app/interface';
import { AddTransactionComponent } from 'src/app/portfolio/modals/add-transaction/add-transaction.component';
import { deleteTransaction } from 'src/app/portfolio/store/portfolio.actions';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {
  @Input() public transaction!: Transaction;
  @Input() public portfolioId: number | undefined;
  public collapseCard: boolean = true;

  constructor(
    private dialog: MatDialog,
    private store: Store<PortfolioState>
  ) {}

  ngOnInit(): void {}

  public toggleCollapse(): void {
    this.collapseCard = !this.collapseCard;
  }

  public editTransaction(): void {
    event?.stopPropagation();
    this.dialog.open(AddTransactionComponent, {
      data: {
        portfolioId: this.portfolioId,
        option: 'edit',
        transaction: this.transaction,
      },
      panelClass: 'transaction-modal',
    });
  }

  public deleteTransaction(): void {
    event?.stopPropagation();
    if (this.transaction && this.transaction.id) {
      this.store.dispatch(
        deleteTransaction({ transactionId: this.transaction.id })
      );
    }
  }

  get transactionType() {
    return TransactionType;
  }
}
