import { Component, OnInit } from '@angular/core';
import { StockPrice } from 'src/app/interface';

@Component({
  selector: 'app-todays-price',
  templateUrl: './todays-price.component.html',
  styleUrls: ['./todays-price.component.scss'],
})
export class TodaysPriceComponent implements OnInit {
  public today!: string;
  ELEMENT_DATA: StockPrice[] = [
    {
      lastTradedPrice: 1,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 1.0079,
      symbol: 'H',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 2,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 4.0026,
      symbol: 'He',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 3,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 6.941,
      symbol: 'Li',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 4,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 9.0122,
      symbol: 'Be',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 5,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 10.811,
      symbol: 'B',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 6,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 12.0107,
      symbol: 'C',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 7,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 14.0067,
      symbol: 'N',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 8,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 15.9994,
      symbol: 'O',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 9,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 18.9984,
      symbol: 'F',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
    {
      lastTradedPrice: 10,
      previousClosePrice: 43.33,
      openPrice: 34,
      change: 20.1797,
      symbol: 'Ne',
      lowPrice: 45.666,
      highPrice: 66.78,
      totalVolume: 1999,
    },
  ];

  displayedColumns: string[] = [
    'symbol',
    'ltp',
    'pclose',
    'change',
    'open',
    'high',
    'low',
    'volume',
  ];
  dataSource = this.ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {
    this.today = Date.now().toString();
  }
  public test(data: StockPrice): void {
    console.log(data);
  }
}
