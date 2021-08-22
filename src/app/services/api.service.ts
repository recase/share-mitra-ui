import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  CompanyData,
  Sector,
  StockPriceList,
  LiveStockList,
  loginResponse,
  NewUser,
  User,
  CompletePortfolio,
  CompanyListingData,
  Portfolio,
  Transaction,
} from '../interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.base_api_url + 'api/';

  private sectorsUrl = this.baseUrl + 'sector/';
  private companiesUrl = this.baseUrl + 'company/';
  private livePriceUrl = this.baseUrl + 'live-pirce/';
  private stockPriceUrl = this.baseUrl + 'stock-price/';
  private loginUrl = this.baseUrl + 'login/';
  private logoutUrl = this.baseUrl + 'logout/';
  private signupUrl = this.baseUrl + 'register/';
  private userInfoUrl = this.baseUrl + 'user-info/';
  private refreshTokenUrl = this.baseUrl + 'token/refresh';
  private portfolioUrl = this.baseUrl + 'portfolio/';
  private portfolioTransactionUrl = this.baseUrl + 'portfolio-transaction/';
  private companyListingUrl = this.baseUrl + 'company/listing-data/';

  constructor(private http: HttpClient) {}

  public retrieveSectors(): Observable<Sector[]> {
    return this.http.get<Sector[]>(this.sectorsUrl);
  }

  public retrieveCompanies(): Observable<CompanyData[]> {
    return this.http.get<CompanyData[]>(this.companiesUrl);
  }

  public retrieveCompanyListing(): Observable<CompanyListingData[]> {
    return this.http.get<CompanyListingData[]>(this.companyListingUrl);
  }

  public retrieveLivePrice(): Observable<LiveStockList> {
    return this.http.get<LiveStockList>(this.livePriceUrl);
  }

  public retrieveStockPrice(): Observable<StockPriceList> {
    return this.http.get<StockPriceList>(this.stockPriceUrl);
  }

  public login(email: string, password: string): Observable<loginResponse> {
    const data = {
      email: email,
      password: password,
    };
    return this.http.post<loginResponse>(this.loginUrl, data);
  }

  public signup(user: NewUser): Observable<any> {
    return this.http.post<any>(this.signupUrl, user);
  }

  public logout(refreshToken: string): Observable<any> {
    return this.http.post<any>(this.logoutUrl, { refreshToken: refreshToken });
  }

  public userInfo(): Observable<User> {
    return this.http.get<User>(this.userInfoUrl);
  }

  public refreshToken(): Observable<{ access: string }> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<{ access: string }>(this.refreshTokenUrl, {
      refresh: refreshToken,
    });
  }

  public retrievePortfolioData(): Observable<CompletePortfolio> {
    return this.http.get<CompletePortfolio>(this.portfolioUrl);
  }

  public createPortfolio(portfolio: Portfolio): Observable<any> {
    return this.http.post<any>(this.portfolioUrl, portfolio);
  }

  public deletePortfolio(portfolioId: number): Observable<any> {
    return this.http.delete<any>(this.portfolioUrl + `${portfolioId}/`);
  }

  public createPortfolioTransaction(transaction: Transaction): Observable<any> {
    return this.http.post<any>(this.portfolioTransactionUrl, transaction);
  }

  public updatePortfolioTransaction(transaction: Transaction): Observable<any> {
    return this.http.put<any>(
      this.portfolioTransactionUrl + `${transaction.id}/`,
      transaction
    );
  }

  public deletePortfolioTransaction(transactionId: number): Observable<any> {
    return this.http.delete<any>(
      this.portfolioTransactionUrl + `${transactionId}/`
    );
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
