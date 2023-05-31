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
      		telefono: new FormControl('', {validators: [Validators.required, Validators.pattern('[- +()0-9]+'), Validators.minLength(9)], updateOn: 'blur'}),
      		email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"}),
			password: new FormControl(''),
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

	public makeRandom(lengthOfCode: number): string {
		let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
		let text = "";
		for (let i = 0; i < lengthOfCode; i++) {
		  text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
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
			this.form?.patchValue({password: this.makeRandom(8)});
			this.usuariosService.add(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert(message.success)
					this.router.navigate(['/usuarios']);
					this.form.reset()
				}
			});
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.usuariosService.edit(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert(message.success)
					this.router.navigate(['/usuarios']);
				}
			})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
