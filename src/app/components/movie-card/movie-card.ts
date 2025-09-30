import { Component, inject, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyBRLPipe } from '../../pipes/currency-brl.pipe';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/interfaces/imovie';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth-service';
import * as CartActions from '../../store/cart.actions';

@Component({
  selector: 'app-movie-card',
  imports: [RouterModule, CurrencyBRLPipe, CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  @Input() movie!: Movie;
  private store = inject(Store);
  constructor(private authService: AuthService) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  addToCart() {
    this.store.dispatch(CartActions.addProductToCart({ product: this.movie }));
  }
}
