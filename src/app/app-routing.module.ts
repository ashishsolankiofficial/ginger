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
      }]
  },
  { path: '**', redirectTo: 'home-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
