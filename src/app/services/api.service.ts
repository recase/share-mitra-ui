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

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
  public getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}
