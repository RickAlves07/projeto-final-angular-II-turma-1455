import { Component, signal } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerForm: FormGroup = new FormGroup({});
  submittedData = signal<any | null>(null);

  constructor(private authService: AuthService, private router: Router) {
    this.initLoginForm();
  }

  initLoginForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  control(name: string): AbstractControl {
    return this.registerForm.get(name)!;
  }

  onSubmit() {
    this.authService.registerUser(
      this.registerForm.get("username")?.value,
      this.registerForm.get("email")?.value,
      this.registerForm.get("password")?.value
    ).subscribe({
      next: (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
            const a = "Não foi possível se registrar. Tente novamente válidas!";
            return;
        }
        this.registerForm.markAllAsTouched();
        if (this.registerForm.valid) {
          this.submittedData.set(this.registerForm.value);
        }
        this.authService.scheduleLogout();
        this.router.navigate(['']);
      },
      error: (err) => {
        const a = "Cadastro inválido. Por favor, digite credenciais válidas!";
      }
    });
  }
}

