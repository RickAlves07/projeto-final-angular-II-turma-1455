import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyBRL',
})
export class CurrencyBRLPipe implements PipeTransform {

  transform(value: number | string | undefined): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const number = typeof value === 'string' ? parseFloat(value) : value;

    return number.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
