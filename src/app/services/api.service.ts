import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CompanyData,
  Sector,
  StockPriceList,
  LiveStockList,
} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.base_api_url + 'api/';

  private sectorsUrl = this.baseUrl + 'sector';
  private companiesUrl = this.baseUrl + 'company';
  private livePriceUrl = this.baseUrl + 'live-pirce';
  private stockPriceUrl = this.baseUrl + 'stock-price';

  constructor(private http: HttpClient) {}

  public retrieveSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.sectorsUrl);
  }

  public retrieveCompanies(): Observable<CompanyData[]> {
    return this.http.get<CompanyData[]>(this.companiesUrl);
  }

  public retrieveLivePrice(): Observable<LiveStockList> {
    return this.http.get<LiveStockList>(this.livePriceUrl);
  }

  public retrieveStockPrice(): Observable<StockPriceList> {
    return this.http.get<StockPriceList>(this.stockPriceUrl);
  }
}
