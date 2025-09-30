import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as CartActions from '../../store/cart.actions';
import { CurrencyBRLPipe } from "../../pipes/currency-brl.pipe";
import { Movie } from '../../models/interfaces/imovie';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-shopping-cart',
  imports: [RouterModule, AsyncPipe, CurrencyBRLPipe, CommonModule, TranslateModule],
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

  addToCart(movie: Movie){
    this.store.dispatch(CartActions.addToCart({ movie: movie }));
  }

  subtractItem(movieId: number) {
    this.store.dispatch(CartActions.removeFromCart({ movieId }));
  }

  removeItem(movieId: number) {
    this.store.dispatch(CartActions.removeAllQuantityFromCart({ movieId }));
  }

  removeAll() {
    this.store.dispatch(CartActions.removeAllFromCart());
  }

  closeCart() {
    this.isCartOpened = false;
    this.cartClosed.emit(this.isCartOpened);
  }
}
