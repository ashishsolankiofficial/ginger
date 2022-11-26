import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  placeOrder(ext_id: string, cart: any) {
    let order_details = { restaurant: ext_id, product: cart }
    return this.http.post<any>(environment.apiUrl + environment.orderUrl, order_details)
  }

  getList(orderParams: any) {
    return this.http.get<any>(environment.apiUrl + environment.orderUrl, { 'params': orderParams }).pipe(shareReplay());
  }

  getOrderDetails(ext_id: any) {
    return this.http.get<any>(environment.apiUrl + environment.orderUrl + ext_id).pipe(shareReplay());
  }

}
