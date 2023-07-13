import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Perdido } from 'src/app/interfaces/Perdido';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerdidosService } from 'src/app/servicios/perdidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as byteBase64 from "byte-base64";
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';
import { MascotasService } from 'src/app/servicios/mascotas.service';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { Mascota } from 'src/app/interfaces/Mascota';

@Component({
	selector: 'app-formulario-perdido',
	templateUrl: './formulario-perdido.component.html',
	styleUrls: ['./formulario-perdido.component.css']
})

export class FormularioPerdidoComponent {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	edit: boolean = false;
	mainUsuario!: Usuario;
	eleccion!: string;
	mascotas!: Mascota[];

	constructor(
		private formBuilder: FormBuilder,
		private perdidosService: PerdidosService,
		private usuarioService: UsuariosService,
		private mascotaService: MascotasService,
		private route: ActivatedRoute,
		public tokenService: TokenService,
		private authService: AuthService,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', [Validators.required]),
			descripcion: new FormControl('', [Validators.required]),
			mascota_id: new FormControl(''),
			encontrado: new FormControl(false),
			usuario_id: new FormControl(''),
			nombre: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			raza: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			color: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			tamano: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			sexo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
			email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: "blur" }),
			imagen: this.formBuilder.group({
				nombre: new FormControl('', { validators: Validators.required, updateOn: "blur" }),
				tipo: new FormControl('', { updateOn: "blur" }),
				base64: new FormControl('', { updateOn: "blur" })
			})
		})
		this.sub = this.route.params.subscribe(params => {
			this.authService.getMainUsuario().subscribe((usuario) => {
				this.form.patchValue({ "usuario_id": usuario.id });
				this.usuarioService.getById(usuario.id).subscribe((usuario) => {
					this.form.patchValue({
						email: usuario.email
					})
					this.mascotas = usuario.mascotas;
				})
			})
			this.edit = params['id'] != -1;
			if (this.edit) {
				this.edit = true;
				this.perdidosService.getById(params['id']).subscribe((perdido) => {
					this.form?.patchValue(perdido)
					this.form.patchValue({
						fechaN: this.formatDate(new Date(perdido.fechaN)),
						imagen: {
							base64: Array.from(byteBase64.base64ToBytes(perdido.imagen.base64))
						}
					})
					this.form?.patchValue({})
				})
			} else {
				this.form.reset()
			}
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

	public agregarMascota() {
		this.eleccion = "agregar";
		this.form.removeControl("mascota_id");
	}

	public utilizarMascota() {
		this.eleccion = "utilizar";
	}

	get Nombre() {
		return this.form.get("nombre");
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

	get Titulo() {
		return this.form.get("titulo");
	}

	get Descripcion() {
		return this.form.get("descripcion");
	}

	get Email() {
		return this.form.get("email");
	}

	get Imagen() {
		return this.form.get("imagen")?.get("nombre");
	}

	get Mascota() {
		return this.form.get("mascota_id");
	}


	public onFileSelected(event: any) {
		const file: File = event.target.files[0];
		const reader = new FileReader;
		if (file) {
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.form.patchValue({
					imagen: {
						nombre: file.name,
						tipo: file.type.split('/')[1],
						base64: Array.from(byteBase64.base64ToBytes(reader.result?.toString().split(',')[1]!))
					}
				})
			};
		}
	}

	public onAdd(): void {
		if (this.eleccion == "utilizar") {
			let mascotaFiltrada = this.mascotas.find(mascota => mascota.id == this.form.get("mascota_id")?.value)
			this.form.patchValue({
				nombre: mascotaFiltrada?.nombre,
				raza: mascotaFiltrada?.raza,
				color: mascotaFiltrada?.color,
				tamano: mascotaFiltrada?.tamano,
				sexo: mascotaFiltrada?.sexo,
			})
		}
		if (this.form.valid) {
			if (this.eleccion == "agregar") {
				this.perdidosService.add(this.form.getRawValue()).subscribe((message) => {
					if (message.error)
						alert(message.error)
					else {
						alert(message.message)
						this.router.navigate(['/perdidos']);
						this.form.reset()
					}
				});
			} else {
				this.perdidosService.add(this.form.getRawValue()).subscribe((message) => {
					if (message.error)
						alert(message.error)
					else {
						alert(message.message)
						this.router.navigate(['/perdidos']);
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
		this.form.removeControl("fechaN");
		if (this.form.valid) {
			this.perdidosService.edit(this.form.getRawValue()).subscribe((message) => {
				alert(message.message)
				this.router.navigate(['/perdidos']);
			})
		} else {
			console.log(this.form.getRawValue())
			this.form.markAllAsTouched();
		}
	}
}