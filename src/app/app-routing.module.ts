import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { AuthGuard } from './guard/auth.guard';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RestaurantlistPageComponent } from './pages/restaurantlist-page/restaurantlist-page.component';
import { ProductlistPageComponent } from './pages/productlist-page/productlist-page.component';
import { RestaurantFormComponent } from './pages/restaurant-form/restaurant-form.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderlistPageComponent } from './pages/orderlist-page/orderlist-page.component';

const routes: Routes = [
  {
    path: 'login-page', component: LoginPageComponent,
    children: [
      {
        path: '',
        component: LoginFormComponent,
      },
      {
        path: 'register',
        component: RegisterFormComponent,
      }]
  },
  {
    path: 'home-page', component: HomePageComponent, canActivate: [AuthGuard],
    children: [
      {
        path: 'restaurants',
        component: RestaurantlistPageComponent,
      },
      {
        path: 'products',
        component: ProductlistPageComponent,
      },
      {
        path: 'restaurant',
        children: [
          {
            path: 'add',
            component: RestaurantFormComponent,
          },
          {
            path: 'edit/:ext_id',
            component: RestaurantFormComponent,
          },
          {
            path: ':ext_id',
            component: RestaurantPageComponent,
          }
        ]
      }, {
        path: 'cart',
        component: CartPageComponent,
      },
      {
        path: 'order',
        children: [
          {
            path: '',
            component: OrderlistPageComponent,
          },
          {
            path: ':ext_id',
            component: OrderPageComponent,
          }
        ]

      },
    ]
  },
  { path: '**', redirectTo: 'home-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
