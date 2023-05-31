import { Pipe, PipeTransform } from '@angular/core';
import { Anuncio } from '../interfaces/Anuncio';

@Pipe({
  name: 'filterAnuncio'
})
export class FilterAnuncioPipe implements PipeTransform {
  transform(listaAnuncio: Anuncio[], zona: string = ""): Anuncio[] {
    if (zona) {
      return listaAnuncio.filter((ele) => ele.zona.toLowerCase().includes(zona.toLowerCase()));
    }
    return listaAnuncio;
  }
}