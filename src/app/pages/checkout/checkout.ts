import { Component } from '@angular/core';
import { CheckoutForm } from '../../components/checkout-form/checkout-form';
import { ShoppingCart } from '../../components/shopping-cart/shopping-cart';

@Component({
  selector: 'app-checkout',
  imports: [ShoppingCart, CheckoutForm],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {

}
