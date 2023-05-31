import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-perfil-anuncio',
  templateUrl: './perfil-anuncio.component.html',
  styleUrls: ['./perfil-anuncio.component.css']
})
export class PerfilAnuncioComponent {
	isLogged: boolean = false;
	isAdmin: boolean = false;
    @Input() anuncio!: Anuncio;
	@Output() onDeleteAnuncio: EventEmitter<Anuncio> = new EventEmitter();

	constructor(public tokenService: TokenService, private router: Router) {
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	ngOnInit(): void {}

	public onDelete(anuncio: Anuncio) {
		this.onDeleteAnuncio.emit(anuncio);
	}
}