import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { EmitterService } from './utils/emitter.service';
import {ProductListComponent} from './product/product-list.component';
import {AddProductComponent} from './product/add-product.component';


@NgModule({
  declarations: [AppComponent, ProductListComponent, AddProductComponent],
  imports: [BrowserModule, FormsModule, HttpModule],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
