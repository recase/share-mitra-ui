import { Component, OnInit } from '@angular/core';
import { CompanyData } from 'src/app/interface';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  public companyList: CompanyData[] = [
    {
      name: 'Nabil bank limited',
      symbol: 'nabil',
      sector: 'bank',
      instrumentType: 'equity',
    },
  ];
  public displayedColumns: string[] = ['symbol', 'name', 'sector'];

  constructor() {}

  ngOnInit(): void {}
}
