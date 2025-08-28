import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CartActions from '../../store/cart.actions';
import { CurrencyBRLPipe } from "../../pipes/currency-brl.pipe";
import { IProduct } from '../../models/interfaces/iproduct';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterModule, AsyncPipe, CurrencyBRLPipe],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss',
})
export class ShoppingCart {
  @Input() isCheckout: boolean = false;
  @Output() cartClosed = new EventEmitter<boolean>();
  private store = inject(Store);

  isCartOpened = true;
  cartItems$: Observable<any[]>;
  totalItems$: Observable<number>;
  total$: Observable<number>;

  constructor() {
    this.cartItems$ = this.store.select((state) => state.cart.items);
    this.totalItems$ = this.store.select((state) => state.cart.totalItems);
    this.total$ = this.store.select((state) => state.cart.total);
  }

  addToCart(product: IProduct){
    // product.quantity = 1;
    this.store.dispatch(CartActions.addProductToCart({ product: product }));
    console.log('Product added to cart:', 'productId:', product?.id);
  }

  subtractItem(productId: number) {
    this.store.dispatch(CartActions.removeProductFromCart({ productId }));
    console.log('Product subtracted from cart:', 'productId:', productId);
  }

  removeItem(productId: number) {
    this.store.dispatch(CartActions.removeAllQuantityProductFromCart({ productId }));
    console.log('Product removed from cart:', 'productId:', productId);
  }

  closeCart() {
    this.isCartOpened = false;
    this.cartClosed.emit(this.isCartOpened);
  }
}
