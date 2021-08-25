import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  CompanyListingData,
  PortfolioState,
  Watchlist,
} from 'src/app/interface';
import {
  createWatchlistAction,
  updateWatchlistAction,
} from '../../store/portfolio.actions';
import {
  apiLoadingSelector,
  companyListSelector,
} from '../../store/portfolio.selectors';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist-modal.component.html',
  styleUrls: ['./watchlist-modal.component.scss'],
})
export class WatchlistModalComponent implements OnInit, OnDestroy {
  public watchListFormGroup!: FormGroup;
  public companyList!: CompanyListingData[] | null;
  public title!: string;
  public btnTxt!: string;
  public loading = false;

  private companyListSubscription!: Subscription;
  private companyApiLoadingSubscription!: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private store: Store<PortfolioState>,
    private dialogRef: MatDialogRef<WatchlistModalComponent>
  ) {}

  ngOnInit(): void {
    this.companyListSubscription = this.store
      .select(companyListSelector)
      .subscribe((data) => {
        this.companyList = data;
      });
    this.companyApiLoadingSubscription = this.store
      .select(apiLoadingSelector)
      .subscribe((data) => {
        if (this.loading && !data) {
          this.dialogRef.close();
        }
        this.loading = data;
      });
    if (this.data.type === 'add') {
      this.title = 'Add new Watchlist';
      this.btnTxt = 'Save';
      this.initializeWatchListForm();
    } else if (this.data.type === 'update' && this.data.watchList) {
      this.title = 'Update Watchlist';
      this.btnTxt = 'Update';
      this.initializedUpdateWatchListForm(this.data.watchList);
    }
  }

  private initializedUpdateWatchListForm(watchList: Watchlist): void {
    this.watchListFormGroup = this.fb.group({
      companyId: [watchList.companyId, [Validators.required]],
      notes: [watchList.notes],
    });
  }

  private initializeWatchListForm(): void {
    this.watchListFormGroup = this.fb.group({
      companyId: [null, [Validators.required]],
      notes: [null],
    });
  }

  public saveWatchList(): void {
    if (this.watchListFormGroup.valid) {
      const watchList: Watchlist = {
        companyId: this.watchListFormGroup.controls.companyId.value,
        notes: this.watchListFormGroup.controls.notes.value,
      };
      if (this.data.type === 'add') {
        this.store.dispatch(createWatchlistAction({ watchlist: watchList }));
      } else if (this.data.type === 'update') {
        watchList.id = this.data.watchList.id;
        this.store.dispatch(updateWatchlistAction({ watchlist: watchList }));
      }
    }
  }

  get watchListForm(): { [key: string]: AbstractControl } {
    return this.watchListFormGroup.controls;
  }

  ngOnDestroy(): void {
    if (this.companyListSubscription) {
      this.companyListSubscription.unsubscribe();
    }
    if (this.companyApiLoadingSubscription) {
      this.companyApiLoadingSubscription.unsubscribe();
    }
  }
}
