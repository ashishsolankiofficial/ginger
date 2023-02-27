import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {

  importRestaurantList: Subject<any> = new Subject()
  restaurantObservable: Subject<any> = new Subject()
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

  selectList() {
    return this.http
      .get<any>(environment.apiUrl + environment.restaurantSelectUrl)
      .pipe(shareReplay());
  }

  details(ext_id: string) {
    return this.http
      .get<any>(environment.apiUrl + environment.restaurantUrl + ext_id)
      .pipe(shareReplay());
  }

  getCuisines() {
    return this.http.get<any>(environment.apiUrl + environment.cuisineUrl).pipe(shareReplay())
  }

  saveResturant(data: any) {
    return this.http.post<any>(environment.apiUrl + environment.restaurantUrl, data)
  }

  saveExistingResturant(ext_id: string, data: any) {
    return this.http.put<any>(environment.apiUrl + environment.restaurantUrl + ext_id + '/', data)
  }

  loadRestaurantSelecter(selectedRestaurant?: string) {
    this.selectList().subscribe(resp => {
      let restaurantList = resp.map((rest: { [x: string]: any; }) => {
        rest['name'] = rest['name'] + ' (' + rest['ext_id'] + ')'
        return rest
      })
      if (selectedRestaurant) {
        let obj = restaurantList.find((o: { ext_id: string }) => o.ext_id == selectedRestaurant)
        this.importRestaurantList.next({ restaurantList, obj })
      } else {
        this.importRestaurantList.next({ restaurantList })
      }
    })
  }

  unloadRestaurantSelecter() {
    this.importRestaurantList.next({})
  }

}
