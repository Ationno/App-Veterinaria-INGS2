import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdopcionesService } from 'src/app/servicios/adopciones.service';
import { AnunciosService } from 'src/app/servicios/anuncios.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
	selector: 'app-formulario-anuncio-comunicar-anonimo',
	templateUrl: './formulario-anuncio-comunicar-anonimo.component.html',
	styleUrls: ['./formulario-anuncio-comunicar-anonimo.component.css']
})
export class FormularioAnuncioComunicarAnonimoComponent {
	form: FormGroup;
	email: string = "";
	isLogged = false;
	sub: any;
	idUser!: number;
	email_anunciante!: string;

	get Email() {
		return this.form.get("email");
	}

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router, private anuncioService: AnunciosService) {
		this.form = this.formBuilder.group({
			email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: "blur" }),
		})
		this.sub = this.route.params.subscribe(params => {
			this.email_anunciante = params['email_anunciante'];
		});
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.anuncioService.enviarMail({ "email_anunciante": this.email_anunciante, "email_interesado": this.form.get("email")!.value}).subscribe((res) => {
				alert(res.message)
				if (res.message == "Mensaje enviado!") this.router.navigate(['/anuncios']);
			})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
