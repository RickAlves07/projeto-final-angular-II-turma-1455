import { Component, effect, inject, Input, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Movie } from '../../models/interfaces/imovie';
import { MoviesService } from '../../services/movies-service';
import { map, Observable, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-new-movie',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TranslateModule],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.scss'
})

export class NewMovie {
  private route = inject(ActivatedRoute);
  private moviesService = inject(MoviesService);

  movieForm: FormGroup = new FormGroup({});
  submittedData = signal<any | null>(null);
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  isEditMode = false;
  movie = toSignal(
    this.route.params.pipe(
      map((params) => params['id']),
      switchMap((id) => this.moviesService.getById(id))
    )
  );

  constructor() {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      if (id) {
        this.isEditMode = true;
      }
    });

    this.initMovieForm();
  }

  initMovieForm() {
    this.movieForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(70)]),
      genre: new FormControl('', [Validators.required]),
      platform: new FormControl('', [Validators.required]),
      price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(300)]),
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

    if (this.isEditMode) {
      this.update();
    } else {
      this.create();
    }
  }

  update(){
    let imageUrlUpdate = this.movie()?.imageLink ?? '';
    const id = this.movie()?.id ?? '';

    if (this.selectedFile) {
      this.moviesService.uploadImage(this.selectedFile).pipe(
        switchMap(({ imageUrl }) => {
          imageUrlUpdate = imageUrl;
          return imageUrlUpdate;
        })
      ).subscribe((imageUrl) => {
        imageUrlUpdate = imageUrl;
      });
    }

    const payload: Movie = {
      ...this.movieForm.value,
      id: id,
      imageLink: imageUrlUpdate,
    };

    this.moviesService.update(id, payload)
    .subscribe({
      next: () => {
        this.formClear();
        const a = 'Filme Atualizado com sucesso!';
      },
      error: (error) => {
        console.error(error);
        const a = 'Não foi possível atualizar o filme.';
      }
    });
  }

  create(){
    if (this.selectedFile) {
      this.moviesService.uploadImage(this.selectedFile).pipe(
        switchMap(({ imageUrl }) => {
          const payload: Omit<Movie, 'id'> = {
            ...this.movieForm.value,
            imageLink: imageUrl
          };

          return this.moviesService.create(payload);
        })
      )
      .subscribe({
        next: () => {
          this.formClear();
          const a = 'Filme adicionado com sucesso!';
        },
        error: (error) => {
          console.error(error);
          const a = 'Não foi possível adicionar o filme.';
        }
      });
    } else {
      console.info('Nenhum arquivo selecionado para upload. Selecione uma imagem para o filme para cadastrar.');
    }
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

  formClear() {
    this.movieForm.reset();
    this.selectedFile = null;
    this.imagePreview = null;
  }
}
