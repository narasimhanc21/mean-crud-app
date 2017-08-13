import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ProductModel } from './productModel';

import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ProductService {

  private BASE_URL = 'http://localhost:4040/api/products/';

  constructor(
    private http: Http
  ) { }

  public getAllProducts()
  {
    return this.http.get(`${this.BASE_URL}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public addProduct(body: ProductModel)
  {
    const options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });
    return this.http.post(`${this.BASE_URL}`, JSON.stringify(body), options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public updateProduct(body: ProductModel)
  {
    const options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });

    return this.http.put(`${this.BASE_URL}${body['_id']}`, JSON.stringify(body), options)
      .map((res: Response) => {
      return res.json()})
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public deleteProduct(productsID:string)
  {
    const options = new RequestOptions({
      headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });

    return this.http.delete(`${this.BASE_URL}${productsID}`, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

}
