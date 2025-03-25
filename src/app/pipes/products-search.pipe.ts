import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../services/products.service';

@Pipe({
  name: 'productsSearch',
})
export class ProductsSearchPipe implements PipeTransform {
  public transform(products: Product[], term: string): Product[] {
    let searchTerm = term.trim().toLocaleLowerCase();

    return !searchTerm
      ? products
      : products.filter(({ name }) =>
          name.toLocaleLowerCase().includes(searchTerm)
        );
  }
}
