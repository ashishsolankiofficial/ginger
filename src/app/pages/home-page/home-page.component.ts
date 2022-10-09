import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestaurantService } from '../../services/restaurant.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private restaurantService: RestaurantService,
  ) { }



  ngOnInit(): void {
    this.restaurantService.list().subscribe();
  }
}
