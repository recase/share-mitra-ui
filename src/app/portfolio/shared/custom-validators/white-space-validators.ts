import { AbstractControl, ValidationErrors } from '@angular/forms';

export function whiteSpaceValidator(
  control: AbstractControl
): ValidationErrors | null {
  const isWhitespace = (control.value || '').trim().length === 0;
  if (isWhitespace) {
    return { whitespace: true };
  }
  return null;
}
