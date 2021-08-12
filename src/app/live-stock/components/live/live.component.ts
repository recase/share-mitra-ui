import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
})
export class LiveComponent implements OnInit {
  public liveData = [
    {
      symbol: 'nambi',
      lastTradedPrice: 23,
      change: 0.3,
      previousClose: 23,
      openPrice: 23,
      highPrice: 32,
      lowPrice: 21,
      lastTradedVolume: 32,
      lastTradedTime: new Date().toLocaleString(),
      totalVolume: 300,
    },
    {
      symbol: 'nambi',
      lastTradedPrice: 23,
      change: -0.3,
      previousClose: 23,
      openPrice: 23,
      highPrice: 32,
      lowPrice: 21,
      lastTradedVolume: 32,
      lastTradedTime: new Date().toLocaleString(),
      totalVolume: 300,
    },
    {
      symbol: 'nambi',
      lastTradedPrice: 23,
      change: 0.0,
      previousClose: 23,
      openPrice: 23,
      highPrice: 32,
      lowPrice: 21,
      lastTradedVolume: 32,
      lastTradedTime: new Date().toLocaleString(),
      totalVolume: 300,
    },
  ];
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
  constructor() {}

  ngOnInit(): void {}
}
