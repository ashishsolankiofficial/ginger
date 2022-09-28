import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(environment.apiUrl + environment.loginUrl, {
        email: email,
        password: password,
      })
      .pipe(
        map((response) => {
          let currentUser: User;
          if (response.access) {
            currentUser = jwt_decode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = response.refresh;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          }
        })
      );
  }

  logout() {
    this.currentUserSubject.next(new User);
    this.router.navigate(['login-page']);
  }

  refreshToken() {
    const refreshToken = this.currentUserValue.refreshToken;
    return this.http
      .post<any>(environment.apiUrl + environment.refreshUrl, {
        refresh: refreshToken,
      })
      .pipe(
        map((response) => {
          let currentUser = new User;
          if (response.access) {
            currentUser = jwt_decode(response.access);
            currentUser.token = response.access;
            currentUser.refreshToken = this.currentUserValue.refreshToken;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            this.currentUserSubject.next(currentUser);
          }
          return currentUser
        }
        )
      );
  }
}
