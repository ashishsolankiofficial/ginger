import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http
      .post<User>(
        environment.apiUrl + environment.loginUrl,
        {
          email: email,
          password: password,
        },
        { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      )
      .pipe(shareReplay());
  }
}
