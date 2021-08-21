import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Portfolio } from 'src/app/interface';
import { AddTransactionComponent } from '../../modals/add-transaction/add-transaction.component';

@Component({
  selector: 'app-portfolio-modal',
  templateUrl: './portfolio-modal.component.html',
  styleUrls: ['./portfolio-modal.component.scss'],
})
export class PortfolioModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public portfolio: Portfolio,
    private dialogRef: MatDialogRef<PortfolioModalComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log(this.portfolio);
  }

  public addTransaction(): void {
    this.dialog.open(AddTransactionComponent, {
      data: {
        portfolioId: this.portfolio.id,
        option: 'add',
      },
      panelClass: 'transaction-modal',
    });
  }

  public closeModal() {
    this.dialogRef.close();
  }
}
