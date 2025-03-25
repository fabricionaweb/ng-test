import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Product } from '../../services/products.service';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.products = [];
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should print no products', () => {
    component.products = [];
    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('[data-test-id=no-product]')
        ?.textContent?.trim()
    ).toEqual('No products');
  });

  it('should print each given product', () => {
    component.products = mockProducts;
    fixture.detectChanges();

    const currencyPipe = (price: number) => `\$${price}.00`;

    const rows: Element[] = fixture.nativeElement.querySelectorAll(
      '[data-test-id=product]'
    );
    rows.forEach((row, index) => {
      expect(
        row.querySelector('[data-test-id=name]')?.textContent?.trim()
      ).toEqual(mockProducts[index].name);

      expect(
        row.querySelector('[data-test-id=price]')?.textContent?.trim()
      ).toEqual(currencyPipe(mockProducts[index].price));
    });
  });
});
