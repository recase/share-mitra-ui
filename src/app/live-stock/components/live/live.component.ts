import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { LiveState, LiveStockList } from 'src/app/interface';
import { retrieveLivePrice } from '../../state/live.actions';
import { retrieveLivePriceState } from '../../state/live.selectors';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit, OnDestroy {
  public liveData!: LiveStockList;
  // [
  //   {
  //     symbol: 'nambi',
  //     lastTradedPrice: 23,
  //     change: 0.3,
  //     previousClose: 23,
  //     openPrice: 23,
  //     highPrice: 32,
  //     lowPrice: 21,
  //     lastTradedVolume: 32,
  //     lastTradedTime: new Date().toLocaleString(),
  //     totalVolume: 300,
  //   },
  //   {
  //     symbol: 'nambi',
  //     lastTradedPrice: 23,
  //     change: -0.3,
  //     previousClose: 23,
  //     openPrice: 23,
  //     highPrice: 32,
  //     lowPrice: 21,
  //     lastTradedVolume: 32,
  //     lastTradedTime: new Date().toLocaleString(),
  //     totalVolume: 300,
  //   },
  //   {
  //     symbol: 'nambi',
  //     lastTradedPrice: 23,
  //     change: 0.0,
  //     previousClose: 23,
  //     openPrice: 23,
  //     highPrice: 32,
  //     lowPrice: 21,
  //     lastTradedVolume: 32,
  //     lastTradedTime: new Date().toLocaleString(),
  //     totalVolume: 300,
  //   },
  // ];
  public displayedColumns = [
    'symbol',
    'ltp',
    'change',
    'pclose',
    'open',
    'high',
    'low',
    'ltv',
    'ltt',
    'tv',
  ];
  private liveDataSubscription!: Subscription;
  private timeInterval: any;
  constructor(private store: Store<LiveState>) {}

  ngOnInit(): void {
    this.retrieveLiveData();
    this.timeInterval = setInterval(() => {
      this.retrieveLiveData();
    }, 60000);
    this.liveDataSubscription = this.store
      .select(retrieveLivePriceState)
      .subscribe((data: LiveStockList) => {
        this.liveData = data;
      });
  }

  private retrieveLiveData() {
    this.store.dispatch(retrieveLivePrice());
  }

  ngOnDestroy(): void {
    if (this.liveDataSubscription) {
      this.liveDataSubscription.unsubscribe();
    }
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }
}
