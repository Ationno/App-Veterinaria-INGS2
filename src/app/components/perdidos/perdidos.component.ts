import { Component } from '@angular/core';
import { Perdido } from 'src/app/interfaces/Perdido';
import { PerdidosService } from 'src/app/servicios/perdidos.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
    selector: 'app-perdidos',
    templateUrl: './perdidos.component.html',
    styleUrls: ['./perdidos.component.css']
})

export class PerdidosComponent {
    perdidos : Perdido[] = [];
    subscription?: Subscription;
    perdido!: Perdido;
    busquedaNombre!: string; 
    busquedaEncontrado!: boolean;
    isLogged: boolean = false;
	isAdmin: boolean = false;
	
    constructor( public tokenService: TokenService, private router: Router,
        private perdidosService: PerdidosService,
    ){
        this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
    }

    ngOnInit() {
		this.perdidosService.get().subscribe((perdidos) => {	
			this.perdidos = perdidos
		})
	}

    public deletePerdido(perdido: Perdido) {
		this.perdidosService.delete(perdido).subscribe(() => {
            alert("Anuncio de perro perdido eliminado exitosamente!")
			this.perdidos = this.perdidos.filter( ele => ele.id !== perdido.id )
		})
	}

}