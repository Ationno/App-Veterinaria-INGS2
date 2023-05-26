import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MascotasService } from 'src/app/servicios/mascotas.service';

@Component({
	selector: 'app-formulario-mascota',
	templateUrl: './formulario-mascota.component.html',
	styleUrls: ['./formulario-mascota.component.css']
})
export class FormularioMascotaComponent {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	edit: boolean = false;
	usuarioId!: number;

	constructor(
		private formBuilder: FormBuilder,
		private mascotaService: MascotasService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
		 	edad: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			raza: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			color: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			tamano: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			sexo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			usuarioId: new FormControl('')
		})
		this.sub = this.route.params.subscribe(params => {
			this.usuarioId = params['usuarioId'];
			this.edit = params['mascotaId'] != -1;
			if (this.edit) {
				this.edit = true;
				this.mascotaService.getById(params['mascotaId']).subscribe((mascota) => {	
					this.form?.patchValue(mascota)
				})
			} else {
				this.form.reset()
			}
			this.form.patchValue({usuarioId: this.usuarioId});
		});
	}

	get Nombre(){
		return this.form.get("nombre");
	}

	get Edad(){
		return this.form.get("edad");
	}

	get Raza(){
		return this.form.get("raza");
	}

	get Color(){
		return this.form.get("color");
	}

	get Tamano(){
		return this.form.get("tamano");
	}

 	get Sexo(){
		return this.form.get("sexo");
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.mascotaService.add(this.form.getRawValue()).subscribe(() => {});
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.mascotaService.edit(this.form.getRawValue()).subscribe(() => {})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}