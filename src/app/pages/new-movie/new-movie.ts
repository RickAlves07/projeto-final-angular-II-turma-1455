import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-movie',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-movie.html',
  styleUrl: './new-movie.scss'
})

export class NewMovie {
  newMovieForm: FormGroup = new FormGroup({});
  submittedData = signal<any | null>(null);

  constructor(private authService: AuthService, private router: Router) {
    this.initNewMovieForm();
  }

  initNewMovieForm() {
    this.newMovieForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      genre: new FormControl('', [Validators.required]),
      plataform: new FormControl('', [Validators.required]),
      price: new FormControl<number | null>(null, [Validators.required, Validators.min(0.01)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      availableInStock: new FormControl<number | null>(null, [Validators.required, Validators.min(1)])
    });
  }

  onSubmit() {
    this.newMovieForm.markAllAsTouched();
    if (this.newMovieForm.valid) {
      this.submittedData.set(this.newMovieForm.value);
    }
  }

  control(name: string): AbstractControl {
    return this.newMovieForm.get(name)!;
  }
}
