import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { ProductService } from './product.service';
import { EmitterService } from '../utils/emitter.service';

import { ProductModel } from './productModel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ ProductService ]
})
export class ProductListComponent implements OnInit, OnChanges{
  @Input() resetEvent: string;
  @Input() productInfoEvent: string;
  @Input() productListEvent: string;

  private productList;
  private currentProduct: ProductModel;
  private isReset = true;

  constructor(
    private productService: ProductService
  ) {}

  private getProductList() {
    this.productService.getAllProducts().subscribe(
      response => this.productList = response.products,
      error =>  { alert(`Can't get products.`); }
    );
  }

  ngOnInit(){
    this.getProductList();
  }

  public productSelected(product){
    this.currentProduct = product;
    EmitterService.get(this.productInfoEvent).emit(this.currentProduct);
    this.isReset = true;
  }

  public isSelected(product): boolean {
    if(!this.currentProduct) {
      return false;
    }
    return this.currentProduct._id ===  product._id ? true : false;
  }

  public deleteProduct(productId:string){
    this.productService.deleteProduct(productId).subscribe(
      response => {
        if(response.error) {
          alert(`The product could not be deleted, server Error.`);
        } else {
          this.getProductList();
        }
      },
      error=> {
        alert(`The product could not be deleted, server Error.`);
      }
    );
  }

  ngOnChanges(changes: any) {

    EmitterService.get(this.resetEvent).subscribe( (reset: boolean) => {
      this.isReset = false;
    });

    EmitterService.get(this.productListEvent).subscribe( (pl) => {
      this.productList = pl;
    });
  }
}
