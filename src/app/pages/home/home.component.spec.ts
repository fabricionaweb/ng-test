import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let valueServiceSpy: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ProductsService', ['getProducts']);
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: ProductsService,
          useValue: spy,
        },
      ],
    }).compileComponents();

    valueServiceSpy = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;

    valueServiceSpy.products$ = of([]);
    valueServiceSpy.getProducts.and.returnValue(of([]));

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render app-product-list', () => {
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('app-product-list')
    ).toBeTruthy();
  });

  it('should call #getProducts on init', () => {
    fixture.detectChanges();
    component.ngOnInit();

    expect(valueServiceSpy.getProducts).toHaveBeenCalled();
  });
});
