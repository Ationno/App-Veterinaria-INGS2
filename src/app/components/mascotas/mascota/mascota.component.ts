import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Mascota } from 'src/app/interfaces/Mascota';

@Component({
	selector: 'app-mascota',
	templateUrl: './mascota.component.html',
	styleUrls: ['./mascota.component.css']
})
export class MascotaComponent {
	@Input() mascota!: Mascota;
	@Output() onDeleteMascota: EventEmitter<Mascota> = new EventEmitter();
	fecha!: Date;
	fechaHoy!: Date;

	ngOnInit() : void {
		this.fecha = new Date(this.mascota.fechaN);
		this.fecha.setMinutes(this.fecha.getMinutes() + this.fecha.getTimezoneOffset());
		this.fechaHoy = new Date();
	}
}
