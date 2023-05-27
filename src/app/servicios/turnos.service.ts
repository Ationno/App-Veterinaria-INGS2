import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDB } from './get-db.service';

@Injectable({
  providedIn: 'root'
})
export class TurnosService extends getDB {

  constructor(
    http: HttpClient
  ) {
    super(http)
  }

  public agregarTurno(turno: any): Observable<any> {
    return this.add(turno, "agregar_turno");
  }

  public obtenerTurnos(): Observable<any[]> {
    return this.get("obtener_turnos");
  }
}
