import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function jobIdValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == 0) {
      return null;
    }
    //let numbericValue = control.valu
    return null
    //return { jobIdNotChosen: true };
  }
}
