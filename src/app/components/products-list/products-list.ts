import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { ProductsService } from '../../services/products-service';

@Component({
  selector: 'app-products-list',
  imports: [RouterModule],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss'
})
export class ProductsList{
 private productService = inject(ProductsService);
 public products = toSignal(this.productService.getProducts());
}
