import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';
import { AuthService } from './services/auth-service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ShoppingCart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App  implements OnInit{
  protected readonly title = signal('projeto final angular II turma 1455');

  isCartOpened = false;

  constructor(private authService: AuthService, private translateService: TranslateService) {
    const savedLang = localStorage.getItem('selectedLanguage')?? 'pt-br';
    this.translateService.use(savedLang);
  }

  ngOnInit(): void {
    this.authService.checkLoginExpiration();
  }

  onCartOpened(isOpened: boolean) {
    this.isCartOpened = isOpened;
  }

  onCartClosed(closed: boolean) {
    this.isCartOpened = closed;
  }
}
