import { Component } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
    selector: 'app-anuncios',
    templateUrl: './anuncios.component.html',
    styleUrls: ['./anuncios.component.css']
})

export class AnunciosComponent {
    anuncios : Anuncio[] = [];
    subscription?: Subscription;
    anuncio!: Anuncio;
    busquedaZona!: string; 
    isLogged: boolean = false;
	isAdmin: boolean = false;
	
    constructor( public tokenService: TokenService, private router: Router,
        private anunciosService: AnunciosService,
    ){
        this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
    }

    ngOnInit() {
		this.anunciosService.get().subscribe((anuncios) => {	
			this.anuncios = anuncios
		})
	}

    public deleteAnuncio(anuncio: Anuncio) {
		this.anunciosService.delete(anuncio).subscribe(() => {
            alert("Anuncio eliminado exitosamente!")
			this.anuncios = this.anuncios.filter( ele => ele.id !== anuncio.id )
		})
	}

}