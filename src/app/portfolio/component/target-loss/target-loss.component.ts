import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PortfolioState, TargetLoss } from 'src/app/interface';
import { TargetLossModalComponent } from '../../modals/target-loss-modal/target-loss-modal.component';
import {
  deleteTargetLossAction,
  partailUpdateTargetLossAction,
  retrieveTargetLossAction,
} from '../../store/portfolio.actions';
import { targetLossSelector } from '../../store/portfolio.selectors';

@Component({
  selector: 'app-target-loss',
  templateUrl: './target-loss.component.html',
  styleUrls: ['./target-loss.component.scss'],
})
export class TargetLossComponent implements OnInit, OnDestroy {
  public targetStopLossList!: TargetLoss[] | null;
  private targetLossSubscription!: Subscription;

  constructor(
    private store: Store<PortfolioState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(retrieveTargetLossAction());
    this.targetLossSubscription = this.store
      .select(targetLossSelector)
      .subscribe((data) => {
        this.targetStopLossList = data;
      });
  }

  public addTargetLoss(): void {
    this.dialog.open(TargetLossModalComponent, {
      data: {
        type: 'add',
      },
      panelClass: 'alert-modal',
    });
  }

  public editTargetLoss(targetStopLossId: number | undefined) {
    const targetLoss = this.targetStopLossList?.find(
      (data) => data.id === targetStopLossId
    );
    if (targetLoss) {
      this.dialog.open(TargetLossModalComponent, {
        data: {
          type: 'edit',
          targetLossData: targetLoss,
        },
        panelClass: 'alert-modal',
      });
    }
  }
  public deleteTargetLoss(targetStopLossId: number | undefined) {
    if (targetStopLossId) {
      this.store.dispatch(
        deleteTargetLossAction({ targetLossId: targetStopLossId })
      );
    }
  }

  public toggleNofification(value: boolean, targetLossId: number | undefined) {
    if (targetLossId) {
      this.store.dispatch(
        partailUpdateTargetLossAction({
          targetLossId: targetLossId,
          data: { enableNotification: value },
        })
      );
    }
  }

  ngOnDestroy() {
    if (this.targetLossSubscription) {
      this.targetLossSubscription.unsubscribe();
    }
  }
}
