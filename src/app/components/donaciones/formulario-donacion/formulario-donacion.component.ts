import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/Mascota';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { DonacionesService } from 'src/app/servicios/donaciones.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-formulario-donacion',
	templateUrl: './formulario-donacion.component.html',
	styleUrls: ['./formulario-donacion.component.css']
})

export class FormularioDonacionComponent {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	isLogged: boolean = false;
	mascotas!: Mascota[];
	eleccion!: string;

	constructor(
		private formBuilder: FormBuilder,
		private route: ActivatedRoute,
		public tokenService: TokenService,
		private authService: AuthService,
		public router: Router,
		private donacionService: DonacionesService
	) {
		this.form = this.formBuilder.group({
			id: [],
			monto: new FormControl('', { validators: [Validators.required, Validators.min(10)], updateOn: 'blur' }),
			nombre: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			apellido: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			DNI: new FormControl('', { validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[0-9]*$')], updateOn: 'blur' }),
			campania_id: new FormControl(''),
			titular: new FormControl('', { validators: [Validators.required, Validators.pattern('^[a-zA-Z ]*$')], updateOn: 'blur' }),
			nroTarjeta: new FormControl('', { validators: [Validators.required, Validators.minLength(7), Validators.maxLength(16), Validators.pattern('^[0-9]*$')], updateOn: 'blur' }),
			codigo: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern('^[0-9]*$')], updateOn: 'blur' }),
			fechaVencimiento: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
		})
		this.isLogged = this.tokenService.isLogged();
		this.sub = this.route.params.subscribe(params => {
			if (params['campaniaId'] != -1) {
				this.form.patchValue({ "campania_id": params['campaniaId'] })
			}
		});
	}

	get Monto() {
		return this.form.get("monto");
	}

	get Nombre() {
		return this.form.get("nombre");
	}

	get Apellido() {
		return this.form.get("apellido");
	}

	get DNI() {
		return this.form.get("DNI");
	}

	get Titular() {
		return this.form.get("titular");
	}

	get NroTarjeta() {
		return this.form.get("nroTarjeta");
	}

	get Codigo() {
		return this.form.get("codigo");
	}

	get FechaVencimiento() {
		return this.form.get("fechaVencimiento");
	}

	public elegirAnonimo() {
		this.eleccion = "anonimo";
		this.form.patchValue({ 
			nombre: "Anonimo" ,
			apellido: "Anonimo",
			DNI: "00000000",
		})
	}

	public elegirDarDatos() {
		this.eleccion = "darDatos";
		if (this.isLogged) {
			this.eleccion = "darDatosYaLoggeado";
			let usuario!: Usuario;
			this.authService.getMainUsuario().subscribe(usuarioGet => {
				usuario = usuarioGet;
				this.form.patchValue({ "nombre": usuario.nombre })
				this.form.patchValue({ "apellido": usuario.apellido })
				this.form.patchValue({ "DNI": usuario.DNI })
			});
		}
	}

	public onAdd(): void {
		if (this.form.valid) {
			console.log(this.form.getRawValue())
			this.donacionService.add(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert("Pago realizado exitosamente!")
					this.router.navigate(['/donaciones']);
					this.form.reset()
				}
			})
		} else {
			console.log(this.form.getRawValue())
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
