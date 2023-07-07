import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Perdido } from 'src/app/interfaces/Perdido';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { PerdidosService } from 'src/app/servicios/perdidos.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil-perdido',
  templateUrl: './perfil-perdido.component.html',
  styleUrls: ['./perfil-perdido.component.css']
})
export class PerfilPerdidoComponent {
	isLogged: boolean = false;
	isAdmin: boolean = false;
    @Input() perdido!: Perdido;
	@Output() onDeletePerdido: EventEmitter<Perdido> = new EventEmitter();
	mainUser!: Usuario;
	imageSource: any;

	constructor(public tokenService: TokenService, private router: Router, private authService: AuthService, private perdidoService: PerdidosService, public sanitizer: DomSanitizer) {
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	ngOnInit(): void {
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.mainUser = usuario;
		});
		this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.perdido.imagen.base64}`)
	}

	public onDelete(perdido: Perdido) {
		this.onDeletePerdido.emit(perdido);
	}

	public onComunicarseRegistrado(email_anunciante: string) {
		this.perdidoService.enviarMail({"email_anunciante": email_anunciante, "email_interesado": this.mainUser.email}).subscribe((res) => {
			alert(res.message)
		})
	}
}