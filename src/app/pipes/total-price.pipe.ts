import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalPrice',
  pure: false,
})
export class TotalPricePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return value.reduce((x: any, y: any) => x + y['price'] * y['quantity'], 0);
  }

}
