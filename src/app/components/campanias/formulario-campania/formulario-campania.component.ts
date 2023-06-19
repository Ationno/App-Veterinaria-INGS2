import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Campania } from 'src/app/interfaces/Campania';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CampaniasService } from 'src/app/servicios/campanias.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-formulario-campania',
    templateUrl: './formulario-campania.component.html',
    styleUrls: ['./formulario-campania.component.css']
})



export class FormularioCampaniaComponent {
	subscription?: Subscription;
    form: FormGroup;
	sub: any;
	edit: boolean = false;

    constructor(
		private formBuilder: FormBuilder,
		private campaniasService: CampaniasService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
     		descripcion: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
		})
		this.sub = this.route.params.subscribe(params => {
			this.edit = params['id'] != -1;
			if (this.edit) {
				this.edit = true;
				this.campaniasService.getById(params['id']).subscribe((campania) => {	
					this.form?.patchValue(campania)
				})
			} else {
				this.form.reset()
			}
		});
	}

	get Titulo(){
		return this.form.get("titulo");
	}

	get Descripcion(){
		return this.form.get("descripcion");
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.campaniasService.add(this.form.getRawValue()).subscribe(() => {});
			alert("Campania agregada exitosamente!")
			this.router.navigate(['/campanias']);
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.campaniasService.edit(this.form.getRawValue()).subscribe(() => {})
			alert("Campania editada exitosamente!")
			this.router.navigate(['/campanias']);
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}