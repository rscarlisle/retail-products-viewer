import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './product.service';
import { IProduct } from './product';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: IProduct;
  errorMessage = null;
  thumbnails = null;
  lastImage = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  onThumbnailClick(thumbObj) {
    this.lastImage = thumbObj.index;
    this.thumbnails = this.thumbnails.map((thumb, idx) => ({
      href: thumb.href,
      index: idx,
      isSelected: this.lastImage === idx,
    }));
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    const lastImage = this.lastImage;

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
         for (let i = 0; i < products.length; i++) {
           const prod = products[i];
           if (prod.id === String(id)) {
             // save a reference to the product
             this.product = prod;

             // hold the thumbnail hrefs in an array to access from the template
             this.thumbnails = this.product.images.map((imgObject, idx) => ({
               href: imgObject.href,
               index: idx,
               isSelected: lastImage === idx,
             }));
            //  console.log(this.thumbnails);
             break;
           }
         }
      },
      error => (this.errorMessage = <any>error)
    );
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
