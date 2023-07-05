import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Perdido } from 'src/app/interfaces/Perdido';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerdidosService } from 'src/app/servicios/perdidos.service';
import { ActivatedRoute, Router } from '@angular/router';

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

    constructor(
		private formBuilder: FormBuilder,
		private perdidosService: PerdidosService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
     		titulo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      		descripcion: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"}),
		})
		this.sub = this.route.params.subscribe(params => {
			this.edit = params['id'] != -1;
			if (this.edit) {
				this.edit = true;
				this.perdidosService.getById(params['id']).subscribe((perdido) => {	
					this.form?.patchValue(perdido)
				})
			} else {
				this.form.reset()
			}
		});
	}

	get Nombre(){
		return this.form.get("nombre");
	}

	get Titulo(){
		return this.form.get("titulo");
	}

  	get Descripcion(){
		return this.form.get("descripcion");
	}

	get Email(){
		return this.form.get("email");
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.perdidosService.add(this.form.getRawValue()).subscribe(() => {});
			alert("Anuncio de perro perdido agregado exitosamente!")
			this.router.navigate(['/perdidos']);
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.perdidosService.edit(this.form.getRawValue()).subscribe(() => {})
			alert("Anuncio de perro perdido editado exitosamente!")
			this.router.navigate(['/perdidos']);
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}