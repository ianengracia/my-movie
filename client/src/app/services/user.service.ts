import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { User } from '../interfaces/User';
import { WebResponse } from '../interfaces/WebResponse';
import { Credentials } from '../interfaces/Credentials';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isUserLoggedIn: boolean;
  private isUserLoggedInSubject = new Subject<any>();

  public user: any;
  public userSubject = new Subject<any>();

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {
    this.isUserLoggedIn = this.checkUserLoggedIn();
  }

  loadUser(): Observable<WebResponse> {
    const url = `${environment.USERS_CONTEXT}/profile`;

    return this.http.get<WebResponse>(url, this.getAuthHeader());
  }

  register(user: User): Observable<WebResponse> {
    const url = `${environment.USERS_CONTEXT}/register`;

    return this.http.post<WebResponse>(url, user, this.getJsonHeader());
  }

  login(credentials: Credentials): Observable<WebResponse> {
    const url = `${environment.USERS_CONTEXT}/login`;

    return this.http.post<WebResponse>(url, credentials, this.getJsonHeader());
  }

  /****************************************
   *
   * Helpers
   *
   */

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token') ?? undefined;
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  loadedUser(user: any): void {
    if (!user) this.userSubject.next(this.user);

    this.user = user;
    this.userSubject.next(this.user);
  }

  onLoadUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  loginUser(): void {
    this.isUserLoggedIn = this.checkUserLoggedIn();
    this.isUserLoggedInSubject.next(this.isUserLoggedIn);
  }

  onLoginUser(): Observable<any> {
    return this.isUserLoggedInSubject.asObservable();
  }

  logoutUser(): void {
    this.isUserLoggedIn = this.checkUserLoggedIn();
    this.user = null;
    this.userSubject.next(this.user);
    this.isUserLoggedInSubject.next(this.isUserLoggedIn);
  }

  checkUserLoggedIn(): boolean {
    const token = this.getToken();

    return !this.jwtHelper.isTokenExpired(token);
  }

  getUser(): User {
    return this.user;
  }

  /***************************
   *
   *
   * Headers
   *
   */

  getJsonHeader() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAuthJsonHeader() {
    const token = this.getToken();

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getAuthHeader() {
    const token = this.getToken();

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }
}

export function tokenGetter() {
  return localStorage.getItem('token');
}
