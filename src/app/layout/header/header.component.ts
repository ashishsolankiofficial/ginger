import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounce, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  logosmall: string = "../../../assets/images/smalllogo.png"
  dropdownSettings: any
  selectedRestaurant: { ext_id: string; name: string; }[];
  isProductPage: boolean = false;
  restaurantList: any;
  constructor(private authService: AuthService, private restaurantService: RestaurantService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.restaurantService.importRestaurantList.subscribe(resp => {
      if (resp.restaurantList) {
        this.isProductPage = true
        this.restaurantList = resp.restaurantList
        this.selectedRestaurant = [resp.obj]
      }
      else {
        this.isProductPage = false
      }
    })
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'ext_id',
      textField: 'name',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      searchPlaceholderText: 'Search Restaurant',
    };
  }

  onRestaurantSelect(e: any) {
    const queryParams: Params = { restaurant: this.selectedRestaurant[0].ext_id };
    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  onRestaurantDeselect(e: any) {
    const queryParams: Params = { restaurant: null };
    this.router.navigate([],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
  }

  logout() {
    this.authService.logout()
  }
}
