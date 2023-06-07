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
  busquedaMotivo!: string;
  busquedaHorario!: string;
  usuarioId!: number;
  isLogged!: boolean;

  constructor(
    private turnosService: TurnosService,
    private tokenService: TokenService,
    private authService: AuthService
  ) {

  }

  ngOnInit() {
    this.isLogged = this.tokenService.isLogged()
    this.authService.getMainUsuario().subscribe((usuario) => {
      this.usuarioId = usuario.id
    })
    this.turnosService.get().subscribe((turnos) => {
      this.turnos = turnos;
    })
  }

}
