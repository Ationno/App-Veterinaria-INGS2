import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Anuncio } from 'src/app/interfaces/Anuncio';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-formulario-anuncio',
    templateUrl: './formulario-anuncio.component.html',
    styleUrls: ['./formulario-anuncio.component.css']
})



export class FormularioAnuncioComponent {
    @Output() onAddExperience: EventEmitter<Anuncio> = new EventEmitter();
	@Output() onEditExperience: EventEmitter<Anuncio> = new EventEmitter();
	@Output() onToggleFormExperience: EventEmitter<Event> = new EventEmitter();
	showFormExperience: boolean = false;
	subscription?: Subscription;
    form: FormGroup;
	sub: any;
	edit: boolean = false;

    constructor(
		private formBuilder: FormBuilder,
		private anunciosService: AnunciosService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
     		servicio: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      		zona: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      		disponibilidad: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
		})
		this.sub = this.route.params.subscribe(params => {
			this.edit = params['id'] != -1;
			if (this.edit) {
				this.edit = true;
				this.anunciosService.getById(params['id']).subscribe((anuncio) => {	
					this.form?.patchValue(anuncio)
				})
			} else {
				this.form.reset()
			}
		});
	}

	get Nombre(){
		return this.form.get("nombre");
	}

	get Servicio(){
		return this.form.get("servicio");
	}

  	get Zona(){
		return this.form.get("zona");
	}

  	get Disponibilidad(){
		return this.form.get("disponibilidad");
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.anunciosService.add(this.form.getRawValue()).subscribe(() => {});
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.anunciosService.edit(this.form.getRawValue()).subscribe(() => {})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}