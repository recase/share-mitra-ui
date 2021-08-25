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
  Alert,
  Watchlist,
  TargetLoss,
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
  private alertUrl = this.baseUrl + 'alert/';
  private watchlistUrl = this.baseUrl + 'watchlist/';
  private targetLossUrl = this.baseUrl + 'target-loss/';

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

  public retrieveAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>(this.alertUrl);
  }

  public createAlert(alert: Alert): Observable<any> {
    return this.http.post<any>(this.alertUrl, alert);
  }

  public updateAlert(alert: Alert): Observable<any> {
    return this.http.put<any>(this.alertUrl + `${alert.id}/`, alert);
  }

  public deleteAlert(alertId: number): Observable<any> {
    return this.http.delete<any>(this.alertUrl + `${alertId}/`);
  }

  public retrieveWatchlist(): Observable<Watchlist[]> {
    return this.http.get<Watchlist[]>(this.watchlistUrl);
  }

  public createWatchlist(watchlist: Watchlist): Observable<any> {
    return this.http.post<any>(this.watchlistUrl, watchlist);
  }

  public updateWatchlist(watchlist: Watchlist): Observable<any> {
    return this.http.put<any>(
      this.watchlistUrl + `${watchlist.id}/`,
      watchlist
    );
  }

  public deleteWatchlist(watchlistId: number): Observable<any> {
    return this.http.delete<any>(this.watchlistUrl + `${watchlistId}/`);
  }

  public retrieveTargetLoss(): Observable<TargetLoss[]> {
    return this.http.get<TargetLoss[]>(this.targetLossUrl);
  }

  public createTargetLoss(targetLoss: TargetLoss): Observable<any> {
    return this.http.post<any>(this.targetLossUrl, targetLoss);
  }

  public updateTargetLoss(targetLoss: TargetLoss): Observable<any> {
    return this.http.put<any>(
      this.targetLossUrl + `${targetLoss.id}/`,
      targetLoss
    );
  }

  public deleteTargetLoss(targerLossId: number): Observable<any> {
    return this.http.delete<any>(this.targetLossUrl + `${targerLossId}/`);
  }

  public partialUpdateAlert(alertId: number, data: any): Observable<any> {
    return this.http.patch<any>(this.alertUrl + `${alertId}/`, data);
  }

  public partialUpdateTargetLoss(
    targetLossId: number,
    data: any
  ): Observable<any> {
    return this.http.patch<any>(this.targetLossUrl + `${targetLossId}/`, data);
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
