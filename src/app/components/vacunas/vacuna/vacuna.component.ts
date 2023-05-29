import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vacuna } from 'src/app/interfaces/Vacuna';

@Component({
	selector: 'app-vacuna',
	templateUrl: './vacuna.component.html',
	styleUrls: ['./vacuna.component.css']
})
export class VacunaComponent {
	@Input() vacuna!: Vacuna;
	@Output() onDeleteVacuna: EventEmitter<Vacuna> = new EventEmitter();
	fecha!: Date

	ngOnInit() : void {
		this.fecha = new Date(this.vacuna.fecha);
		this.fecha.setMinutes(this.fecha.getMinutes() + this.fecha.getTimezoneOffset());
	}

	public onDelete(vacuna: Vacuna) {
		this.onDeleteVacuna.emit(vacuna);
	}
}
