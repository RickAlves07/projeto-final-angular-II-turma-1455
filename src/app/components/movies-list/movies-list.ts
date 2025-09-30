import { Component, inject, signal } from '@angular/core';
import { MoviesService } from '../../services/movies-service';
import { Movie } from '../../models/interfaces/imovie';
import { MovieCard } from '../movie-card/movie-card';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-list',
  imports: [MovieCard, ɵInternalFormsSharedModule, FormsModule, CommonModule],
  templateUrl: './movies-list.html',
  styleUrl: './movies-list.scss'
})
export class MoviesList {
  movieFilterName: string = '';
  selectedGenreFilter: string = '';
  isFiltered: boolean = false;
  allMoviesList = signal<Movie[]>([]);
  movies = signal<Movie[]>([]);
  genresList = signal<string[]>([]);


  constructor(private moviesService: MoviesService) {
    this.getMovies();
  }

  getMovies() {
    this.moviesService.getAll().subscribe(movies => {
      this.allMoviesList.set(movies);
      this.movies.set(this.allMoviesList());
      const uniqueCategories = Array.from(new Set(movies.map(movie => movie.genre.trim())));
      this.genresList.set(uniqueCategories);
    });
  }

  filterMoviesByName(name: string) {
    this.movieFilterName = name;
    this.applyFilters();
  }

  filterMoviesByGenre(genre: string) {
    this.selectedGenreFilter = genre;
    this.applyFilters();
  }

  applyFilters() {
    this.isFiltered = true;
    const filtered = (this.allMoviesList() ?? []).filter((movie) =>
      movie.title.toLocaleLowerCase().includes(this.movieFilterName.toLocaleLowerCase()) &&
      (this.selectedGenreFilter === '' || movie.genre.toLocaleLowerCase().includes(this.selectedGenreFilter.toLocaleLowerCase().trim()))
    );
    this.movies.set(filtered);
  }

  resetFilters() {
    this.isFiltered = false;
    this.movieFilterName = '';
    this.selectedGenreFilter = '';
    this.movies.set(this.allMoviesList());
  }
}
