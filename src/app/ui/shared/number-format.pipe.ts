import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat',
  standalone: true
})
export class NumberFormatPipe implements PipeTransform {

  transform(numero: string): string {

    if (isNaN(parseFloat(numero))) {
      return '-';
    } else {
      const TO_FIXED_2 = parseFloat(numero).toFixed(2);
      const FLOAT_NUMBER = parseFloat(TO_FIXED_2);
      return FLOAT_NUMBER.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
  }

}
