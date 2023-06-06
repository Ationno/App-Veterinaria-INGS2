import { Component, OnInit } from '@angular/core';
import { Turno } from '../../interfaces/Turno'
import { TurnosService } from 'src/app/servicios/turnos.service';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  turnos: Turno[] = [];
  subscription?: Subscription;
  turno!: Turno;
  isLogged!: boolean;

  constructor(
    private turnosService: TurnosService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged()
    this.authService.getMainUsuario().subscribe((u))
    this.turnosService.get().subscribe((turnos) => {
      this.turnos = turnos;
    })
  }

  aceptarTurno(turnoId: number | undefined) {
    if (turnoId) {
      this.turnosService.cambiarEstado(turnoId, 'aceptado').subscribe({
        next: (response) => {
          // Realizar acciones después de aceptar el turno
          console.log(response);
          // Actualizar la lista de turnos, si es necesario
          this.turnosService.get().subscribe((turnos) => {
            this.turnos = turnos;
          })
        },
        error: (error) => {
          console.error('Error al aceptar el turno:', error);
        }
      });
    }
  }

  rechazarTurno(turnoId: number | undefined) {
    if (turnoId) {
      this.turnosService.cambiarEstado(turnoId, 'rechazado').subscribe({
        next: (response) => {
          // Realizar acciones después de aceptar el turno
          console.log(response);
          // Actualizar la lista de turnos, si es necesario
          this.turnosService.get().subscribe((turnos) => {
            this.turnos = turnos;
          })
        },
        error: (error) => {
          console.error('Error al aceptar el turno:', error);
        }
      });
    }
  }


}
