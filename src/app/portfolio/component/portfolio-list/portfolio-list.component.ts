import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Portfolio, PortfolioState, PortfolioSummary } from 'src/app/interface';
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

  constructor(
    private dialog: MatDialog,
    private store: Store<PortfolioState>
  ) {}

  ngOnInit(): void {
    debugger;
    this.portfolioSubscription = this.store
      .select(portfolioDataSelector)
      .subscribe((data) => {
        debugger;
        this.portfolioData = data?.protfolios;
      });
  }

  public openPortfolioModal(portfolio: Portfolio): void {
    this.dialog.open(PortfolioModalComponent, {
      data: portfolio,
      panelClass: 'portfolio-modal',
      disableClose: true,
    });
  }
  ngOnDestroy(): void {
    if (this.portfolioSubscription) {
      this.portfolioSubscription.unsubscribe();
    }
  }
}
