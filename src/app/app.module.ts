import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { HeaderComponent } from './layout/header/header.component';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { RestaurantlistPageComponent } from './pages/restaurantlist-page/restaurantlist-page.component';
import { ProductlistPageComponent } from './pages/productlist-page/productlist-page.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RestaurantFormComponent } from './pages/restaurant-form/restaurant-form.component';



@NgModule({
  declarations: [AppComponent, LoginPageComponent, HomePageComponent, RegisterFormComponent, LoginFormComponent, HeaderComponent, RestaurantPageComponent, ProductPageComponent, RestaurantlistPageComponent, ProductlistPageComponent, FooterComponent, RestaurantFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
