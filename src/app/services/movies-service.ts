import { Injectable } from '@angular/core';
import { environments } from '../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/imovie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private apiUrl = `${environments.apiMoviesUrl}/movies`;
  private apiUrlUpload = `${environments.apiMoviesUrl}/upload`;

  movies: Array<Movie> = [];

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Array<Movie>> {
    return this.http.get<Array<Movie>>(this.apiUrl);
  }

  getById(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/${id}`);
  }

  create(movie: Omit<Movie, 'id'>) {
    return this.http.post<Movie>(this.apiUrl, movie)
  }

  update(id: string, movie: Movie) {
    return this.http.put<Movie>(`${this.apiUrl}/${id}`, movie);
  }

  delete(id: string) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{ imageUrl: string; path?: string }> {
    const formData = new FormData();
    formData.append("imagem", file);
    return this.http.post<{ imageUrl: string; path?: string }>(this.apiUrlUpload, formData);
  }
}
