import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';


import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currentUser = this.authService.currentUserValue;
    const isLoggedIn = currentUser && currentUser.token;
    const isApiUrl = req.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl && currentUser && req.url != (environment.apiUrl + environment.refreshUrl) && req.url != (environment.apiUrl + environment.loginUrl)) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(req).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse && [401, 403].includes(err.status) && req.url === (environment.apiUrl + environment.refreshUrl)) {
        this.authService.logout();
        return throwError(err)
      }
      else if (err instanceof HttpErrorResponse && [401, 403].includes(err.status)) {
        return this.handleTokenRefresh(req, next);
      }
      else {
        return throwError(err);
      }
    })
    );
  }

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private handleTokenRefresh(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.access);
          return next.handle(this.addToken(request, response.access));
        }));
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }

  private addToken(request: HttpRequest<any>, token: string) {
    const currentUser = this.authService.currentUserValue;
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer  ${currentUser.token}`
      }
    });
  }
}
