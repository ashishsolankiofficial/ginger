import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import dayjs from 'dayjs';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-orderlist-page',
  templateUrl: './orderlist-page.component.html',
  styleUrls: ['./orderlist-page.component.css']
})
export class OrderlistPageComponent implements OnInit {

  loading: boolean = true;
  currentPage: number = 1
  maxPage: number;
  multiplier: number;
  selectedRestaurant: any = null;
  restaurantList: any;
  orderList: any
  startDate = dayjs().subtract(7, 'days')
  endDate = dayjs()
  selectedDate: any;
  orderParamsObservable = new Subject();
  orderParams: any = {}


  constructor(private orderService: OrderService, private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, private router: Router) { }

  setRestaurantParams() {
    if (this.selectedRestaurant) {
      this.orderParams['restaurant'] = this.selectedRestaurant
    } else {
      delete this.orderParams['restaurant']
    }
    this.orderParams['page'] = 1
    this.orderParamsObservable.next(this.orderParams)

  }

  datesUpdated(e: any) {
    if (e.startDate && e.endDate) {
      this.orderParams['startDate'] = e.startDate.format("YYYY-MM-DD")
      this.orderParams['endDate'] = e.endDate.format("YYYY-MM-DD")
      this.orderParams['page'] = 1
      this.orderParamsObservable.next(this.orderParams)
    }
  }

  pageUpdate(gotoPage: number) {
    this.orderParams['page'] = gotoPage
    this.orderParamsObservable.next(this.orderParams)
  }

  updatePagination(count: number) {
    this.maxPage = Math.floor(count / 11) + 1
    this.multiplier = Math.floor((this.currentPage - 1) / 5)
  }

  ngOnInit(): void {
    this.restaurantService.selectList().subscribe(resp => this.restaurantList = resp)

    this.selectedDate = { start: this.startDate, end: this.endDate };

    this.orderParamsObservable.subscribe(params => {
      this.orderService.getList(params).subscribe(resp => {
        this.loading = false;
        this.currentPage = resp['current']
        this.orderList = resp['results']
        this.updatePagination(resp.count)
      })
    })

    this.orderParams['startDate'] = this.selectedDate['start'].format("YYYY-MM-DD")
    this.orderParams['endDate'] = this.selectedDate['end'].format("YYYY-MM-DD")
    this.orderParams['page'] = 1
    this.orderParamsObservable.next(this.orderParams)


  }
}
