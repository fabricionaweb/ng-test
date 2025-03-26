import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
} from 'rxjs';
import { ProductListComponent } from '../../components/product-list/product-list.component';
import { ProductsSearchPipe } from '../../pipes/products-search.pipe';
import { Product, ProductsService } from '../../services/products.service';

export interface ViewModel {
  products: Product[];
  searchTerm: string;
}

@Component({
  selector: 'app-home',
  imports: [
    ProductListComponent,
    ReactiveFormsModule,
    AsyncPipe,
    ProductsSearchPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private _destroyRef = inject(DestroyRef);
  private _productService = inject(ProductsService);
  private _searchTerm$ = new BehaviorSubject('');

  public formGroup = new FormGroup({
    term: new FormControl('', { nonNullable: true }),
  });

  public vm$: Observable<ViewModel> = combineLatest([
    this._productService.products$,
    this._searchTerm$,
  ]).pipe(
    takeUntilDestroyed(this._destroyRef),
    map(([products, searchTerm]) => ({
      products,
      searchTerm,
    }))
  );

  ngOnInit(): void {
    this._productService
      .getProducts()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe();

    this.formGroup.controls.term.valueChanges
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        distinctUntilChanged(),
        debounceTime(600)
      )
      .subscribe((term) => {
        this._searchTerm$.next(term);
      });
  }
}
