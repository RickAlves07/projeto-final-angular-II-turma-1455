import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartStatus } from '../cart-status/cart-status';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [CartStatus, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() isCartOpened: boolean = false;
  @Output() cartOpened = new EventEmitter<boolean>();

  logedTexts = {
    text: 'Login ',
    icon: 'bi-box-arrow-in-right',
  }

  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    const isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.logedTexts.text = 'Logout ';
      this.logedTexts.icon = 'bi-box-arrow-in-left';
    } else {
      this.logedTexts.text = 'Login ';
      this.logedTexts.icon = 'bi-box-arrow-in-right';
    }

    return isLoggedIn;
  }
  openCart() {
    this.isCartOpened = !this.isCartOpened;
    this.cartOpened.emit(this.isCartOpened);
  }

  onCartOpened(isOpened: boolean) {
    this.isCartOpened = isOpened;
    this.cartOpened.emit(this.isCartOpened);
  }

  logoutCurrentUser() {
    this.authService.logout();
  }
}
