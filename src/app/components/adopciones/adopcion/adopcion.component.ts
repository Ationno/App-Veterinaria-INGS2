import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Adopcion } from 'src/app/interfaces/Adopcion';
import { Mascota } from 'src/app/interfaces/Mascota';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AdopcionesService } from 'src/app/servicios/adopciones.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-adopcion',
	templateUrl: './adopcion.component.html',
	styleUrls: ['./adopcion.component.css']
})
export class AdopcionComponent {
	@Input() adopcion!: Adopcion;
	@Output() onDeleteAdopcion: EventEmitter<Adopcion> = new EventEmitter();
	mascota!: Mascota;
	mainUser!: Usuario;
	isLogged!: boolean;

	constructor(private authService: AuthService, private adopcionService: AdopcionesService, private tokenService: TokenService) {}

	ngOnInit() : void {
		this.authService.getMainUsuario().subscribe((usuario) => {
			this.mainUser = usuario;
		});
		this.isLogged = this.tokenService.isLogged();
	}

	public onDelete(adopcion: Adopcion) {
		this.onDeleteAdopcion.emit(adopcion);
	}

	public isCreator(): boolean {
		if (!this.mainUser) return false
		return this.mainUser.id == this.adopcion.usuario_id;
	}

	public onAdoptarRegistrado(usuario_id: number) {
		this.adopcionService.enviarMail({"usuario_id": usuario_id, "email": this.mainUser.email}).subscribe((res) => {
			alert(res.message)
		})
	}
}
