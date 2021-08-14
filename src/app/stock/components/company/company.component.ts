import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CompanyData, StockState } from 'src/app/interface';
import { ApiService } from 'src/app/services/api.service';
import { retrieveCompanyData } from '../../store/stock.actions';
import { companiesSelector } from '../../store/stock.selectors';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit, OnDestroy {
  public companyList!: CompanyData[];
  public displayedColumns: string[] = ['symbol', 'name', 'sector'];
  private companiesSubscription!: Subscription;

  constructor(private api: ApiService, private store: Store<StockState>) {}

  ngOnInit(): void {
    this.store.dispatch(retrieveCompanyData());
    this.companiesSubscription = this.store.select(companiesSelector).subscribe(
      (data: CompanyData[]) => {
        this.companyList = data;
      },
      (err) => console.log(err)
    );
  }

  ngOnDestroy(): void {
    if (this.companiesSubscription) {
      this.companiesSubscription.unsubscribe();
    }
  }
}
