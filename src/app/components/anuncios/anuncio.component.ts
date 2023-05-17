import { Component } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';

@Component({
    selector: 'app-anuncio',
    templateUrl: './anuncio.component.html',
    styleUrls: ['./anuncio.component.css']
})

export class AnunciosComponent {
    anuncios : Anuncio[] = [];
	
    constructor(){
        this.anuncios = [
            { id: 1, nombre: "Cuidador 1", servicio: "Cuidado de perros", zona: "Los Hornos", disponibilidad: "Lunes a viernes" },
            { id: 2, nombre: "Cuidador 2", servicio: "Paseo de perros", zona: "La Plata", disponibilidad: "Fines de semana" },
            { id: 3, nombre: "Cuidador 3", servicio: "Cuidado de perros", zona: "La Plata", disponibilidad: "Todos los días" }
        ];
    }
}