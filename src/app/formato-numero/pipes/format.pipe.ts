import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'format'
})

export class FormatPipe implements PipeTransform {

  transform(value: number): string {

    const opcionesFormato: Intl.NumberFormatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    let numeroFormateado = value.toLocaleString(undefined,opcionesFormato);

    return numeroFormateado;
  }

}
