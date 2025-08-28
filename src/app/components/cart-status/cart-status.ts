import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-cart-status',
  imports: [],
  templateUrl: './cart-status.html',
  styleUrl: './cart-status.scss',
})
export class CartStatus {
  @Input() isCartOpened: boolean = false;
  @Output() cartOpened = new EventEmitter<boolean>();

  openCart() {
    this.isCartOpened = !this.isCartOpened;
    this.cartOpened.emit(this.isCartOpened);
  }

  closeCart() {
    this.isCartOpened = false;
    this.cartOpened.emit(this.isCartOpened);
  }
}
