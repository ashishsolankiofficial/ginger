import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
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
  iterCart: any = []
  constructor(private restaurantService: RestaurantService, private productService: ProductService, private cartService: CartService) { }

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

  loadCart() {
    this.iterCart = []
    this.storedCart = (JSON.parse(localStorage.getItem("cart") || "{}"))
    this.allCart = Object.entries(this.storedCart)
    this.allCart.forEach((ele: any[]) => {
      this.restaurantService.details(ele[0]).subscribe(resp => {
        ele[0] = { name: resp.name, address: resp.address, ext_id: resp.ext_id }
        ele[1].forEach((i: any) => {
          this.productService.getDetails(i.id).subscribe(r => {
            i['name'] = r.product.product_name
            i['price'] = r.product.price
            i['itemTotal'] = i['price'] * i["quantity"]
          })
        })
        this.iterCart.push({ restaurant: ele[0], cart: ele[1] })
        this.iterCart.sort(function (a: any, b: any) {
          let x = a.restaurant.name.toLowerCase();
          let y = b.restaurant.name.toLowerCase();
          if (x < y) { return -1; } else { return 1; }
        })
      })
    })
  }

}




