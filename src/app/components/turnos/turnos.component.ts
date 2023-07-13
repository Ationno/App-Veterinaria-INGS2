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
  turnosPasados: Turno[] = [];
  subscription?: Subscription;
  turno!: Turno;
  busquedaMotivo1!: string;
  busquedaHorario1!: string;
  busquedaMotivo2!: string;
  busquedaHorario2!: string;
  usuarioId!: number;
  isLogged!: boolean;
  isAdmin!: boolean;
  verHistorial: boolean = false;

  constructor(
    private turnosService: TurnosService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged()
    this.isAdmin = this.tokenService.isAdmin()
    this.authService.getMainUsuario().subscribe((usuario) => {
      this.usuarioId = usuario.id
    })
    this.turnosService.get().subscribe((turnos) => {
      this.turnos = turnos;
    })
  }

  getTurnosActualizados() {
    this.turnosService.get().subscribe((turnos) => {
      this.turnos = turnos;
    })
  }

  getFilteredTurnos(): Turno[] {
    if (this.isAdmin) {
      return this.turnos;
    } else {
      return this.turnos.filter((turno => turno.usuario_id == this.usuarioId))
    }
  }

  getTurnosDelDia(): Turno[] {
    const fechaActual = new Date();
    const filteredTurnos = this.getFilteredTurnos();
    return filteredTurnos.filter((turno) => {
      const turnoFecha = new Date(turno.fecha);
      // Filtro por fecha igual a la fecha actual y estado "aceptado"
      return (turnoFecha.toLocaleDateString() == fechaActual.toLocaleDateString());
    });
  }

  getTurnosProximos(): Turno[] {
    const fechaActual = new Date();
    fechaActual.setHours(0,0,0,0)
    const filteredTurnos = this.getFilteredTurnos();
    return filteredTurnos.filter((turno) => {
      const turnoFecha = new Date(turno.fecha)
      turnoFecha.setHours(0,0,0,0)
      // Filtro por fechas posterior a la actual y estado distinto a "rechazado"
      return turnoFecha.getTime() > fechaActual.getTime() && (turno.estado != "Rechazado");
    });
  }

  getTurnosPasados(): Turno[] {
    const fechaActual = new Date();
    fechaActual.setHours(0,0,0,0)
    const filteredTurnos = this.getFilteredTurnos();
    return filteredTurnos.filter((turno) => {
      const turnoFecha = new Date(turno.fecha)
      turnoFecha.setHours(0,0,0,0)
      // Filtro por fechas posterior a la actual y estado distinto a "rechazado"
      return turnoFecha.getTime() < fechaActual.getTime() && (turno.estado != "Rechazado");
    });
  }



  verHistorialTurnos(): void{
    this.verHistorial = !this.verHistorial;
  }
}
