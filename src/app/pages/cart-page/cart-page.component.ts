import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { ProductService } from 'src/app/services/product.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  storedCart: any;
  cartItems: any;
  allCart: any;
  restLookup: any = []
  prodFork: any;
  restFork: any;
  prodReq: any = []
  prodLookup: any;
  iterCart: any = []
  error: any;
  constructor(private restaurantService: RestaurantService, private productService: ProductService, private cartService: CartService, private orderService: OrderService) { }

  itemList = [{ name: 'one', quantity: 1, totalPrice: 1 }, { name: 'two', quantity: 2, totalPrice: 2 }]

  ngOnInit(): void {
    this.loadCart()
  }

  onQuantityChange(ext_id: string, id: string, e: any) {
    this.cartService.addItem(ext_id, id, parseInt(e.value))
  }

  onItemDelete(ext_id: string, id: string) {
    this.cartService.deleteItem(ext_id, id)
    this.loadCart()
  }

  onOrderDelete(ext_id: string) {
    this.cartService.deleteOrder(ext_id)
    this.loadCart()
  }

  loadCart() {
    this.iterCart = []
    this.restLookup = []
    this.storedCart = (JSON.parse(localStorage.getItem("cart") || "{}"))
    this.allCart = Object.entries(this.storedCart)
    this.restFork = forkJoin(this.allCart.map((ele: any) => {
      return this.restaurantService.details(ele[0])
    })).subscribe((resp: any) => {
      resp.forEach((i: any) => {
        this.restLookup.push({ 'restaurant': { name: i["name"], address: i["address"], ext_id: i["ext_id"] }, "cart": this.allCart.find((o: any) => o[0] == i["ext_id"])[1] })
      })
      this.prodReq = this.allCart.reduce((x: any = [], y: any) => x.concat(y.reduce((i: any, j: any) => Array.isArray(j) ? i.concat(j) : i, [])), [])
      this.prodFork = forkJoin(this.prodReq.map((ele: any) => {
        return this.productService.getDetails(ele["id"])
      })).subscribe((prodResp: any) => {
        this.prodLookup = prodResp.map((p: any) => p["product"])
        this.restLookup.forEach((i: any) => {
          this.iterCart.push({
            "restaurant": i['restaurant'],
            "cart": i['cart'].map((j: any) => {
              let prodDetails = this.prodLookup.find((o: any) => o["id"] == j["id"])
              return { "id": j["id"], "quantity": j["quantity"], "product_name": prodDetails["product_name"], "price": prodDetails["price"] }
            })
          })
        })
        this.iterCart.sort(function (a: any, b: any) {
          let x = a.restaurant.name.toLowerCase();
          let y = b.restaurant.name.toLowerCase();
          if (x < y) { return -1; } else { return 1; }
        })
      })
    })
  }

  placeOrder(details: any) {
    this.orderService.placeOrder(details["restaurant"].ext_id, details["cart"]).subscribe(resp => {
      this.onOrderDelete(details["restaurant"].ext_id)
    }, error => {
      console.error(error)
    })
  }
}






