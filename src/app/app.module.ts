import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { LoginFormComponent } from './pages/login-form/login-form.component';
import { HeaderComponent } from './layout/header/header.component';
import { RestaurantPageComponent } from './pages/restaurant-page/restaurant-page.component';
import { RestaurantlistPageComponent } from './pages/restaurantlist-page/restaurantlist-page.component';
import { ProductlistPageComponent } from './pages/productlist-page/productlist-page.component';
import { FooterComponent } from './layout/footer/footer.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { RestaurantFormComponent } from './pages/restaurant-form/restaurant-form.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { TotalPricePipe } from './pipes/total-price.pipe';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { OrderlistPageComponent } from './pages/orderlist-page/orderlist-page.component';
import { IntroPageComponent } from './pages/intro-page/intro-page.component';




@NgModule({
  declarations: [AppComponent, LoginPageComponent, HomePageComponent, LoginFormComponent, HeaderComponent, RestaurantPageComponent, RestaurantlistPageComponent, ProductlistPageComponent, FooterComponent, RestaurantFormComponent, CartPageComponent, TotalPricePipe, OrderPageComponent, OrderlistPageComponent, IntroPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    NgxDaterangepickerMd.forRoot(),
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
