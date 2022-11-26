// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  loginUrl: '/auth/login/',
  refreshUrl: '/auth/token-refresh/',
  cityUrl: '/util/city',
  restaurantUrl: '/restaurant/',
  restaurantSelectUrl: '/restaurant/select',
  productUrl: '/product/',
  productImageUrl: '/product/product-images/',
  brandUrl: '/product/brands/',
  categoryUrl: '/product/categories/',
  orderUrl: '/order/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
