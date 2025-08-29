import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartStatus } from '../cart-status/cart-status';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CartStatus, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() isCartOpened: boolean = false;
  @Output() cartOpened = new EventEmitter<boolean>();
  openCart() {
    this.isCartOpened = !this.isCartOpened;
    this.cartOpened.emit(this.isCartOpened);
  }

  onCartOpened(isOpened: boolean) {
    this.isCartOpened = isOpened;
    this.cartOpened.emit(this.isCartOpened);
  }
}
