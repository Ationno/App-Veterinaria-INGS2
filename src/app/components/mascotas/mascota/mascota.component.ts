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

	ngOnInit() : void {}

	public onDelete(mascota: Mascota) {
		this.onDeleteMascota.emit(mascota);
	}
}
