import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  LiveStockPrice,
  StockPrice,
  StockPriceList,
  StockState,
} from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { retrieveStockPrice } from '../../store/stock.actions';
import { stockPriceSelector } from '../../store/stock.selectors';

@Component({
  selector: 'app-todays-price',
  templateUrl: './todays-price.component.html',
  styleUrls: ['./todays-price.component.scss'],
})
export class TodaysPriceComponent implements OnInit, OnDestroy {
  public today!: string;
  public priceList!: StockPriceList;

  public displayedColumns: string[] = [
    'symbol',
    'close',
    'pclose',
    'change',
    'open',
    'high',
    'low',
    'volume',
  ];
  private StockPriceSubscription!: Subscription;
  constructor(private api: ApiService, private store: Store<StockState>) {}

  ngOnInit(): void {
    this.today = Date.now().toString();
    this.store.dispatch(retrieveStockPrice());
    this.StockPriceSubscription = this.store
      .select(stockPriceSelector)
      .subscribe((data: StockPriceList) => {
        this.priceList = data;
      });

    // this.store.select(stockPriceSelector).subscribe((s: StockPrice) => {
    //   this.priceList = s
    // })
  }

  public test(data: LiveStockPrice): void {
    console.log(data);
  }

  ngOnDestroy(): void {
    if (this.StockPriceSubscription) {
      this.StockPriceSubscription.unsubscribe();
    }
  }
}
