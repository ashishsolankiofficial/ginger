import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant';
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
  ext_id: string;
  addMode: boolean;
  restaurant: any;
  tempCity: any;
  loading: boolean = true;

  constructor(private restaurantService: RestaurantService, private utilService: UtilService, private route: ActivatedRoute, private router: Router) { }

  @ViewChild('contactForm') contactForm: NgForm;

  submit(data: any) {
    data.city = this.cities.find((o: any) => o.ext_id == data.city)
    if (!this.addMode) {
      this.restaurantService.saveExistingResturant(this.ext_id, data).subscribe(resp => {
        this.router.navigate(['restaurant/' + resp['ext_id']])
      }, error => console.warn(error))
    } else {
      this.restaurantService.saveResturant(data).subscribe(resp => {
        this.router.navigate(['restaurant/' + resp['ext_id']])
      }, error => console.warn(error))
    }
  }

  ngOnInit(): void {

    this.utilService.getCities().subscribe((resp: any) => {
      this.cities = resp.sort(function (a: { name: string; }, b: { name: string; }) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0;
      })
      this.loading = false
    })
    this.restaurantService.getCuisines().subscribe(resp => this.cuisines = resp)

    this.dropdownSettings = {
      singleSelection: false,
      itemsShowLimit: 5,
      allowSearchFilter: true,
      limitSelection: 20,
      idField: 'ext_id',
      textField: 'name',
    };

    this.ext_id = this.route.snapshot.params['ext_id'];
    this.addMode = !this.ext_id

    if (!this.addMode) {
      this.restaurantService.details(this.ext_id).subscribe(resp => {
        this.restaurant = resp
        this.selectedCuisines = resp['cuisines']
      });
    } else {
      this.restaurant = { 'city': { ext_id: "", name: "" } }
    }

  }

}
