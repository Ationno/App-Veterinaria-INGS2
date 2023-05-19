import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Turno } from '../../../interfaces/Turno'

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent {
  @Input() turno!: Turno;
  @Output() onModifyTurno: EventEmitter<Turno> = new EventEmitter();

  ngOnInit(): void { }

  public onModify(turno: Turno) {

  }
}
