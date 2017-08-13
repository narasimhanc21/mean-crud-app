export class ProductModel {
  constructor(
    public _id: string,
    public name: string,
    public code: string,
    public buyMargin: string,
    public sellMargin: string,
    public isAvailable: boolean) {}
}
