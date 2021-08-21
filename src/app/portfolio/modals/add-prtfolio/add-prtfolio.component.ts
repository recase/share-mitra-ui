import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TransactionType } from 'src/app/enums';
import {
  CompanyListingData,
  Portfolio,
  PortfolioState,
} from 'src/app/interface';
import { transactionsTypes } from 'src/app/shared/transaction-types';
import { minNumberValidator } from '../../shared/custom-validators/min-number-validator';
import { whiteSpaceValidator } from '../../shared/custom-validators/white-space-validators';
import { createPortfolio } from '../../store/portfolio.actions';
import {
  companyListSelector,
  createPortfolioApiSelector,
} from '../../store/portfolio.selectors';

@Component({
  selector: 'app-add-prtfolio',
  templateUrl: './add-prtfolio.component.html',
  styleUrls: ['./add-prtfolio.component.scss'],
})
export class AddPrtfolioComponent implements OnInit, OnDestroy {
  public portfolioFormGroup!: FormGroup;
  public compnayList!: CompanyListingData[] | null;
  public transactionTypeList = transactionsTypes;
  public today = new Date();
  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Friday from being selected.
    return day !== 5 && day !== 6;
  };
  public createPortfolioLoading: boolean = false;

  private companyListSubscription: Subscription | undefined;
  private transactionTypeSubscription: Subscription | undefined;
  private companyChangeSubscription: Subscription | undefined;
  private portfolioCreationFlagSubscription: Subscription | undefined;

  constructor(
    private fb: FormBuilder,
    private store: Store<PortfolioState>,
    private dialogRef: MatDialogRef<AddPrtfolioComponent>
  ) {}

  ngOnInit(): void {
    this.companyListSubscription = this.store
      .select(companyListSelector)
      .subscribe((data) => {
        this.compnayList = data;
      });
    this.portfolioCreationFlagSubscription = this.store
      .select(createPortfolioApiSelector)
      .subscribe((flag) => {
        if (this.createPortfolioLoading && !flag) {
          this.closeModal();
        }
        this.createPortfolioLoading = flag;
      });
    this.initializeAddPortfolioForm();
  }

  private transactionTypeChangeEvent(): void {
    this.transactionTypeSubscription =
      this.portfolioFormGroup.controls.transactionType.valueChanges.subscribe(
        (value) => {
          if (!value) {
            return;
          }
          this.disableFields();
          if (value === TransactionType.Dividend) {
            this.portfolioFormGroup.controls.dividendAmount.enable();
          } else {
            this.portfolioFormGroup.controls.units.enable();
            if (value !== TransactionType.Bonus) {
              this.portfolioFormGroup.controls.pricePerUnit.enable();
            }
          }
          if (
            value === TransactionType.IPO ||
            value === TransactionType.FPO ||
            value === TransactionType.Right
          ) {
            this.portfolioFormGroup.controls.casbaCharge.enable();
          }
          if (value === TransactionType.Auction) {
            this.portfolioFormGroup.controls.auctionCharge.enable();
          }
        }
      );
  }

  private disableFields(): void {
    this.portfolioFormGroup.controls.dividendAmount.disable();
    this.portfolioFormGroup.controls.auctionCharge.disable();
    this.portfolioFormGroup.controls.casbaCharge.disable();
    this.portfolioFormGroup.controls.pricePerUnit.disable();
    this.portfolioFormGroup.controls.units.disable();
  }

  private companyChangeEvent(): void {
    this.companyChangeSubscription =
      this.portfolioFormGroup.controls.companyId.valueChanges.subscribe(() => {
        this.portfolioFormGroup.controls.transactionDate.enable();
        this.portfolioFormGroup.controls.transactionType.enable();
      });
  }

  private initializeAddPortfolioForm(): void {
    this.portfolioFormGroup = this.fb.group({
      companyId: [null, [Validators.required]],
      transactionDate: [{ value: null, disabled: true }, [Validators.required]],
      transactionType: [{ value: null, disabled: true }, [Validators.required]],
      units: [
        { disabled: true, value: null },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      pricePerUnit: [
        { value: null, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      casbaCharge: [
        { value: null, disabled: true },
        [minNumberValidator(0, false)],
      ],
      auctionCharge: [
        { value: null, disabled: true },
        [minNumberValidator(0, false)],
      ],
      dividendAmount: [
        { value: null, disabled: true },
        [Validators.required, minNumberValidator(1, true)],
      ],
    });
    this.companyChangeEvent();
    this.transactionTypeChangeEvent();
  }

  public save(): void {
    if (this.portfolioFormGroup.valid) {
      const porffolio: Portfolio = {
        companyId: this.portfolioFormGroup.controls.companyId.value,
        transactions: [
          {
            transactionType:
              this.portfolioFormGroup.controls.transactionType.value,
            transactionDate: new Date(
              this.portfolioFormGroup.controls.transactionDate.value
            )
              .toISOString()
              .slice(0, 10),
            units: this.portfolioFormGroup.controls?.units?.value,
            costPerUnit: this.portfolioFormGroup.controls?.pricePerUnit?.value,
            casbaCharge: this.portfolioFormGroup.controls?.casbaCharge?.value,
            auctionCharge:
              this.portfolioFormGroup.controls?.auctionCharge?.value,
            bonusAmount:
              this.portfolioFormGroup.controls?.dividendAmount?.value,
          },
        ],
      };
      this.store.dispatch(createPortfolio({ portfolio: porffolio }));
    }
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  get portfolioForm(): { [key: string]: AbstractControl } {
    return this.portfolioFormGroup.controls;
  }

  ngOnDestroy(): void {
    if (this.companyListSubscription) {
      this.companyListSubscription.unsubscribe();
    }
    if (this.transactionTypeSubscription) {
      this.transactionTypeSubscription.unsubscribe();
    }
    if (this.companyChangeSubscription) {
      this.companyChangeSubscription.unsubscribe();
    }
  }
}
