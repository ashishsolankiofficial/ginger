import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor() { }

  addItem(restaurant: string, id: string, quantity: number) {
    let cart: any = JSON.parse(localStorage.getItem("cart") || "{}")
    let restCart = cart[restaurant] ? cart[restaurant] : []
    let presentIndex = restCart.findIndex((o: { id: string; }) => o.id == id)
    let obj = { id: id, quantity: quantity }
    if (presentIndex >= 0) {
      restCart[presentIndex] = obj
    } else {
      restCart.push(obj)
    }
    cart[restaurant] = restCart
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  deleteItem(restaurant: string, id: string) {
    let cart: any = JSON.parse(localStorage.getItem("cart") || "{}")
    let restCart = cart[restaurant] ? cart[restaurant] : []
    let presentIndex = restCart.findIndex((o: { id: string; }) => o.id == id)
    if (presentIndex >= 0) {
      restCart.splice(presentIndex, 1)
    }
    if (restCart.length < 1) {
      delete cart[restaurant]
    } else {
      cart[restaurant] = restCart
    }
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  deleteOrder(restaurant: string) {
    let cart: any = JSON.parse(localStorage.getItem("cart") || "{}")
    delete cart[restaurant]
    localStorage.setItem("cart", JSON.stringify(cart))
  }

}
