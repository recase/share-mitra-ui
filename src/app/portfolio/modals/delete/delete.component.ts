import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PortfolioState } from 'src/app/interface';
import {
  deletePortfolio,
  deleteTransaction,
} from '../../store/portfolio.actions';
import { transactionApiLoadingSelector } from '../../store/portfolio.selectors';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent implements OnInit, OnDestroy {
  public label!: string;
  public loading!: boolean;

  private deleteLoadingSubscription!: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private store: Store<PortfolioState>,
    private dialogRef: MatDialogRef<DeleteComponent>
  ) {}

  ngOnInit(): void {
    this.deleteLoadingSubscription = this.store
      .select(transactionApiLoadingSelector)
      .subscribe((data) => {
        if (this.loading && !data) {
          this.dialogRef.close({ deleted: true });
        }
        this.loading = data;
      });
    if (this.data.type === 'portfolio') {
      this.label = 'Are you sure want to delete this portfolio?';
    } else if (this.data.type === 'transaction') {
      this.label = 'Are you sure want to delete this transaction?';
    }
  }

  public cancel(): void {
    this.dialogRef.close({ delete: true });
  }

  public deleteClick(): void {
    if (this.data.type === 'portfolio') {
      if (this.data.portfolioId) {
        this.store.dispatch(
          deletePortfolio({ portfolioId: this.data.portfolioId })
        );
      }
    } else if (this.data.type === 'transaction') {
      if (this.data.transactionId) {
        this.store.dispatch(
          deleteTransaction({ transactionId: this.data.transactionId })
        );
      }
    }
  }

  ngOnDestroy(): void {
    if (this.deleteLoadingSubscription) {
      this.deleteLoadingSubscription.unsubscribe();
    }
  }
}
