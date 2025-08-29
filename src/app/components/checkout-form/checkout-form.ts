import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { digitsOnlyValidator } from '../../shared/validators/digits-only.validator';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-checkout-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout-form.html',
  styleUrl: './checkout-form.scss',
})
export class CheckoutForm {
  private store = inject(Store);
  private fb = new FormBuilder();

  cartItems$: Observable<any[]>;

  regexMes = /^(0?[1-9]|1[0-2])$/;
  regexAno = /^(\d{4})$/;

  checkoutForm: FormGroup = this.fb.group({
    nomeCompleto: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    endereco: ['', [Validators.required, Validators.minLength(5)]],

    nomeNoCartao: ['', [Validators.required, Validators.minLength(3)]],
    numeroCartao: [
      '',
      [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        digitsOnlyValidator(),
      ],
    ],
    codigoSeguranca: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        digitsOnlyValidator(),
      ],
    ],
    validadeMes: ['', [Validators.required, Validators.pattern(this.regexMes)]],
    validadeAno: ['', [Validators.required, Validators.pattern(this.regexAno)]],
  });

  submittedData = signal<any | null>(null);

  constructor() {
    this.cartItems$ = this.store.select((state) => state.cart.items);
  }
  onSubmit() {
    this.checkoutForm.markAllAsTouched();
    if (this.checkoutForm.valid) {
      this.submittedData.set(this.checkoutForm.value);
    }
  }

  control(name: string): AbstractControl {
    return this.checkoutForm.get(name)!;
  }
}
