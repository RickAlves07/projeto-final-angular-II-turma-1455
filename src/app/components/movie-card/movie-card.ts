import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CurrencyBRLPipe } from '../../pipes/currency-brl.pipe';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/interfaces/imovie';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth-service';
import * as CartActions from '../../store/cart.actions';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModal } from '../delete-modal/delete-modal';
import { MoviesService } from '../../services/movies-service';

@Component({
  selector: 'app-movie-card',
  imports: [RouterModule, CurrencyBRLPipe, CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  @Input() movie!: Movie;
  @Output() deleted = new EventEmitter<void>();
  private store = inject(Store);
  constructor(private authService: AuthService, private modalService: NgbModal, private moviesService: MoviesService) {}

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  addToCart() {
    this.store.dispatch(CartActions.addToCart({ movie: this.movie }));
  }

  openDeleteModal(movie: any) {
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.title = movie.title;

    modalRef.result.then(
      (result) => {
        if (result === 'confirm') {
          this.deleteMovie(movie);
        }
      },
      () => {}
    );
  }
  deleteMovie(movie: any) {
    this.moviesService.delete(movie.id).subscribe(() => {
      this.deleted.emit();
    });
  }
}
