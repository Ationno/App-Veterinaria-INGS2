import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';

@Component({
	selector: 'app-formulario-informacion-admin',
	templateUrl: './formulario-informacion-admin.component.html',
	styleUrls: ['./formulario-informacion-admin.component.css']
})
export class FormularioInformacionAdminComponent {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	visibility: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private usuariosService: UsuariosService,
		private tokenService: TokenService,
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
			password: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			mascotas: new FormControl([])
		})
		this.sub = this.route.params.subscribe(params => {
			this.usuariosService.getById(params['id']).subscribe((usuario) => {	
				this.form?.patchValue(usuario)
			})
		});
	}

	public changeVisibility() {
		this.visibility = !this.visibility;
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

	get Password(){
		return this.form.get("password");
	}

 	get Telefono(){
		return this.form.get("telefono");
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.usuariosService.edit(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					this.tokenService.setToken(this.form.getRawValue().email)
					alert(message.success)
					this.router.navigate(['/informacion']);
				}
			})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
