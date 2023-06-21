import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Turno } from '../../../interfaces/Turno'
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { TurnosService } from 'src/app/servicios/turnos.service';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent {
  @Input() turno!: Turno;
  mainUser!: Usuario;
  isLogged!: boolean;

  constructor(private authService: AuthService, private turnosService: TurnosService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.authService.getMainUsuario().subscribe((usuario) => {
      this.mainUser = usuario;
    });
    this.isLogged = this.tokenService.isLogged();
  }

  public onAccept(turno: Turno) {
    if (turno.id)
      this.turnosService.cambiarEstado(turno.id, "Aceptado").subscribe(() => {
        alert("Turno aceptado exitosamente")
      })
  }

  public onReject(turno: Turno) {
    if (turno.id)
      this.turnosService.cambiarEstado(turno.id, "Rechazado").subscribe(() => {
        alert("Turno rechazado exitosamente")
      })
  }
}
