import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {

  constructor(private http: HttpClient) { }

  list(params?: any) {
    if (params != undefined) {
      return this.http.get<any>(environment.apiUrl + environment.restaurantUrl, { 'params': params })
        .pipe(shareReplay());
    }
    return this.http
      .get<any>(environment.apiUrl + environment.restaurantUrl)
      .pipe(shareReplay());
  }

  details(ext_id: string) {
    return this.http
      .get<any>(environment.apiUrl + environment.restaurantUrl + ext_id)
      .pipe(shareReplay());
  }
}
