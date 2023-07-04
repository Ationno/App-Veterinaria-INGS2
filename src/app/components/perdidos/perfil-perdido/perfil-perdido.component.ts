import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Perdido } from 'src/app/interfaces/Perdido';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { PerdidosService } from 'src/app/servicios/perdidos.service';

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

	constructor(public tokenService: TokenService, private router: Router, private authService: AuthService, private perdidoService: PerdidosService) {
		this.isLogged = this.tokenService.isLogged();
		this.isAdmin = this.tokenService.isAdmin();
	}

	ngOnInit(): void {
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.mainUser = usuario;
		});
	}

	public onDelete(perdido: Perdido) {
		this.onDeletePerdido.emit(perdido);
	}
}