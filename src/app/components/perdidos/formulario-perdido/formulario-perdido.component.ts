import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Perdido } from 'src/app/interfaces/Perdido';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerdidosService } from 'src/app/servicios/perdidos.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as byteBase64 from "byte-base64";
import { AuthService } from 'src/app/servicios/auth.service';
import { Usuario } from 'src/app/interfaces/Usuario';

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

    constructor(
		private formBuilder: FormBuilder,
		private perdidosService: PerdidosService,
		private route: ActivatedRoute,
		public router: Router,
		private authService: AuthService
	) {
		this.form = this.formBuilder.group({
			id: [],
			usuario_id: new FormControl(),
			encontrado: new FormControl(false),
			nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			raza: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			color: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			tamano: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			sexo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
     		titulo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
      		descripcion: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"}),
			imagen: this.formBuilder.group({
				nombre: new FormControl('', {validators: Validators.required, updateOn: "blur"}),
				tipo: new FormControl('', {updateOn: "blur"}),
				base64: new FormControl('', {updateOn: "blur"})
			})
		})
		this.sub = this.route.params.subscribe(params => {
			this.edit = params['id'] != -1;
			if (this.edit) {
				this.edit = true;
				this.perdidosService.getById(params['id']).subscribe((perdido) => {	
					this.form?.patchValue(perdido)
					this.form.patchValue({
						imagen: {
							base64: Array.from(byteBase64.base64ToBytes(perdido.imagen.base64))
						}
					})
				})
			} else {
				this.authService.getMainUsuario().subscribe((usuario) => {
					this.mainUsuario = usuario;
					this.form.reset()
					this.form.patchValue({
						email: this.mainUsuario.email,
						usuario_id: this.mainUsuario.id
					})
				})
				if (!this.mainUsuario)
					this.form.patchValue({
						usuario_id: 0
					})
			}
		});
	}

	get Nombre(){
		return this.form.get("nombre");
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

	get Titulo(){
		return this.form.get("titulo");
	}

  	get Descripcion(){
		return this.form.get("descripcion");
	}

	get Email(){
		return this.form.get("email");
	}

	get Imagen(){
		return this.form.get("imagen")?.get("nombre");	
	}

	public onFileSelected(event: any) {
		const file:File = event.target.files[0];
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
		if (this.form.valid) {
			this.perdidosService.add(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert("Anuncio de perro perdido agregado exitosamente!")
					this.router.navigate(['/perdidos']);
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
			this.perdidosService.edit(this.form.getRawValue()).subscribe(() => {})
			alert("Anuncio de perro perdido editado exitosamente!")
			this.router.navigate(['/perdidos']);
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}