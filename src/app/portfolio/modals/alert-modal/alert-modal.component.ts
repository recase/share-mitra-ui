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
import { Alert, CompanyListingData, PortfolioState } from 'src/app/interface';
import { minNumberValidator } from '../../shared/custom-validators/min-number-validator';
import {
  createAlertAction,
  updateAlertAction,
} from '../../store/portfolio.actions';
import {
  apiLoadingSelector,
  companyListSelector,
} from '../../store/portfolio.selectors';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss'],
})
export class AlertModalComponent implements OnInit, OnDestroy {
  public alertFormGroup!: FormGroup;
  public companyList!: CompanyListingData[] | null;
  public loading = false;
  public title = '';
  public color = '#004bd5';

  private companyListSubscription!: Subscription;
  private priceRangeChangeSubscription!: Subscription;
  private alertApiSubscription!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder,
    private store: Store<PortfolioState>,
    private dialogRef: MatDialogRef<AlertModalComponent>
  ) {}

  ngOnInit(): void {
    this.companyListSubscription = this.store
      .select(companyListSelector)
      .subscribe((data) => {
        this.companyList = data;
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
      this.title = 'Add new Alert';
      this.initializeForm();
    } else if (this.data.type === 'edit' && this.data.alertData) {
      this.title = 'Update alert';
      this.updateForm(this.data.alertData);
    }
  }

  private initializeForm(): void {
    this.alertFormGroup = this.fb.group({
      companyId: [null, [Validators.required]],
      notes: [null],
      priceRange: [true, [Validators.required]],
      exactPrice: [
        { value: null, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      minPrice: [
        { value: null, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      maxPrice: [
        { value: null, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      enableNotification: [true, [Validators.required]],
    });
    this.enableRelatedFields();
    this.priceRangeChangeEvent();
  }

  private updateForm(alertData: Alert): void {
    const priceRange = this.hasPricerange(alertData);
    this.alertFormGroup = this.fb.group({
      companyId: [alertData.companyId],
      notes: [alertData.notes],
      priceRange: [priceRange],
      exactPrice: [
        { value: alertData.exactPrice, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      minPrice: [
        { value: alertData.minPrice, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      maxPrice: [
        { value: alertData.maxPrice, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      enableNotification: [alertData.enableNotification, [Validators.required]],
    });
    this.enableRelatedFields();
    this.priceRangeChangeEvent();
  }

  private priceRangeChangeEvent(): void {
    this.priceRangeChangeSubscription =
      this.alertFormGroup.controls.priceRange.valueChanges.subscribe(() => {
        this.enableRelatedFields();
      });
  }

  private hasPricerange(alertData: Alert): boolean {
    if (alertData.exactPrice) {
      return false;
    }
    return true;
  }

  private enableRelatedFields(): void {
    if (this.alertFormGroup.controls.priceRange.value) {
      this.alertFormGroup.controls.exactPrice.disable();
      this.alertFormGroup.controls.minPrice.enable();
      this.alertFormGroup.controls.maxPrice.enable();
    } else {
      this.alertFormGroup.controls.maxPrice.disable();
      this.alertFormGroup.controls.minPrice.disable();
      this.alertFormGroup.controls.exactPrice.enable();
    }
  }

  public saveAlert(): void {
    if (this.alertFormGroup.valid) {
      const alert: Alert = {
        companyId: this.alertFormGroup.controls.companyId.value,
        notes: this.alertFormGroup.controls.notes.value,
        enableNotification:
          this.alertFormGroup.controls.enableNotification.value,
      };
      if (this.alertFormGroup.controls.priceRange.value) {
        alert.minPrice = this.alertFormGroup.controls.minPrice.value;
        alert.maxPrice = this.alertFormGroup.controls.maxPrice.value;
      } else {
        alert.exactPrice = this.alertFormGroup.controls.exactPrice.value;
      }

      if (this.data.type === 'add') {
        this.store.dispatch(createAlertAction({ alert: alert }));
      } else if (this.data.type === 'edit') {
        alert.id = this.data.alertData.id;
        this.store.dispatch(updateAlertAction({ alert: alert }));
      }
    }
  }

  get alertForm(): { [key: string]: AbstractControl } {
    return this.alertFormGroup.controls;
  }

  ngOnDestroy() {
    if (this.companyListSubscription) {
      this.companyListSubscription.unsubscribe();
    }
    if (this.priceRangeChangeSubscription) {
      this.priceRangeChangeSubscription.unsubscribe();
    }
    if (this.alertApiSubscription) {
      this.alertApiSubscription.unsubscribe();
    }
  }
}
