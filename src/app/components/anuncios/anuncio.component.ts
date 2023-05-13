import { Component } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';

@Component({
    selector: 'app-anuncio',
    templateUrl: './anuncio.component.html',
    styleUrls: ['./anuncio.component.css']
})

export class AnunciosComponent {
    anuncios : Anuncio[] = [];
	anuncio: Anuncio = {nombre: "", servicio: "", zona: "", disponibilidad: ""};
}