import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AdopcionesService extends getDB{
	constructor(
		http: HttpClient
	) { 
		super(http)
		this.apiUrl += "adopcion";
	}

	public getByUsuarioId(id: number): Observable<any> {
		const url = `${this.apiUrl}/getByUsuarioId/${id}`
		return this.http.get<any>(url)
	}
}
