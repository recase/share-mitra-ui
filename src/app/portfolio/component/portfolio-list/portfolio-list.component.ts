import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Portfolio, PortfolioState, PortfolioSummary } from 'src/app/interface';
import { AddPrtfolioComponent } from '../../modals/add-prtfolio/add-prtfolio.component';
import { portfolioDataSelector } from '../../store/portfolio.selectors';
import { PortfolioModalComponent } from '../portfolio-modal/portfolio-modal.component';

@Component({
  selector: 'app-portfolio-list',
  templateUrl: './portfolio-list.component.html',
  styleUrls: ['./portfolio-list.component.scss'],
})
export class PortfolioListComponent implements OnInit, OnDestroy {
  public summary: PortfolioSummary = {
    totalInvestment: 9000,
    totalAmount: 120000,
    todaysProfit: 1000,
    totalProfit: -110000,
    actualProfit: 95000,
  };

  public portfolioData: Portfolio[] | undefined;
  private portfolioSubscription!: Subscription;
  private selectedPortfolioId: number | undefined;
  private dialogRef!: MatDialogRef<PortfolioModalComponent>;

  constructor(
    private dialog: MatDialog,
    private store: Store<PortfolioState>
  ) {}

  ngOnInit(): void {
    this.portfolioSubscription = this.store
      .select(portfolioDataSelector)
      .subscribe((data) => {
        this.portfolioData = data?.protfolios;

        this.updateModalData();
      });
  }

  private updateModalData(): void {
    if (
      this.selectedPortfolioId &&
      this.dialogRef &&
      this.dialogRef.componentInstance &&
      this.portfolioData?.length
    ) {
      const selectedPortfolio = this.portfolioData.find(
        (data) => data.id === this.selectedPortfolioId
      );
      if (selectedPortfolio) {
        this.dialogRef.componentInstance.portfolio = selectedPortfolio;
      }
    }
  }

  public openPortfolioModal(portfolio: Portfolio): void {
    this.selectedPortfolioId = portfolio.id;
    this.dialogRef = this.dialog.open(PortfolioModalComponent, {
      data: portfolio,
      panelClass: 'portfolio-modal',
      disableClose: true,
    });
  }

  public openAddPortfolioModal(): void {
    this.dialog.open(AddPrtfolioComponent, {
      panelClass: 'portfolio-add-modal',
    });
  }

  ngOnDestroy(): void {
    if (this.portfolioSubscription) {
      this.portfolioSubscription.unsubscribe();
    }
  }
}
