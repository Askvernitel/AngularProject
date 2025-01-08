import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Custom validator to check if password and confirm password match
 * @type {ValidatorFn}
 * @param control {AbstractControl} - The form control to validate
 * @returns {ValidationErrors|null} - Null if the passwords match, an error object otherwise
 * @see https://angular.dev/api/forms/ValidatorFn
 */
export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    return { passwordNotMatch: true };
  }

  return null;
};
