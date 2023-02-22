import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.css']
})
export class RestaurantPageComponent implements OnInit {

  ext_id: string;
  restaurant: any;
  apiLoaded: Observable<boolean>;
  loading: boolean = true;

  mapOptions: google.maps.MapOptions;
  marker = {
    position: { lat: 28.4334574, lng: 77.1052774 }
  }

  constructor(private restaurantService: RestaurantService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.ext_id = this.route.snapshot.paramMap.get('ext_id') || '';
    this.restaurantService.details(this.ext_id).subscribe(response => {
      this.loading = false;
      this.restaurant = response;
      this.restaurant.cuisines = this.restaurant.cuisines.map((cu: any) => cu.name).join(', ')
      this.mapOptions = {
        center: { lat: this.restaurant.latitude, lng: this.restaurant.longitude },
        zoom: 14
      }
      this.marker = {
        position: { lat: this.restaurant.latitude, lng: this.restaurant.longitude },
      }
    })

  }
}


