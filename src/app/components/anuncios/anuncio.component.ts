import { Component } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-anuncio',
    templateUrl: './anuncio.component.html',
    styleUrls: ['./anuncio.component.css']
})

export class AnunciosComponent {
    anuncios : Anuncio[] = [];
    subscription?: Subscription;
    anuncio!: Anuncio;
	
    constructor(
        private anunciosService: AnunciosService,
    ){}

    ngOnInit() {
		this.anunciosService.get().subscribe((anuncios) => {	
			this.anuncios = anuncios
		})
	}

}