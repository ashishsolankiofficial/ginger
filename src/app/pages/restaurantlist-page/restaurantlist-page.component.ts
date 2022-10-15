import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, take } from 'rxjs';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-restaurantlist-page',
  templateUrl: './restaurantlist-page.component.html',
  styleUrls: ['./restaurantlist-page.component.css']
})
export class RestaurantlistPageComponent implements OnInit {
  [x: string]: any;

  constructor(private restaurantService: RestaurantService, private utilService: UtilService, private router: Router, private activatedRoute: ActivatedRoute) { }

  restaurantData: any
  cities: any
  selectedCity: any = null;
  searchName: string;

  setCityParams() {
    const queryParams: Params = { city: this.selectedCity != null ? this.selectedCity.ext_id : undefined };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }
  setNameParams() {
    const queryParams: Params = { search: this.searchName != '' ? this.searchName : undefined };
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: 'merge',
    });
  }



  ngOnInit(): void {
    this.restaurantService.list().subscribe(respose => {
      this.restaurantData = respose.map(
        (re: any) => {
          re.cuisines = re.cuisines.map((cu: any) => cu.name).join(', ')
          return re
        })
    });
    this.activatedRoute.queryParams.pipe(debounceTime(500), distinctUntilChanged()).subscribe(params => {
      if (Object.keys(params).length !== 0 && params.constructor === Object) {
        this.restaurantService.list(params).subscribe(respose => {
          this.restaurantData = respose.map(
            (re: any) => {
              re.cuisines = re.cuisines.map((cu: any) => cu.name).join(', ')
              return re
            })
        });
      }
    })
    this.utilService.getCities().subscribe(resp => {
      this.cities = resp.sort(function (a: { name: string; }, b: { name: string; }) {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0;
      })
      this.activatedRoute.queryParams.pipe(take(1)).subscribe(params => {
        this.searchName = params['search'] ? params['search'] : undefined
        if (params['city']) {
          this.selectedCity = this.cities.find((o: any) => o.ext_id == params['city'])
        }
      })

    })
  }
}


