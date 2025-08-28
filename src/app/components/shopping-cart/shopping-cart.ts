import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { removeAllQuantityProductFromCart, removeProductFromCart } from '../../store/cart.actions';
import { CurrencyBRLPipe } from "../../pipes/currency-brl.pipe";

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterModule, AsyncPipe, CurrencyBRLPipe],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart {
  @Input() isCheckout: boolean = false;
  @Output() cartClosed = new EventEmitter<boolean>();
  isCartOpened = true;
  private store = inject(Store);

  cartItems$: Observable<any[]>;
  totalItems$: Observable<number>;
  total$: Observable<number>;

  constructor() {
    this.cartItems$ = this.store.select((state) => state.cart.items);
    this.totalItems$ = this.store.select((state) => state.cart.totalItems);
    this.total$ = this.store.select((state) => state.cart.total);
  }

  subtractItem(productId: number) {
    this.store.dispatch(removeProductFromCart({ productId }));
    console.log('Product subtracted from cart:', 'productId:', productId);
  }

  removeItem(productId: number) {
    this.store.dispatch(removeAllQuantityProductFromCart({ productId }));
    console.log('Product removed from cart:', 'productId:', productId);
  }

  closeCart() {
    this.isCartOpened = false;
    this.cartClosed.emit(this.isCartOpened);
  }
}
