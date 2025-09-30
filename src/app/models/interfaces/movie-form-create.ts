import { Movie } from "./imovie";

export interface MovieFormCreateEvent {
  formValue: MovieFormValue;
  file: File;
}

type MovieFormValue = Omit<Movie, 'id' | 'imageLink'>;
