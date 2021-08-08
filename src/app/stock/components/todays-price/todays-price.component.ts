import { Component, OnInit } from '@angular/core';

export interface StockPrice {
  symbol: string;
  LTP: number;
  pClose: number;
  change: number;
  open: number;
}
@Component({
  selector: 'app-todays-price',
  templateUrl: './todays-price.component.html',
  styleUrls: ['./todays-price.component.scss'],
})
export class TodaysPriceComponent implements OnInit {
  public today!: string;
  ELEMENT_DATA: StockPrice[] = [
    { LTP: 1, pClose: 43.33, open: 34, change: 1.0079, symbol: 'H' },
    { LTP: 2, pClose: 43.33, open: 34, change: 4.0026, symbol: 'He' },
    { LTP: 3, pClose: 43.33, open: 34, change: 6.941, symbol: 'Li' },
    { LTP: 4, pClose: 43.33, open: 34, change: 9.0122, symbol: 'Be' },
    { LTP: 5, pClose: 43.33, open: 34, change: 10.811, symbol: 'B' },
    { LTP: 6, pClose: 43.33, open: 34, change: 12.0107, symbol: 'C' },
    { LTP: 7, pClose: 43.33, open: 34, change: 14.0067, symbol: 'N' },
    { LTP: 8, pClose: 43.33, open: 34, change: 15.9994, symbol: 'O' },
    { LTP: 9, pClose: 43.33, open: 34, change: 18.9984, symbol: 'F' },
    { LTP: 10, pClose: 43.33, open: 34, change: 20.1797, symbol: 'Ne' },
    { LTP: 1, pClose: 43.33, open: 34, change: 1.0079, symbol: 'H' },
    { LTP: 2, pClose: 43.33, open: 34, change: 4.0026, symbol: 'He' },
    { LTP: 3, pClose: 43.33, open: 34, change: 6.941, symbol: 'Li' },
    { LTP: 4, pClose: 43.33, open: 34, change: 9.0122, symbol: 'Be' },
    { LTP: 5, pClose: 43.33, open: 34, change: 10.811, symbol: 'B' },
    { LTP: 6, pClose: 43.33, open: 34, change: 12.0107, symbol: 'C' },
    { LTP: 7, pClose: 43.33, open: 34, change: 14.0067, symbol: 'N' },
    { LTP: 8, pClose: 43.33, open: 34, change: 15.9994, symbol: 'O' },
    { LTP: 9, pClose: 43.33, open: 34, change: 18.9984, symbol: 'F' },
    { LTP: 10, pClose: 43.33, open: 34, change: 20.1797, symbol: 'Ne' },
  ];

  displayedColumns: string[] = ['symbol', 'ltp', 'pclose', 'change', 'open'];
  dataSource = this.ELEMENT_DATA;
  constructor() {}

  ngOnInit(): void {
    this.today = Date.now().toString();
  }
}
