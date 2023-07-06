import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDB } from './get-db.service';
import { Usuario } from '../interfaces/Usuario';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
	providedIn: 'root'
})
export class TurnosService extends getDB {
	constructor(
		http: HttpClient
	) {
		super(http)
		this.apiUrl += "turno";
	}

	public cambiarEstado(turnoId: number, estado: string, usuario_actual: Usuario): Observable<any> {
		const url = `${this.apiUrl}/cambiarEstado/${turnoId}`;
		const body = { estado: estado, usuario_actual: usuario_actual };
		return this.http.put<any>(url, body, httpOptions);
	}

	public obtenerMontoDescuentoUsuario(any: any): Observable<any> {
		const url = `${this.apiUrl}/obtenerMontoDescuentoUsuario/${any.turno_id}`;
		return this.http.get<any>(url)
	}

	public confirmarAsistencia(turnoId: number, estado: string): Observable<any> {
		const url = `${this.apiUrl}/confirmarAsistencia/${turnoId}`
		const body = { estado: estado };
		return this.http.put<any>(url, body, httpOptions);
	}

	public confirmarPago(any: any): Observable<any> {
		const url = `${this.apiUrl}/confirmarPago/${any.turno_id}`
		return this.http.put<any>(url, any, httpOptions);
	}	
}
