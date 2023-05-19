import { Component, OnInit } from '@angular/core';
import { Turno } from '../../interfaces/Turno'
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  turnos: Turno[] = [];
  subscription?: Subscription;
  turno!: Turno

  constructor(
    private turnosService: TurnosService
  ) {

  }

  ngOnInit() {
    this.turnosService.get().subscribe((turnos) => {
      this.turnos = turnos;
    })
  }

}
