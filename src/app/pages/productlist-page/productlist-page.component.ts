import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productlist-page',
  templateUrl: './productlist-page.component.html',
  styleUrls: ['./productlist-page.component.css']
})
export class ProductlistPageComponent implements OnInit {

  imgLoaded: boolean = false;
  imageLoading: string = "https://images.openfoodfacts.org/images/products/890/434/110/0639/front_en.5.400.jpg";
  productData: any;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.list().subscribe(resp => {
      this.productData = resp.products
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
  }

}
