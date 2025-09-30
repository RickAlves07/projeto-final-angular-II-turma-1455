import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartStatus } from '../cart-status/cart-status';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CartStatus, RouterModule, TranslateModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  @Input() isCartOpened: boolean = false;
  @Output() cartOpened = new EventEmitter<boolean>();

  currentLanguage: string;

  logedTexts = {
    text: 'Login ',
    icon: 'bi-box-arrow-in-right',
  }

  constructor(private authService: AuthService, private translateService: TranslateService) {
    const savedLang = localStorage.getItem('selectedLanguage')?? 'pt-br';
    this.translateService.use(savedLang);
    this.currentLanguage = savedLang
  }

  get isLoggedIn(): boolean {
    const isLoggedIn = this.authService.isAuthenticated();
    if (isLoggedIn) {
      this.logedTexts.icon = 'bi-box-arrow-in-left';
    } else {
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

  changeLanguage(lang: string) {
    if (lang === this.currentLanguage) return;

    this.translateService.use(lang).subscribe(() => {
      this.currentLanguage = lang;
      localStorage.setItem('selectedLanguage', lang);
    });
  }
}
