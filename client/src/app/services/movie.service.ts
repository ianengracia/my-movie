import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../interfaces/Movie';
import { Rating } from '../interfaces/Rating';

import { WebResponse } from '../interfaces/WebResponse';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  //get all
  findAll(): Observable<WebResponse> {
    const url = `${environment.MOVIES_CONTEXT}`;

    return this.http.get<WebResponse>(url);
  }

  //search
  searchMovies(searchFor: string): Observable<WebResponse> {
    const url = `${environment.MOVIES_CONTEXT}/search?t=${searchFor}`;

    return this.http.get<WebResponse>(url);
  }

  //get user movies
  findAllByUser(): Observable<WebResponse> {
    const url = `${environment.MOVIES_CONTEXT}/user`;

    return this.http.get<WebResponse>(url, this.getAuthHeader());
  }

  //search
  findById(id: number): Observable<WebResponse> {
    const url = `${environment.MOVIES_CONTEXT}/details?id=${id}`;

    return this.http.get<WebResponse>(url);
  }

  //save movie
  saveMovie(movie: Movie, toDo: string | null = null): Observable<WebResponse> {
    const url = `${environment.MOVIES_CONTEXT}`;

    if (toDo === 'UPDATE')
      return this.http.patch<WebResponse>(url, movie, this.getAuthJsonHeader());

    return this.http.post<WebResponse>(url, movie, this.getAuthJsonHeader());
  }

  //delete movie
  deleteMovie(id: any): Observable<WebResponse> {
    const url = `${environment.MOVIES_CONTEXT}?id=${id}`;

    return this.http.delete<WebResponse>(url, this.getAuthHeader());
  }

  //rate movie
  rateMovie(rating: Rating): Observable<WebResponse> {
    const url = `${environment.MOVIES_CONTEXT}/rate`;

    return this.http.patch<WebResponse>(url, rating, this.getAuthJsonHeader());
  }

  /****************************************
   *
   * Helpers
   *
   */

  getToken() {
    return localStorage.getItem('token') ?? undefined;
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
