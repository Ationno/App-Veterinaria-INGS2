import { Component } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-anuncios',
    templateUrl: './anuncios.component.html',
    styleUrls: ['./anuncios.component.css']
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

    public deleteAnuncio(anuncio: Anuncio) {
		this.anunciosService.delete(anuncio).subscribe(() => {
			this.anuncios = this.anuncios.filter( ele => ele.id !== anuncio.id )
		})
	}

}