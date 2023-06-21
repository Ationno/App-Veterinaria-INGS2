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

	public cambiarEstado(turnoId: number, estado: string, email_emisor: String): Observable<any> {
		const url = `${this.apiUrl}/cambiarEstado/${turnoId}`;
		const body = { estado: estado, email_emisor: email_emisor };
		return this.http.put<any>(url, body, httpOptions);
	}
}
