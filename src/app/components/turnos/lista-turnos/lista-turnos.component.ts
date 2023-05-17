import { Component, OnInit, Input } from '@angular/core';
import { Turno } from '../../../interfaces/Turno'

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent implements OnInit {
  @Input() turno: Turno;

  constructor() {
    this.turno = { id: 0, horario: "", motivo: "" }
  }

  ngOnInit() { }

}
