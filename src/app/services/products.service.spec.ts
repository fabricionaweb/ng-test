import { TestBed } from '@angular/core/testing';
import { take } from 'rxjs';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getProducts should return observable', () => {
    service.getProducts().subscribe((products) => {
      expect(products).toBeInstanceOf(Array);
    });
  });

  it('#getProducts should change products$', (done) => {
    service.getProducts().subscribe(() => {
      service.products$.pipe(take(1)).subscribe((products) => {
        expect(products).not.toBe([]);
        done();
      });
    });
  });
});
