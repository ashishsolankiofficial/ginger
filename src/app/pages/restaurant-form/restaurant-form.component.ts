import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant'
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UtilService } from 'src/app/services/util.service'

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {

  cities: any;
  dropdownSettings: any
  cuisines: any;
  selectedCuisines: any

  constructor(private restaurantService: RestaurantService, private utilService: UtilService, private route: ActivatedRoute) { }

  submit(data: any) {


  }
  ngOnInit(): void {

    this.dropdownSettings = {
      singleSelection: false,
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 5,
      idField: 'ext_id',
      textField: 'name',
    };

    this.utilService.getCities().subscribe((resp: any) => {
      this.cities = resp.sort(function (a: { name: string; }, b: { name: string; }) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0;
      })
    })

    this.restaurantService.getCuisines().subscribe(resp => this.cuisines = resp)


  }

}
