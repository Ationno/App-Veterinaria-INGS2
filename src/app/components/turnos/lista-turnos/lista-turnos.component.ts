import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Turno } from '../../../interfaces/Turno'
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-turnos',
  templateUrl: './lista-turnos.component.html',
  styleUrls: ['./lista-turnos.component.css']
})
export class ListaTurnosComponent {
  @Input() turno!: Turno;
  mainUser!: Usuario;
  isLogged!: boolean;
  isAdmin!: boolean;
  fecha!: Date;
  @Output() turnoActualizado = new EventEmitter<Turno>();

  constructor(
    private authService: AuthService,
    private turnosService: TurnosService,
    private tokenService: TokenService,
    public router: Router) { }

  ngOnInit(): void {
    this.fecha = new Date(this.turno.fecha)
    this.fecha.setMinutes(this.fecha.getMinutes() + this.fecha.getTimezoneOffset());
    this.authService.getMainUsuario().subscribe((usuario) => {
      this.mainUser = usuario;
    });
    this.isLogged = this.tokenService.isLogged();
    this.isAdmin = this.tokenService.isAdmin();
  }

  public onAccept(turno: Turno) {
    if (turno.id)
      this.turnosService.cambiarEstado(turno.id, "Aceptado", this.mainUser).subscribe(() => {
        this.turnoActualizado.emit(turno);
        alert("Turno aceptado exitosamente")
      })
  }

  public onReject(turno: Turno) {
    if (turno.id)
      this.turnosService.cambiarEstado(turno.id, "Rechazado", this.mainUser).subscribe(() => {
        this.turnoActualizado.emit(turno);
        alert("Turno rechazado exitosamente")
      })
  }

  public confirmarAsistencia(turno: Turno, estado: string) {
    console.log(estado)
    if (turno.id)
      this.turnosService.confirmarAsistencia(turno.id, estado).subscribe((message) => {
        if (message.error)
          alert(message.error)
        else {
          this.turnoActualizado.emit(turno);
          if (estado == "Asistió")
            this.router.navigate(['/turnos/formPagoTurno', turno.id])
          alert(message.message)
        }
      })
  }
}
