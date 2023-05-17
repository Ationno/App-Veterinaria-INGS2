import { Component, Input } from '@angular/core';
import { Anuncio } from '../../../interfaces/Anuncio'

@Component({
  selector: 'app-lista-anuncios',
  templateUrl: './lista-anuncios.component.html',
  styleUrls: ['./lista-anuncios.component.css']
})

export class ListaAnunciosComponent {
  @Input() anuncios: Anuncio[];

  constructor() {
    this.anuncios = [];
  }
}
