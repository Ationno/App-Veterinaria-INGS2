import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VacunasService } from 'src/app/servicios/vacunas.service';

@Component({
	selector: 'app-formulario-vacunas',
	templateUrl: './formulario-vacunas.component.html',
	styleUrls: ['./formulario-vacunas.component.css']
})
export class FormularioVacunasComponent {
	subscription?: Subscription;
	form: FormGroup;
	sub: any;
	edit: boolean = false;
	mascotaId!: number;

	constructor(
		private formBuilder: FormBuilder,
		private vacunaService: VacunasService,
		private route: ActivatedRoute,
		public router: Router
	) {
		this.form = this.formBuilder.group({
			id: [],
			nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			fecha: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			mascota_id: new FormControl('')
		})
		this.sub = this.route.params.subscribe(params => {
			this.mascotaId = params['mascotaId'];
			this.edit = params['vacunaId'] != -1;
			if (this.edit) {
				this.edit = true;
				this.vacunaService.getById(params['vacunaId']).subscribe((vacuna) => {	
					this.form?.patchValue(vacuna)
					this.form?.patchValue({fecha: this.formatDate(new Date(vacuna.fecha))})
				})
			} else {
				this.form.reset()
			}
			this.form.patchValue({mascota_id: this.mascotaId});
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

	get Nombre(){
		return this.form.get("nombre");
	}

	get Fecha(){
		return this.form.get("fecha");
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.form.patchValue({"mascota_id": this.mascotaId})
			this.vacunaService.add(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert("Vacuna añadida exitosamente")
					this.router.navigate(['/vacunas', this.mascotaId]);
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
			this.vacunaService.edit(this.form.getRawValue()).subscribe((message) => {
				if (message.error) {
					alert(message.error)
				} else {
					alert("Vacuna editada exitosamente")
					this.router.navigate(['/vacunas', this.mascotaId]);
					this.form.reset()
				}
			})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
