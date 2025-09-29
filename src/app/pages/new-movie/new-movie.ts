import { Component, effect, Input, Signal, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/imovie';
import { MoviesService } from '../../services/movies-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-new-movie',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.scss'
})

export class NewMovie {
  @Input() movie: Signal<Movie | null> = signal(null);

  movieForm: FormGroup = new FormGroup({});
  submittedData = signal<any | null>(null);
  selectedFile: File | null = null;
  imagePreview: string | null = null;


  constructor(private authService: AuthService, private moviesService: MoviesService, private router: Router) {
    this.initmovieForm();
  }

  initmovieForm() {
    this.movieForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      genre: new FormControl('', [Validators.required]),
      plataform: new FormControl('', [Validators.required]),
      price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      availableInStock: new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
    });

    effect(() => {
      const m = this.movie();
      if (m) {
        this.movieForm.patchValue({
          title: m.title,
          genre: m.genre,
          platform: m.platform,
          price: m.price,
          description: m.description,
          availableInStock: m.availableInStock
        });
        this.imagePreview = this.movie()?.imageLink ?? null;
        this.selectedFile = null;
      } else {
        this.movieForm.reset();
        this.selectedFile = null;
        this.imagePreview = null;
      }
    });
  }

  onSubmit() {
    this.movieForm.markAllAsTouched();
    if (this.movieForm.valid) {
      this.submittedData.set(this.movieForm.value);
    }

    this.moviesService
    .uploadImage(this.selectedFile)
    .pipe(
      switchMap(({ imageUrl }) => {
        const payload: Omit<Movie, 'id'> = {
          ...this.movieForm,
          imageLink: imageUrl
        };

        return this.moviesService.create(payload);
      })
    )
    .subscribe({
      next: () => {
        this.movieForm?.resetAfterCreate();
        const a = 'Filme adicionado com sucesso!';
      },
      error: (error) => {
        console.error(error);
       const a = 'Não foi possível adicionar o filme.';
      }
    });




  }

  control(name: string): AbstractControl {
    return this.movieForm.get(name)!;
  }

  onFileSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    if (file) {
      reader.readAsDataURL(file);
    }
  }
}
