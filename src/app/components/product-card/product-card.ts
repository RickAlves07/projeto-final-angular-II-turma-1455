import { Component, inject, Input } from '@angular/core';
import { IProduct } from '../../models/interfaces/iproduct';
import { RouterModule } from '@angular/router';
import { CurrencyBRLPipe } from '../../pipes/currency-brl.pipe';
import { CommonModule } from '@angular/common';
import * as CartActions from '../../store/cart.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-card',
  imports: [RouterModule, CurrencyBRLPipe, CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: IProduct;
  private store = inject(Store);

  addToCart() {
    this.store.dispatch(CartActions.addProductToCart({ product: this.product }));
  }
}
