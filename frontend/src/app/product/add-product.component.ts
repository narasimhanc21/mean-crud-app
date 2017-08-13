/**
 * Created by narachan on 8/10/2017.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProductService } from './product.service';
import { EmitterService } from '../utils/emitter.service';

import { ProductModel } from './productModel';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ ProductService ]
})
export class AddProductComponent implements OnChanges {

  @Input() productInfoEvent: string;
  @Input() resetEvent: string;
  @Input() productListEvent: string;

  private isInsert = true;
  private productModel: ProductModel = new ProductModel('', '', '', '', '', true);
  private productList;

  constructor(
    private productService: ProductService
  ) {}

  private getProductList() {
    this.productService.getAllProducts().subscribe(
      response => this.productList = response.products,
      error =>  { alert(`Can't get products.`); }
    );
  }

  public addProduct(){
    this.productService.addProduct(this.productModel).subscribe(
      response =>  {
        debugger;
        if(response.error) {
          alert(`The product could not be added, server Error.`);
        } else {
          debugger;
          EmitterService.get(this.productListEvent).emit(this.getProductList());
        }
      },
      error=> {
        alert(`The product could not be added, server Error.`);
      }
    );
  }

  public updateProduct(){
    this.productService.updateProduct(this.productModel).subscribe(
      response => {
        if(response.error) {
          alert(`The product could not be updated, server Error.`);
        } else {
          debugger;
          EmitterService.get(this.productListEvent).emit(this.getProductList());
        }
      },
      error=> {
        alert(`The product could not be updated, server Error.`);
      }
    );
  }

  public resetAddProduct(){
    this.productModel = new ProductModel('', '', '', '', '', true);
    EmitterService.get(this.resetEvent).emit(true);
    this.isInsert = true;
  }

  ngOnChanges(changes:any) {
    EmitterService.get(this.productInfoEvent).subscribe( (value: ProductModel) => {
      this.productModel = new ProductModel( value._id, value.name, value.code, value.buyMargin, value.sellMargin, value.isAvailable);
      this.isInsert = false;
    });

    EmitterService.get(this.productListEvent).subscribe( (pl) => {
      this.productList = pl;
    });
  }
}
