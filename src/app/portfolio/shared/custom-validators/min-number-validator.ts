import { AbstractControl, ValidationErrors } from '@angular/forms';
interface ValidatorFn {
  (control: AbstractControl): ValidationErrors | null;
}
export function minNumberValidator(
  minNumber: number,
  required: boolean
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!required) {
      if (!value && value !== 0) {
        return null;
      }
    }
    return checkMinValue(value, minNumber);
  };
}

function checkMinValue(value: number, minValue: number) {
  if (value || value === 0) {
    if (value >= minValue) {
      return null;
    }
  }
  return { minNumber: true };
}
