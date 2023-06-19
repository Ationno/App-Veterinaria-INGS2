import { Pipe, PipeTransform } from '@angular/core';
import { Campania } from '../interfaces/Campania';

@Pipe({
  name: 'filterCampania'
})
export class FilterCampaniaPipe implements PipeTransform {
  transform(listaCampania: Campania[], titulo: string = ""): Campania[] {
    if (titulo) {
      return listaCampania.filter((ele) => ele.titulo.toLowerCase().includes(titulo.toLowerCase()));
    }
    return listaCampania;
  }
}