import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  list(params: any) {
    return this.http
      .get<any>(environment.apiUrl + environment.productUrl, {
        'params': params
      })
      .pipe(shareReplay());

  }

  getImages(idArray: string[]) {
    return this.http.post<any>(environment.apiUrl + environment.productImageUrl, {
      ids: idArray
    }).pipe(shareReplay())
  }

  getBrands() {
    return this.http
      .get<any>(environment.apiUrl + environment.brandUrl)
      .pipe(shareReplay());
  }
  getCategories() {
    return this.http
      .get<any>(environment.apiUrl + environment.categoryUrl)
      .pipe(shareReplay());
  }
}

