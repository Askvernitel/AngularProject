import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordNotMatch: true };
  }

  return null;
}
