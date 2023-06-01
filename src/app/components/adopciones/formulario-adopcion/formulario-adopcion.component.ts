import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/Mascota';
import { AdopcionesService } from 'src/app/servicios/adopciones.service';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
	selector: 'app-formulario-adopcion',
	templateUrl: './formulario-adopcion.component.html',
	styleUrls: ['./formulario-adopcion.component.css']
})
export class FormularioAdopcionComponent {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	edit: boolean = false;
	usuarioId!: number;
	mascotas!: Mascota[];
	eleccion!: string;

	constructor(
		private formBuilder: FormBuilder,
		private adopcionService: AdopcionesService,
		private usuarioService: UsuariosService,
		private mascotaService: MascotasService,
		private route: ActivatedRoute,
		public tokenService: TokenService,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', [Validators.required]),
			descripcion: new FormControl('', [Validators.required]),
			mascota_id: new FormControl('', [Validators.required]),
			finalizada: new FormControl(false),
			usuario_id: new FormControl(''),
			nombre: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			fechaN: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			raza: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			color: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			tamano: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			sexo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			anonima: new FormControl(false)
		})
		this.sub = this.route.params.subscribe(params => {
			this.usuarioId = params['usuarioId'];
			this.usuarioService.getById(this.usuarioId).subscribe((usuario) => {
				this.mascotas = usuario.mascotas;
			})
			this.edit = params['adopcionId'] != -1;
			if (this.edit) {
				this.edit = true;
				this.adopcionService.getById(params['adopcionId']).subscribe((adopcion) => {
					this.form?.patchValue(adopcion)
					this.form?.patchValue({fechaN: this.formatDate(new Date(adopcion.mascota.fechaN))})
					console.log(adopcion)
				})
			} else {
				this.form.reset()
			}
			this.form.patchValue({ "usuario_id": this.usuarioId });
		});
	}

	private formatDate(date: Date) {
		date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
		const d = new Date(date);
		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		const year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}

	get Titulo() {
		return this.form.get("titulo");
	}

	get Descripcion() {
		return this.form.get("descripcion");
	}

	get Nombre() {
		return this.form.get("nombre");
	}

	get FechaN() {
		return this.form.get("fechaN");
	}

	get Raza() {
		return this.form.get("raza");
	}

	get Color() {
		return this.form.get("color");
	}

	get Tamano() {
		return this.form.get("tamano");
	}

	get Sexo() {
		return this.form.get("sexo");
	}

	get Mascota() {
		return this.form.get("mascota_id");
	}

	public agregarMascota() {
		this.eleccion = "agregar";
		this.form.removeControl("mascota_id");
	}

	public utilizarMascota() {
		this.eleccion = "utilizar";
		this.form.removeControl("nombre");
		this.form.removeControl("fechaN");
		this.form.removeControl("raza");
		this.form.removeControl("color");
		this.form.removeControl("tamano");
		this.form.removeControl("sexo");
		this.form.removeControl("anonima");
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.form.patchValue({ "usuario_id": this.usuarioId })
			if (this.eleccion == "agregar") {
				this.form.addControl("mascota_id", new FormControl('', [Validators.required]))
				this.form.patchValue({ "anonima": true })
				this.mascotaService.add(this.form.getRawValue()).subscribe((message) => {
					if (message.error) {
						alert(message.error)
						this.form.removeControl("mascota_id");
					} else {
						this.form.patchValue({ "mascota_id": message.mascota_id })
						this.adopcionService.add(this.form.getRawValue()).subscribe((message) => {
							alert(message.success)
							this.router.navigate(['/adopciones']);
							this.form.reset()
						});
					}
				})
			} else {
				this.adopcionService.add(this.form.getRawValue()).subscribe((message) => {
					if (message.error)
						alert(message.error)
					else {
						alert(message.success)
						this.router.navigate(['/adopciones']);
						this.form.reset()
					}
				});
			}
		} else {
			console.log(this.form.getRawValue())
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		this.form.removeControl("nombre");
		this.form.removeControl("fechaN");
		this.form.removeControl("raza");
		this.form.removeControl("color");
		this.form.removeControl("tamano");
		this.form.removeControl("sexo");
		this.form.removeControl("anonima");
		if (this.form.valid) {
			this.adopcionService.edit(this.form.getRawValue()).subscribe((message) => {
				alert(message.message)
				this.router.navigate(['/adopciones']);
			})
		} else {
			this.form.markAllAsTouched();
		}
	}
}
