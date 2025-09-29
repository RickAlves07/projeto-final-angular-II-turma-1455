import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterModule } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm: FormGroup = new FormGroup({});
  submittedData = signal<any | null>(null);

  constructor(private authService: AuthService, private router: Router) {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required])
    });
  }

  control(name: string): AbstractControl {
    return this.loginForm.get(name)!;
  }

  onSubmit() {
    this.authService.loginUser(
      this.loginForm.get("email")?.value,
      this.loginForm.get("password")?.value
    ).subscribe({
      next: (isLoggedIn: boolean) => {
        if (!isLoggedIn) {
            const a = "Não foi possível logar. Tente novamente com credenciais válidas!";
            return;
        }
        this.loginForm.markAllAsTouched();
        if (this.loginForm.valid) {
          this.submittedData.set(this.loginForm.value);
        }
        this.authService.scheduleLogout();
        this.router.navigate(['']);
      },
      error: (err) => {
        const a = "Login inválido. Por favor, digite credenciais válidas!";
      }
    });
  }
}
