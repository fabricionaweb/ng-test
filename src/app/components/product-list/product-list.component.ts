import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../services/products.service';

export interface SortBy {
  key: 'name' | 'price';
  order: 'desc' | 'asc';
}

@Component({
  selector: 'app-product-list',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  @Input({ required: true }) products: Product[] = [];
  @Input() sortBy: SortBy | null = null;
  @Output() sortByEvent = new EventEmitter<SortBy>();

  public onClickSortBy(key: SortBy['key']): void {
    const order = this.sortBy?.order === 'desc' ? 'asc' : 'desc';
    this.sortByEvent.emit({ key, order });
  }
}
