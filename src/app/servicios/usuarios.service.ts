import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService extends getDB {
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "usuario";
	}

	public getByNombre(nombre: string): Observable<any> {
		const url = `${this.apiUrl}/getByNombre/${nombre}`
		return this.http.get<any>(url)
	}
}
