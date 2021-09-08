import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalRound',
})
export class DecimalPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value) {
      return value.toFixed(2);
    }
    return '';
  }
}
