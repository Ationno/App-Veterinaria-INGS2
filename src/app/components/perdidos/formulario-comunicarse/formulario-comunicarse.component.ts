import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { PerdidosService } from 'src/app/servicios/perdidos.service';

@Component({
	selector: 'app-formulario-comunicarse',
	templateUrl: './formulario-comunicarse.component.html',
	styleUrls: ['./formulario-comunicarse.component.css']
})
export class FormularioComunicarseComponent {
		form: FormGroup;
		email: string = "";
		isLogged = false;
		sub: any;
		email_anunciante!: string;
	
		get Email() {
			return this.form.get("email");
		}
	
		constructor(private formBuilder: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router, private perdidoService: PerdidosService) {
			this.form = this.formBuilder.group({
				email: new FormControl('', { validators: [Validators.required, Validators.email], updateOn: "blur" }),
			})
			this.sub = this.route.params.subscribe(params => {
				this.perdidoService.getById(params['perdidoId']).subscribe((perdido) => {
					this.email_anunciante = perdido.email;
				});
			});
		}
	
		public onAdd(): void {
			if (this.form.valid) {
				this.perdidoService.enviarMail({"email_anunciante": this.email_anunciante, "email_interesado": this.form.get("email")!.value}).subscribe((res) => {
					alert(res.message)
					this.router.navigate(['/perdidos']);
				})
			} else {
				console.log(this.form.errors)
				this.form.markAllAsTouched();
			}
		}
	}
	