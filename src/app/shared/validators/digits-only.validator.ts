import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function digitsOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) return null;
    return /^[0-9]+$/.test(value) ? null : { digitsOnly: true };
  };
}
