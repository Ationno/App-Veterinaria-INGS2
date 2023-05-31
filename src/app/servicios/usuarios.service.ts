import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UsuariosService extends getDB {
	constructor(
		http: HttpClient
	) {
		super(http)
		this.apiUrl += "usuario";
	}

	public getByNombre(nombre: string): Observable<any> {
		const url = `${this.apiUrl}/getByNombre/${nombre}`
		return this.http.get<any>(url)
	}

	public getByDocumento(DNI: string): Observable<any> {
		const url = `${this.apiUrl}/getByDocumento/${DNI}`
		return this.http.get<any>(url)
	}

	public editReducido(usuario: any): Observable<any> {
		const url = `${this.apiUrl}/putReducido/${usuario.id}`
		return this.http.put<any>(url, usuario)
	}
}
