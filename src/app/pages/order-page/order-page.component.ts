import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';



@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css']
})
export class OrderPageComponent implements OnInit {
  loading: boolean = true;
  order: any;


  constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderService.getOrderDetails(this.activatedRoute.snapshot.paramMap.get('ext_id')).subscribe(resp => {
      this.loading = false
      this.order = resp
    })
  }

}

