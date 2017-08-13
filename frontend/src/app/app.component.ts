import { Component } from '@angular/core';
import { EmitterService } from './utils/emitter.service';
import {ProductListComponent} from './product/product-list.component';
import {AddProductComponent} from './product/add-product.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public title:string = 'MEAN CRUD APP';

  private productInfoEvent = "PRODUCT_INFO";
  private resetEvent = "RESET";
  private productListEvent = "PRODUCT_LIST";

  constructor(private _emitterService: EmitterService) {}
}
