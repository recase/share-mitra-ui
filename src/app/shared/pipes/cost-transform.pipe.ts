import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'costTransform',
})
export class CostTransformPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value) {
      return `Rs ${value.toFixed(2)}`;
    }
    return '';
  }
}
