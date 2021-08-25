import { Component, Inject, OnInit } from '@angular/core';
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
  TargetLoss,
} from 'src/app/interface';
import { minNumberValidator } from '../../shared/custom-validators/min-number-validator';
import {
  createTargetLossAction,
  updateTargetLossAction,
} from '../../store/portfolio.actions';
import {
  apiLoadingSelector,
  portfolioDataSelector,
} from '../../store/portfolio.selectors';

@Component({
  selector: 'app-target-loss-modal',
  templateUrl: './target-loss-modal.component.html',
  styleUrls: ['./target-loss-modal.component.scss'],
})
export class TargetLossModalComponent implements OnInit {
  public targetLossFormGroup!: FormGroup;
  public companyList!: CompanyListingData[] | null;
  public loading = false;
  public title = '';

  private companyListSubscription!: Subscription;
  private alertApiSubscription!: Subscription;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private store: Store<PortfolioState>,
    private dialogRef: MatDialogRef<TargetLossModalComponent>
  ) {}

  ngOnInit(): void {
    this.companyListSubscription = this.store
      .select(portfolioDataSelector)
      .subscribe((data) => {
        if (data && data.protfolios) {
          this.companyList = [];
          data.protfolios.forEach((portfolio) => {
            const company: CompanyListingData = {
              id: portfolio.company?.id || 0,
              name: `(${portfolio.company?.symbol}) ${portfolio.company?.name}`,
            };
            this.companyList?.push(company);
          });
        }
      });
    this.alertApiSubscription = this.store
      .select(apiLoadingSelector)
      .subscribe((data) => {
        if (this.loading && !data) {
          this.dialogRef.close();
        }
        this.loading = data;
      });
    if (this.data.type === 'add') {
      this.title = 'Add new target loss';
      this.initializeForm();
    } else if (this.data.type === 'edit' && this.data.targetLossData) {
      this.title = 'Update target loss';
      this.updateForm(this.data.targetLossData);
    }
  }

  private initializeForm(): void {
    this.targetLossFormGroup = this.fb.group({
      companyId: [null, [Validators.required]],
      notes: [null],
      target: [null, [Validators.required, minNumberValidator(0.1, true)]],
      stopLoss: [null, [Validators.required, minNumberValidator(0.1, true)]],

      enableNotification: [true, [Validators.required]],
    });
  }

  private updateForm(targetLossData: TargetLoss): void {
    this.targetLossFormGroup = this.fb.group({
      companyId: [targetLossData.companyId],
      notes: [targetLossData.notes],
      target: [
        targetLossData.target,
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      stopLoss: [
        targetLossData.stopLoss,
        [Validators.required, minNumberValidator(0.1, true)],
      ],

      enableNotification: [
        targetLossData.enableNotification,
        [Validators.required],
      ],
    });
  }

  public saveAlert(): void {
    if (this.targetLossFormGroup.valid) {
      const targetLoss: TargetLoss = {
        companyId: this.targetLossFormGroup.controls.companyId.value,
        notes: this.targetLossFormGroup.controls.notes.value,
        enableNotification:
          this.targetLossFormGroup.controls.enableNotification.value,
        target: this.targetLossFormGroup.controls.target.value,
        stopLoss: this.targetLossFormGroup.controls.stopLoss.value,
      };

      if (this.data.type === 'add') {
        this.store.dispatch(createTargetLossAction({ targetLoss: targetLoss }));
      } else if (this.data.type === 'edit') {
        targetLoss.id = this.data.targetLossData.id;
        this.store.dispatch(updateTargetLossAction({ targetLoss: targetLoss }));
      }
    }
  }

  get targetLossForm(): { [key: string]: AbstractControl } {
    return this.targetLossFormGroup.controls;
  }

  ngOnDestroy() {
    if (this.companyListSubscription) {
      this.companyListSubscription.unsubscribe();
    }
    if (this.alertApiSubscription) {
      this.alertApiSubscription.unsubscribe();
    }
  }
}
