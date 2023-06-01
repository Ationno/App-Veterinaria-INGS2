import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AnunciosService } from 'src/app/servicios/anuncios.service';

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
	mainUser!: Usuario;

	constructor(public tokenService: TokenService, private router: Router, private authService: AuthService, private anuncioService: AnunciosService) {
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	ngOnInit(): void {
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.mainUser = usuario;
		});
	}

	public onDelete(anuncio: Anuncio) {
		this.onDeleteAnuncio.emit(anuncio);
	}

	public onAdoptarRegistrado(email_anunciante: string) {
		this.anuncioService.enviarMail({"email_anunciante": email_anunciante, "email_interesado": this.mainUser.email}).subscribe((res) => {
			alert(res.message)
		})
	}
}