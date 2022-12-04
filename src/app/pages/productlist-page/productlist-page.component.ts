import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, debounceTime, distinctUntilChanged, elementAt } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-productlist-page',
  templateUrl: './productlist-page.component.html',
  styleUrls: ['./productlist-page.component.css']
})
export class ProductlistPageComponent implements OnInit {

  imgLoaded: boolean = false;
  productData: any;
  searchText: string;
  sliderMin: number = 0
  sliderMax: number = 200
  minText: number;
  maxText: number;
  priceGap = 40
  minPercent: string = "0%"
  maxPercent: string = "0%"
  rangeInput: NodeListOf<HTMLInputElement>;
  priceInput: NodeListOf<Element>;
  brands: any;
  dropdownList: any;
  selectedBrands: any;
  selectedCategories: any;
  dropdownSettings: IDropdownSettings;
  categories: any;
  productFilter = new BehaviorSubject({ 'page': 1, 'search': "", 'minPrice': 0, 'maxPrice': 200, 'brand': [], 'category': [] });
  productParams: any;
  currentPage: number;
  multiplier: number;
  maxPage: number;
  restaurantList: { ext_id: string; name: string; }[];
  selectedRestaurant: string;
  urlPage: number;

  constructor(private productService: ProductService, private restaurantService: RestaurantService, private cartService: CartService, private router: Router, private activatedRoute: ActivatedRoute) { }

  onSearch() {
    this.productFilter.next({ 'page': this.productParams['page'], 'search': this.searchText, 'minPrice': this.productParams['minPrice'], 'maxPrice': this.productParams['maxPrice'], 'brand': this.productParams['brand'], 'category': this.productParams['category'] })
  }

  sliderChanged(e: any) {

    if (parseInt(this.rangeInput[1].value) - parseInt(this.rangeInput[0].value) < this.priceGap) {
      if (e.className === 'range-min') {
        this.rangeInput[0].value = (parseInt(this.rangeInput[1].value) - this.priceGap).toString()
      } else {
        this.rangeInput[1].value = (parseInt(this.rangeInput[0].value) + this.priceGap).toString()
      }
    }
    this.minPercent = (parseInt(this.rangeInput[0].value) / 200 * 100) + "%"
    this.maxPercent = (100 - parseInt(this.rangeInput[1].value) / 200 * 100) + "%"
    this.minText = parseInt(this.rangeInput[0].value)
    this.maxText = parseInt(this.rangeInput[1].value)
    this.productFilter.next({ 'page': this.productParams['page'], 'search': this.productParams['search'], 'minPrice': this.minText, 'maxPrice': this.maxText, 'brand': this.productParams['brand'], 'category': this.productParams['category'] })
  }


  onBrandSelect(e: any) {
    this.productFilter.next({ 'page': this.productParams['page'], 'search': this.productParams['search'], 'minPrice': this.productParams['minPrice'], 'maxPrice': this.productParams['maxPrice'], 'brand': this.selectedBrands, 'category': this.productParams['category'] })
  }

  onCategorySelect(e: any) {
    this.productFilter.next({ 'page': this.productParams['page'], 'search': this.productParams['search'], 'minPrice': this.productParams['minPrice'], 'maxPrice': this.productParams['maxPrice'], 'brand': this.productParams['brand'], 'category': this.selectedCategories })
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(params => {
      this.urlPage = params['page'] ? Number(params['page']) : 1
      if (this.urlPage != this.currentPage) {
        this.currentPage = this.urlPage
        this.multiplier = Math.floor((this.currentPage - 1) / 5)
        this.productFilter.next({ 'page': this.currentPage, 'search': "", 'minPrice': 0, 'maxPrice': 200, 'brand': [], 'category': [] })
      }
      this.selectedRestaurant = this.activatedRoute.snapshot.queryParams['restaurant']
    })

    if (this.activatedRoute.snapshot.queryParams['restaurant']) {
      this.restaurantService.loadRestaurantSelecter(this.activatedRoute.snapshot.queryParams['restaurant'])
    } else {
      this.restaurantService.loadRestaurantSelecter()
    }

    this.dropdownSettings = {
      singleSelection: false,
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 5,
    };
    this.productService.getBrands().subscribe(resp => {
      this.brands = resp['response']
    })
    this.productService.getCategories().subscribe(resp => {
      this.categories = resp['response']
    })

    this.minText = this.sliderMin;
    this.maxText = this.sliderMax;
    this.rangeInput = document.querySelectorAll(".range-input input")
    this.productFilter.pipe(debounceTime(500), distinctUntilChanged()).subscribe(resp => {
      this.productParams = resp
      this.restaurantService.restaurantObservable.subscribe(resp => {
        this.productFilter.next({ 'page': this.productParams['page'], 'search': this.productParams['search'], 'minPrice': this.productParams['minPrice'], 'maxPrice': this.productParams['maxPrice'], 'brand': this.productParams['brand'], 'category': this.productParams['category'] })
      })
      this.productService.list(this.productParams).subscribe(resp => {
        this.imgLoaded = false
        this.productData = resp.products
        this.maxPage = Math.floor(resp.count / 10) + 1
        let idArr = resp.products.map((p: any) => p.id)
        this.productService.getImages(idArr).subscribe(imgArr => {
          this.imgLoaded = true;
          this.productData.map((prod: any) => {
            prod['image_url'] = imgArr.response.find((o: any) => o.id === prod['id']).image;
            return prod
          })
        }
        )
      })

    })

  }
  ngOnDestroy() {
    this.restaurantService.unloadRestaurantSelecter()
  }

  addItem(id: string, quantity: string) {
    let index = this.productData.findIndex((o: any) => o.id == id)
    this.productData[index]['clicked'] = true
    if (this.selectedRestaurant) {
      this.cartService.addItem(this.selectedRestaurant, id, quantity ? parseInt(quantity) : 1)
      this.productData[index]['added'] = true
      this.productData[index]['clicked'] = false
    }
  }

}
