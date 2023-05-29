import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/Mascota';
import { AdopcionesService } from 'src/app/servicios/adopciones.service';
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

	constructor(
		private formBuilder: FormBuilder,
		private adopcionService: AdopcionesService,
		private usuarioService: UsuariosService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', [Validators.required]),
			descripcion: new FormControl('', [Validators.required]),
			mascota_id: new FormControl(''),
			usuario_id: new FormControl('')
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
				})
			} else {
				this.form.reset()
			}
			this.form.patchValue({"usuario_id": this.usuarioId});
		});
	}

	get Titulo(){
		return this.form.get("titulo");
	}

	get Descripcion(){
		return this.form.get("descripcion");
	}

	get Mascota(){
		return this.form.get("mascota_id");
	}


	public onAdd(): void {
		if (this.form.valid) {
			this.form.patchValue({"usuario_id": this.usuarioId})
			this.adopcionService.add(this.form.getRawValue()).subscribe(() => {});
			this.router.navigate(['/adopciones']);
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.adopcionService.edit(this.form.getRawValue()).subscribe(() => {})
			this.router.navigate(['/adopciones']);
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
