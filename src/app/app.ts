import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { ShoppingCart } from './components/shopping-cart/shopping-cart';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ShoppingCart],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('projeto final angular I turma 1455');

  isCartOpened = false;
  onCartOpened(isOpened: boolean) {
    this.isCartOpened = isOpened;
  }

  onCartClosed(closed: boolean) {
    this.isCartOpened = closed;
  }
}
