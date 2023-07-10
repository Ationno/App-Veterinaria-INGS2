import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mascota } from 'src/app/interfaces/Mascota';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CruzasService } from 'src/app/servicios/cruzas.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-formulario-cruza',
  templateUrl: './formulario-cruza.component.html',
  styleUrls: ['./formulario-cruza.component.css']
})
export class FormularioCruzaComponent {
    subscription?: Subscription;
    form: FormGroup;
    sub: any;
    edit: boolean = false;
    usuarioId!: number;
    mascotas!: Mascota[];
    
    constructor(
        private formBuilder: FormBuilder,
        private cruzaService: CruzasService,
        private usuarioService: UsuariosService,
        private route: ActivatedRoute,
        public tokenService: TokenService,
        public router: Router
    ){
      this.form = this.formBuilder.group({
          id: [],
          fechaCelo: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
          mascota_id: new FormControl('', [Validators.required]),
          usuario_id: new FormControl('')
    })

      this.sub = this.route.params.subscribe(params => {
			    this.usuarioId = params['usuarioId'];
			    this.usuarioService.getById(this.usuarioId).subscribe((usuario) => {
				  this.mascotas = usuario.mascotas;
			    })
          this.edit = params['cruzaId'] != -1;
			    if (this.edit) {
				      this.edit = true;
              this.cruzaService.getById(params['cruzaId']).subscribe((cruza) => {
              this.form?.patchValue(cruza)
              this.form?.patchValue({fechaCelo: this.formatDate(new Date(cruza.fechaCelo))})
            })
          } else {
				    this.form.reset()
			    }
			    this.form.patchValue({ "usuario_id": this.usuarioId });
		});    
    }

  
    private formatDate(date: Date) {
	    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
	    const d = new Date(date);
		let month = '' + (d.getMonth() + 1);
		let day = '' + d.getDate();
		const year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}
  
    get FechaCelo() {
	        return this.form.get("fechaCelo");
    }

    get Mascota() {
        return this.form.get("mascota");
    }

    public onAdd(): void {
        if (this.form.valid) {
            this.form.patchValue({ "usuario_id": this.usuarioId })
            this.cruzaService.add(this.form.getRawValue()).subscribe((message) => {
                if (message.error) {
                    alert(message.error)
                } else {
                    alert(message.success)
                    this.router.navigate(['/cruza']);
                    this.form.reset()
                }
            });
        } else {
            console.log(this.form.errors)
            console.log('Probando...' + this.form.getRawValue())
            this.form.markAllAsTouched();
        }
    }

    public onEdit(): void {
        if (this.form.valid) {
            this.cruzaService.edit(this.form.getRawValue()).subscribe((message) => {
            if (message.error) {
                alert(message.error)
            } else {
                alert(message.message)
                this.router.navigate(['/cruza']);
            }
            })
        } else {
            console.log(this.form.errors)
            this.form.markAllAsTouched();
        }
    }
}
