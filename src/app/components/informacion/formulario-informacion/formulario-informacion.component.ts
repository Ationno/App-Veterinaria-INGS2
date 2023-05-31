import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
@Component({
  selector: 'app-formulario-informacion',
  templateUrl: './formulario-informacion.component.html',
  styleUrls: ['./formulario-informacion.component.css']
})
export class FormularioInformacionComponent {
	form: FormGroup;
	sub: any;
	edit: boolean = false;
	visibility: boolean = false;

	constructor(
		private formBuilder: FormBuilder,
		private usuarioService: UsuariosService,
		private tokenService: TokenService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: 'blur'}),
		 	password: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
		})
		this.sub = this.route.params.subscribe(params => {
			this.usuarioService.getById(params['id']).subscribe((usuario) => {	
				this.form?.patchValue(usuario)
			})
		});
	}

	public changeVisibility() {
		this.visibility = !this.visibility;
	}

	get Email(){
		return this.form.get("email");
	}

 	get Password(){
		return this.form.get("password");
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.usuarioService.editReducido(this.form.getRawValue()).subscribe((message) => {
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
