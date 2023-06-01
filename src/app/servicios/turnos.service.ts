import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDB } from './get-db.service';

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

	public cambiarEstado(turnoId: number, estado: string): Observable<any> {
		const url = `${this.apiUrl}/cambiarEstado/${turnoId}`;
		const body = { estado: estado };
		return this.http.put<any>(url, body, httpOptions);
	}
}
