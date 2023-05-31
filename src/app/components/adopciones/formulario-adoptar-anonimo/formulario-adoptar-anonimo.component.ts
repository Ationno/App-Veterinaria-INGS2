import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdopcionesService } from 'src/app/servicios/adopciones.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-formulario-adoptar-anonimo',
	templateUrl: './formulario-adoptar-anonimo.component.html',
	styleUrls: ['./formulario-adoptar-anonimo.component.css']
})
export class FormularioAdoptarAnonimoComponent {
	form: FormGroup;
	email: string = "";
	isLogged = false;
	sub: any;
	idUser!: number;

	get Email() {
		return this.form.get("email");
	}

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router, private adopcionService: AdopcionesService) {
		this.form = this.formBuilder.group({
			email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: "blur" }),
		})
		this.sub = this.route.params.subscribe(params => {
			this.adopcionService.getById(params['adopcionId']).subscribe((adopcion) => {
				this.idUser = adopcion.usuario_id;
			});
		});
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.adopcionService.enviarMail({ "usuario_id": this.idUser, "email": this.form.get("email")!.value}).subscribe((res) => {
				alert(res.message)
				if (res.message == "Mensaje enviado!") this.router.navigate(['/adopciones']);
			})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
