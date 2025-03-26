import { Product } from '../services/products.service';
import { ProductsSortPipe } from './products-sort.pipe';

describe('ProductsSortPipe', () => {
  let pipe: ProductsSortPipe;
  let mockProducts: Product[] = [
    { id: '1', name: 'A', price: 100 },
    { id: '2', name: 'B', price: 200 },
    { id: '3', name: 'Z', price: 300 },
    { id: '4', name: '10', price: 20 },
    { id: '5', name: '1', price: 20 },
    { id: '6', name: '20', price: 20 },
    { id: '7', name: '2', price: 20 },
  ];

  beforeEach(() => {
    pipe = new ProductsSortPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should not sorting if missing sorting params', () => {
    expect(pipe.transform(mockProducts, null)).not.toEqual([]);
  });

  it('should sort by givin params', () => {
    expect(pipe.transform(mockProducts, { key: 'name', order: 'asc' })).toEqual(
      [
        { id: '5', name: '1', price: 20 },
        { id: '4', name: '10', price: 20 },
        { id: '7', name: '2', price: 20 },
        { id: '6', name: '20', price: 20 },
        { id: '1', name: 'A', price: 100 },
        { id: '2', name: 'B', price: 200 },
        { id: '3', name: 'Z', price: 300 },
      ]
    );

    expect(
      pipe.transform(mockProducts, { key: 'name', order: 'desc' })
    ).toEqual([
      { id: '3', name: 'Z', price: 300 },
      { id: '2', name: 'B', price: 200 },
      { id: '1', name: 'A', price: 100 },
      { id: '6', name: '20', price: 20 },
      { id: '7', name: '2', price: 20 },
      { id: '4', name: '10', price: 20 },
      { id: '5', name: '1', price: 20 },
    ]);

    expect(
      pipe.transform(mockProducts, { key: 'price', order: 'asc' })
    ).toEqual([
      { id: '6', name: '20', price: 20 },
      { id: '7', name: '2', price: 20 },
      { id: '4', name: '10', price: 20 },
      { id: '5', name: '1', price: 20 },
      { id: '1', name: 'A', price: 100 },
      { id: '2', name: 'B', price: 200 },
      { id: '3', name: 'Z', price: 300 },
    ]);

    expect(
      pipe.transform(mockProducts, { key: 'price', order: 'desc' })
    ).toEqual([
      { id: '3', name: 'Z', price: 300 },
      { id: '2', name: 'B', price: 200 },
      { id: '1', name: 'A', price: 100 },
      { id: '6', name: '20', price: 20 },
      { id: '7', name: '2', price: 20 },
      { id: '4', name: '10', price: 20 },
      { id: '5', name: '1', price: 20 },
    ]);
  });
});
