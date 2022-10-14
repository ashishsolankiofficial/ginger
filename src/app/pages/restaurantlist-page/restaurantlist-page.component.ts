import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurantlist-page',
  templateUrl: './restaurantlist-page.component.html',
  styleUrls: ['./restaurantlist-page.component.css']
})
export class RestaurantlistPageComponent implements OnInit {

  constructor(private restaurantService: RestaurantService) { }

  restaurantData: any

  ngOnInit(): void {
    this.restaurantService.list().subscribe(respose => {
      this.restaurantData = respose.map(
        (re: any) => {
          re.cuisines = re.cuisines.map((cu: any) => cu.name).join(', ')
          return re
        })
    });
  }

}
