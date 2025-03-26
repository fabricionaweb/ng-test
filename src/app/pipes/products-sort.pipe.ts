import { Pipe, PipeTransform } from '@angular/core';
import { SortBy } from '../components/product-list/product-list.component';
import { Product } from '../services/products.service';

@Pipe({
  name: 'productsSort',
})
export class ProductsSortPipe implements PipeTransform {
  public transform(products: Product[], sortBy: SortBy | null): Product[] {
    return !sortBy || !sortBy.key
      ? products
      : products.sort((a, b) => {
          const [aa, bb] = [a[sortBy.key], b[sortBy.key]];

          if (typeof aa === 'string' && typeof bb === 'string')
            return sortBy.order === 'asc'
              ? aa.localeCompare(bb)
              : bb.localeCompare(aa);

          if (typeof aa === 'number' && typeof bb === 'number')
            return sortBy.order === 'asc'
              ? aa - bb
              : bb - aa;
          
          return 0;
        });
  }
}
