import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { getDB } from './get-db.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class MascotasService extends getDB {
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "mascotas";
	}

	public getByUsuarioId(id: number): Observable<any> {
		const url = `${this.apiUrl}/?usuarioId=${id}`
		return this.http.get<any>(url)
	}
}