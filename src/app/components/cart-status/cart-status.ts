import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-status',
  imports: [CommonModule, TranslateModule],
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.scss',
})
export class CartStatus {
  @Input() isCartOpened: boolean = false;
  @Output() cartOpened = new EventEmitter<boolean>();
  private store = inject(Store);

  totalItems$: Observable<number>;

  constructor(){
    this.totalItems$ = this.store.select((state) => state.cart.totalItems);
  }
  openCart() {
    this.isCartOpened = !this.isCartOpened;
    this.cartOpened.emit(this.isCartOpened);
  }

  closeCart() {
    this.isCartOpened = false;
    this.cartOpened.emit(this.isCartOpened);
  }
}
