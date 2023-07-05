import { Pipe, PipeTransform } from '@angular/core';
import { Perdido } from '../interfaces/Perdido';

@Pipe({
  name: 'filterPerdido'
})
export class FilterPerdidoPipe implements PipeTransform {
  transform(listaPerdido: Perdido[], nombre: string = ""): Perdido[] {
    if (nombre) {
      return listaPerdido.filter((ele) => ele.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    return listaPerdido;
  }
}