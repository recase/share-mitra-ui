import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PortfolioState } from '../interface';
import { retrievePortfolioData } from './store/portfolio.actions';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor(private store: Store<PortfolioState>) {}

  ngOnInit(): void {
    this.store.dispatch(retrievePortfolioData());
  }
}
