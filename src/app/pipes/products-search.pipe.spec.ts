import { Product } from '../services/products.service';
import { ProductsSearchPipe } from './products-search.pipe';

describe('ProductsSearchPipe', () => {
  let pipe: ProductsSearchPipe;
  let mockProducts: Product[] = [
    {
      id: '1',
      name: 'Product ABC',
      price: 100,
    },
    {
      id: '2',
      name: 'Product XYZ',
      price: 200,
    },
    {
      id: '3',
      name: 'fooBar',
      price: 200,
    },
  ];

  beforeEach(() => {
    pipe = new ProductsSearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should trim the spaces', () => {
    expect(pipe.transform(mockProducts, '  fooBar  ')).toContain({
      id: '3',
      name: 'fooBar',
      price: 200,
    });
  });

  it('should ignore case sensitive', () => {
    expect(pipe.transform(mockProducts, 'PRODUCT')).toEqual(
      jasmine.arrayContaining([
        {
          id: '1',
          name: 'Product ABC',
          price: 100,
        },
        {
          id: '2',
          name: 'Product XYZ',
          price: 200,
        },
      ])
    );
  });

  it('should not return', () => {
    expect(pipe.transform(mockProducts, 'nope')).toEqual([]);
  });
});
