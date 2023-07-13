import { Component } from '@angular/core';
import { Campania } from 'src/app/interfaces/Campania';
import { CampaniasService } from 'src/app/servicios/campanias.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
    selector: 'app-campanias',
    templateUrl: './campanias.component.html',
    styleUrls: ['./campanias.component.css']
})

export class CampaniasComponent {
    campanias : Campania[] = [];
    subscription?: Subscription;
    campania!: Campania;
    busquedaTitulo!: string; 
    isLogged: boolean = false;
	isAdmin: boolean = false;
    campaniaActual! : Campania;
	
    constructor( public tokenService: TokenService, private router: Router,
        private campaniasService: CampaniasService,
    ){
        this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
    }

    ngOnInit() {
		this.campaniasService.get().subscribe((campanias) => {	
			this.campanias = campanias.filter(campania => campania.id != 0)
		})
        this.campaniasService.getCampaniaSeleccionada().subscribe((campania) => {
            this.campaniaActual = campania[0]
        })
	}

    public deleteCampania(campania: Campania) {
        console.log(campania)
		this.campaniasService.delete(campania).subscribe(() => {
            alert("Campania eliminada exitosamente!")
			this.campanias = this.campanias.filter( ele => ele.id !== campania.id )
            this.campaniasService.getCampaniaSeleccionada().subscribe((campania) => {
                this.campaniaActual = campania[0]
            })
		})
	}

    public selectCampania(campania: Campania) {
		this.campaniasService.selectCampania(campania).subscribe((campanias) => {
            alert("Campania seleccionada exitosamente!")
            this.campanias = campanias
            this.campaniasService.getCampaniaSeleccionada().subscribe((campania) => {
                this.campaniaActual = campania[0]
            })
		})
	}

}