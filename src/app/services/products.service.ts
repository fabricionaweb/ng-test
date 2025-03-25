import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, take, tap } from 'rxjs';

export interface Product {
  id: string;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private _products$ = new BehaviorSubject<Product[]>([]);
  public products$ = this._products$.asObservable();

  public getProducts(): Observable<Product[]> {
    const mockResponse = [
      {
        id: '21b362d7-097b-4cd3-b654-7971c4b5306c',
        name: 'Hair brush',
        price: 200,
      },
      {
        id: 'bb363ae2-da6d-4400-b653-eb3b7345926e',
        name: 'Hair brush',
        price: 200,
      },
      {
        id: 'e261c6f0-a3c1-4483-86bc-6d156a51e0a7',
        name: 'Hair brush',
        price: 200,
      },
    ];

    return of(mockResponse).pipe(
      take(1),
      tap((products) => {
        this._products$.next(products);
      })
    );
  }
}
