import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Anuncio } from 'src/app/interfaces/Anuncio';
@Component({
  selector: 'app-perfil-anuncio',
  templateUrl: './perfil-anuncio.component.html',
  styleUrls: ['./perfil-anuncio.component.css']
})
export class PerfilAnuncioComponent {
    @Input() anuncio!: Anuncio;
	@Output() onDeleteAnuncio: EventEmitter<Anuncio> = new EventEmitter();

	ngOnInit() : void {}

	public onDelete(anuncio: Anuncio) {
		this.onDeleteAnuncio.emit(anuncio);
	}
}
