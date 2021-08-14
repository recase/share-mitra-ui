import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Sector, StockState } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { retrieveSectorData } from '../../store/stock.actions';
import { sectorSelector } from '../../store/stock.selectors';

@Component({
  selector: 'app-sector',
  templateUrl: './sector.component.html',
  styleUrls: ['./sector.component.scss'],
})
export class SectorComponent implements OnInit, OnDestroy {
  public sectors!: Sector[];

  public displayedColumns = ['name', 'regulatorybody'];
  private sectorsSubscriber!: Subscription;

  constructor(private api: ApiService, private store: Store<StockState>) {}

  ngOnInit(): void {
    this.store.dispatch(retrieveSectorData());
    this.sectorsSubscriber = this.store
      .select(sectorSelector)
      .subscribe((data: Sector[]) => {
        this.sectors = data;
      });
  }

  ngOnDestroy(): void {
    if (this.sectorsSubscriber) {
      this.sectorsSubscriber.unsubscribe();
    }
  }
}
