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
import { TransactionType } from 'src/app/enums';
import {
  PortfolioState,
  Transaction,
  TransactionModalInterface,
} from 'src/app/interface';
import { transactionsTypes } from 'src/app/shared/transaction-types';
import { minNumberValidator } from '../../shared/custom-validators/min-number-validator';
import {
  createTransaction,
  updateTransaction,
} from '../../store/portfolio.actions';
import { transactionApiLoadingSelector } from '../../store/portfolio.selectors';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss'],
})
export class AddTransactionComponent implements OnInit, OnDestroy {
  public transactionFormGroup!: FormGroup;
  public today = new Date();
  public transactionLoading: boolean = false;
  public transactionTypeList = transactionsTypes;
  public buttonText!: string;
  public title!: string;
  public myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Friday from being selected.
    return day !== 5 && day !== 6;
  };
  private transactionLoadingFlagSubscription: Subscription | undefined;
  private transactionTypeSubscription: Subscription | undefined;

  private buttonTextOptions = {
    save: 'save',
    edit: 'update',
  };
  private titleOptions = {
    new: 'Add transaction',
    edit: 'Update transaction',
  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: TransactionModalInterface,
    private fb: FormBuilder,
    private store: Store<PortfolioState>,
    private dialogRef: MatDialogRef<AddTransactionComponent>
  ) {}

  ngOnInit(): void {
    this.transactionLoadingFlagSubscription = this.store
      .select(transactionApiLoadingSelector)
      .subscribe((flag) => {
        if (this.transactionLoading && !flag) {
          this.closeModal();
        }
        this.transactionLoading = flag;
      });
    if (this.data.option === 'add') {
      this.buttonText = this.buttonTextOptions.save;
      this.title = this.titleOptions.new;
      this.initializeNewTransactionoForm();
    } else if (this.data.option === 'edit' && this.data.transaction) {
      this.buttonText = this.buttonTextOptions.save;
      this.title = this.titleOptions.edit;
      this.initializeUpdateTransactionoForm(this.data.transaction);
    }
  }

  private transactionTypeChangeEvent(): void {
    this.transactionTypeSubscription =
      this.transactionFormGroup.controls.transactionType.valueChanges.subscribe(
        (value) => {
          this.enableRelatedFields(value);
        }
      );
  }

  private disableFields(): void {
    this.transactionFormGroup.controls.dividendAmount.disable();
    this.transactionFormGroup.controls.auctionCharge.disable();
    this.transactionFormGroup.controls.casbaCharge.disable();
    this.transactionFormGroup.controls.pricePerUnit.disable();
    this.transactionFormGroup.controls.units.disable();
  }

  private initializeUpdateTransactionoForm(transaction: Transaction): void {
    this.transactionFormGroup = this.fb.group({
      transactionDate: [transaction.transactionDate, [Validators.required]],
      transactionType: [transaction.transactionType, [Validators.required]],
      units: [
        { disabled: true, value: transaction.units },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      pricePerUnit: [
        { value: transaction.costPerUnit, disabled: true },
        [Validators.required, minNumberValidator(0.1, true)],
      ],
      casbaCharge: [
        { value: transaction.casbaCharge, disabled: true },
        [minNumberValidator(0, false)],
      ],
      auctionCharge: [
        { value: transaction.auctionCharge, disabled: true },
        [minNumberValidator(0, false)],
      ],
      dividendAmount: [
        { value: transaction.bonusAmount, disabled: true },
        [Validators.required, minNumberValidator(1, true)],
      ],
    });
    this.enableRelatedFields(
      this.transactionFormGroup.controls.transactionType.value
    );
    this.transactionTypeChangeEvent();
  }

  private enableRelatedFields(value: string) {
    if (!value) {
      return;
    }
    this.disableFields();
    if (value === TransactionType.Dividend) {
      this.transactionFormGroup.controls.dividendAmount.enable();
    } else {
      this.transactionFormGroup.controls.units.enable();
      if (value !== TransactionType.Bonus) {
        this.transactionFormGroup.controls.pricePerUnit.enable();
      }
    }
    if (
      value === TransactionType.IPO ||
      value === TransactionType.FPO ||
      value === TransactionType.Right
    ) {
      this.transactionFormGroup.controls.casbaCharge.enable();
    }
    if (value === TransactionType.Auction) {
      this.transactionFormGroup.controls.auctionCharge.enable();
    }
  }

  private initializeNewTransactionoForm(): void {
    this.transactionFormGroup = this.fb.group({
      transactionDate: [null, [Validators.required]],
      transactionType: [null, [Validators.required]],
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
    this.transactionTypeChangeEvent();
  }

  public save(): void {
    if (this.transactionFormGroup.valid) {
      const transaction: Transaction = {
        portfolio: this.data.portfolioId,
        transactionType:
          this.transactionFormGroup.controls.transactionType.value,
        transactionDate: new Date(
          this.transactionFormGroup.controls.transactionDate.value
        )
          .toISOString()
          .slice(0, 10),
        units: this.transactionFormGroup.controls?.units?.value,
        costPerUnit: this.transactionFormGroup.controls?.pricePerUnit?.value,
        casbaCharge: this.transactionFormGroup.controls?.casbaCharge?.value,
        auctionCharge: this.transactionFormGroup.controls?.auctionCharge?.value,
        bonusAmount: this.transactionFormGroup.controls?.dividendAmount?.value,
      };

      if (this.data.option === 'add') {
        this.store.dispatch(createTransaction({ transaction: transaction }));
      } else if (this.data.option === 'edit') {
        transaction.id = this.data.transaction?.id;
        this.store.dispatch(updateTransaction({ transaction: transaction }));
      }
    }
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  get transactionForm(): { [key: string]: AbstractControl } {
    return this.transactionFormGroup.controls;
  }

  ngOnDestroy() {
    if (this.transactionLoadingFlagSubscription) {
      this.transactionLoadingFlagSubscription.unsubscribe();
    }

    if (this.transactionTypeSubscription) {
      this.transactionTypeSubscription.unsubscribe();
    }
  }
}
