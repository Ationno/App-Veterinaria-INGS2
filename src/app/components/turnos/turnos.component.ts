import { Component, OnInit } from '@angular/core';
import { Turno } from '../../interfaces/Turno'
import { TURNOS } from "./DatosTurnos"

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  turnos = TURNOS;
  selectedTurno: Turno;

  constructor() {
    this.selectedTurno = { id: 0, horario: "", motivo: "" }
  }

  ngOnInit() { }

  onSelect(turno: Turno): void {
    this.selectedTurno = turno;
  }

}
