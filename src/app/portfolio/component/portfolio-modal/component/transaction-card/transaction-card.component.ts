import { Component, Input, OnInit } from '@angular/core';
import { TransactionType } from 'src/app/enums';
import { Transaction } from 'src/app/interface';

@Component({
  selector: 'app-transaction-card',
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss'],
})
export class TransactionCardComponent implements OnInit {
  @Input() public transaction!: Transaction;
  public collapseCard: boolean = true;

  constructor() {}

  ngOnInit(): void {}

  public toggleCollapse(): void {
    console.log('toggle clicked');
    this.collapseCard = !this.collapseCard;
  }

  public editTransaction(): void {
    event?.stopPropagation();
    console.log('edit clicked');
  }

  public deleteTransaction(): void {
    event?.stopPropagation();
    console.log('delete clicked');
  }

  get transactionType() {
    return TransactionType;
  }
}
