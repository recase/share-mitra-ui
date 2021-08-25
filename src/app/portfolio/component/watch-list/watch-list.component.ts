import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PortfolioState, Watchlist } from 'src/app/interface';
import { WatchlistModalComponent } from '../../modals/watchlist-modal/watchlist-modal.component';
import {
  deleteWatchlistAction,
  retrieveWatchlistAction,
} from '../../store/portfolio.actions';
import { watchlistSelector } from '../../store/portfolio.selectors';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnInit, OnDestroy {
  public watchList!: Watchlist[] | null;

  private watchListSubscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private store: Store<PortfolioState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(retrieveWatchlistAction());
    this.watchListSubscription = this.store
      .select(watchlistSelector)
      .subscribe((data) => {
        this.watchList = data;
      });
  }

  public deleteWatchList(watchlistId: number | undefined): void {
    if (watchlistId) {
      this.store.dispatch(deleteWatchlistAction({ watchlistId: watchlistId }));
    }
  }

  public addWatchList(): void {
    this.dialog.open(WatchlistModalComponent, {
      data: {
        type: 'add',
      },
      panelClass: 'alert-modal',
    });
  }

  public editWatchList(watchlistId: number | undefined): void {
    const watchlistItem: Watchlist | undefined = this.watchList?.find(
      (item) => item.id === watchlistId
    );
    if (watchlistItem) {
      this.dialog.open(WatchlistModalComponent, {
        data: {
          type: 'update',
          watchList: watchlistItem,
        },
        panelClass: 'alert-modal',
      });
    }
  }

  ngOnDestroy(): void {
    if (this.watchListSubscription) {
      this.watchListSubscription.unsubscribe();
    }
  }
}
