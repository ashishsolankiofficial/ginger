import { Component, OnInit } from '@angular/core';
import dayjs from 'dayjs';
import { Subject } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-orderlist-page',
  templateUrl: './orderlist-page.component.html',
  styleUrls: ['./orderlist-page.component.css']
})
export class OrderlistPageComponent implements OnInit {

  selectedRestaurant: any = null;
  restaurantList: any;
  orderList: any
  startDate = dayjs().subtract(7, 'days')
  endDate = dayjs()
  selectedDate: any;
  orderParamsObservable = new Subject();
  orderParams: any = {}


  constructor(private orderService: OrderService, private restaurantService: RestaurantService) { }

  setRestaurantParams() {
    if (this.selectedRestaurant) {
      this.orderParams['restaurant'] = this.selectedRestaurant
    } else {
      delete this.orderParams['restaurant']
    }
    this.orderParamsObservable.next(this.orderParams)

  }

  datesUpdated(e: any) {
    if (e.startDate && e.endDate) {
      this.orderParams['startDate'] = e.startDate.format("YYYY-MM-DD")
      this.orderParams['endDate'] = e.endDate.format("YYYY-MM-DD")
    }
    this.orderParamsObservable.next(this.orderParams)
  }


  ngOnInit(): void {
    this.restaurantService.selectList().subscribe(resp => this.restaurantList = resp)
    this.selectedDate = { start: this.startDate, end: this.endDate };
    this.orderParamsObservable.subscribe(params => {
      this.orderService.getList(params).subscribe(resp => {
        this.orderList = resp
      })
    })
    this.orderParams['startDate'] = this.startDate.format("YYYY-MM-DD")
    this.orderParams['endDate'] = this.endDate.format("YYYY-MM-DD")
    this.orderParamsObservable.next(this.orderParams)
  }

}
