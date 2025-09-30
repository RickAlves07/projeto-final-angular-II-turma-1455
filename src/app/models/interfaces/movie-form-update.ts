import { Movie } from "./imovie";

export interface MovieFormUpdateEvent {
  formValue: MovieFormValue;
  movie: Movie;
  newFile: File | null;
}

type MovieFormValue = Omit<Movie, 'id' | 'imageLink'>;

