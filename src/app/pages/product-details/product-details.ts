import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { Store } from '@ngrx/store';
import * as CartActions from '../../store/cart.actions';
import { CommonModule } from '@angular/common';
import { CurrencyBRLPipe } from '../../pipes/currency-brl.pipe';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, CurrencyBRLPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private store = inject(Store);

  product = toSignal(
    this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.productService.getProductById(id))
    )
  );

  addToCart() {
    this.store.dispatch(CartActions.addProductToCart({ product: this.product() }));
  }
}
