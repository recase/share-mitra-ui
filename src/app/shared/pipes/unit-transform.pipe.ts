import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unitTransform',
})
export class UnitTransformPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (typeof value == 'number') {
      if (value === 1) {
        return `${value} unit`;
      } else if (value > 1) {
        return `${value} units`;
      }
    }
    return '';
  }
}
