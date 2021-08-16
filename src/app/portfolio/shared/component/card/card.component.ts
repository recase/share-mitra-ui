import { Component, Input, OnInit } from '@angular/core';
import { PortfolioDetail } from 'src/app/interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() public portfolio: PortfolioDetail = {
    symbol: '',
    name: '',
    totalStock: 0,
    lastTradedPrice: 0,
    totalStockPrice: 0,
    stockType: '',
    totalInvestment: 0,
    totalStockInvestment: 0,
    profitPercentage: 0,
    overallProfit: 0,
    change: 0,
    todaysProfit: 0,
  };

  constructor() {}

  ngOnInit(): void {}
}
