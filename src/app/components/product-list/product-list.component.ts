import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../services/products.service';

export interface ViewModel {
  products: Product[];
  searchTerm: string;
}

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input({ required: true }) products!: Product[];
}
