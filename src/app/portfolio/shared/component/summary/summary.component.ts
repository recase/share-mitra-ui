import { Component, Input, OnInit } from '@angular/core';
import { PortfolioSummary } from 'src/app/interface';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
  @Input() public summaryData: PortfolioSummary = {
    totalProfit: 0,
    totalAmount: 0,
    totalInvestment: 0,
    todaysProfit: 0,
    actualProfit: 0,
  };

  constructor() {}

  ngOnInit(): void {}
}
