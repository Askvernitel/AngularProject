import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms'

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password !== confirmPassword) {
    console.error("Not Match");
    return { passwordNotMatch: true };
  }

  return null;
}
