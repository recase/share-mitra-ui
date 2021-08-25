import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Alert, PortfolioState } from 'src/app/interface';
import { AlertModalComponent } from '../../modals/alert-modal/alert-modal.component';
import {
  deleteAlertAction,
  partailUpdateAlertAction,
  retrieveAlertAction,
} from '../../store/portfolio.actions';
import { alertSelector } from '../../store/portfolio.selectors';

@Component({
  selector: 'app-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss'],
})
export class AlertListComponent implements OnInit, OnDestroy {
  public alertList!: Alert[] | null;

  private alertListSubsciption!: Subscription;

  constructor(
    private store: Store<PortfolioState>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.store.dispatch(retrieveAlertAction());
    this.alertListSubsciption = this.store
      .select(alertSelector)
      .subscribe((data) => {
        this.alertList = data;
      });
  }

  public addAlert(): void {
    this.dialog.open(AlertModalComponent, {
      data: {
        type: 'add',
      },
      panelClass: 'alert-modal',
    });
  }

  public editAlert(alertId: number | undefined): void {
    const alert = this.alertList?.find((data) => data.id === alertId);
    if (alert) {
      this.dialog.open(AlertModalComponent, {
        data: {
          type: 'edit',
          alertData: alert,
        },
        panelClass: 'alert-modal',
      });
    }
  }

  public deleteAlert(alertId: number | undefined): void {
    if (alertId) {
      this.store.dispatch(deleteAlertAction({ alertId: alertId }));
    }
  }

  public toggleNofification(value: boolean, alertId: number | undefined) {
    if (alertId) {
      this.store.dispatch(
        partailUpdateAlertAction({
          alertId: alertId,
          data: { enableNotification: value },
        })
      );
    }
  }

  ngOnDestroy() {
    if (this.alertListSubsciption) {
      this.alertListSubsciption.unsubscribe();
    }
  }
}
