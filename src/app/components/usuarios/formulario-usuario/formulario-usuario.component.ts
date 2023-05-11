import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/Usuario';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})

export class FormularioUsuarioComponent {
	@Output() onAddExperience: EventEmitter<Usuario> = new EventEmitter();
	@Output() onEditExperience: EventEmitter<Usuario> = new EventEmitter();
	@Output() onToggleFormExperience: EventEmitter<Event> = new EventEmitter();
	@Input() usuario: Usuario = {nombre: "", apellido: "", DNI: "", email: "", telefono: ""};
	showFormExperience: boolean = false;
	subscription?: Subscription;
	form: FormGroup;

	constructor(
		private formBuilder: FormBuilder
	) {
		this.form = this.formBuilder.group({
			id: [],
			nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      apellido: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      DNI: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      telefono: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"})
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['usuario']?.currentValue)  {
			this.form?.patchValue(this.usuario);
		}
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

	public onClose(): void {
		this.onToggleFormExperience.emit();
		this.form.reset();
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.onAddExperience.emit(this.form.getRawValue());
			this.onToggleFormExperience.emit();
			this.form.reset()
			alert("Success!")
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.onEditExperience.emit(this.form.getRawValue());
			this.onToggleFormExperience.emit();
			this.form.reset()
			alert("Success!")
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
