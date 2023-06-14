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
    isLogged: boolean = false;
	isAdmin: boolean = false;
	
    constructor( public tokenService: TokenService, private router: Router,
        private campaniasService: CampaniasService,
    ){
        this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
    }

    ngOnInit() {
		this.campaniasService.get().subscribe((campanias) => {	
			this.campanias = campanias
		})
	}

    public deleteCampania(campania: Campania) {
		this.campaniasService.delete(campania).subscribe(() => {
            alert("Campania eliminada exitosamente!")
			this.campanias = this.campanias.filter( ele => ele.id !== campania.id )
		})
	}

}