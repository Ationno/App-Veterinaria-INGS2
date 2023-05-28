import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})

export class FormularioUsuarioComponent {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	edit: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private usuariosService: UsuariosService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
     		apellido: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      		DNI: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      		telefono: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      		email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"}),
			mascotas: new FormControl([])
		})
		this.sub = this.route.params.subscribe(params => {
			this.edit = params['id'] != -1;
			if (this.edit) {
				this.edit = true;
				this.usuariosService.getById(params['id']).subscribe((usuario) => {	
					this.form?.patchValue(usuario)
				})
			} else {
				this.form.reset()
			}
		});
	}

	get Nombre(){
		return this.form.get("nombre");
	}

	get Apellido(){
		return this.form.get("apellido");
	}

  	get DNI(){
		return this.form.get("DNI");
	}

  	get Email(){
		return this.form.get("email");
	}

 	get Telefono(){
		return this.form.get("telefono");
	}

	public onAdd(): void {
		if (this.form.valid) {
			console.log(this.form.getRawValue())
			this.usuariosService.add(this.form.getRawValue()).subscribe(() => {});
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.usuariosService.edit(this.form.getRawValue()).subscribe(() => {})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
