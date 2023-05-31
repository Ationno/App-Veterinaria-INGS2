import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AnunciosService extends getDB {
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "anuncio";
	}

	public getByZona(zona: string): Observable<any> {
		const url = `${this.apiUrl}/getByZona/${zona}`
		return this.http.get<any>(url)
	}

	public editReducido(anuncio: any): Observable<any> {
		const url = `${this.apiUrl}/putReducido/${anuncio.id}`
		return this.http.put<any>(url, anuncio)
	}
}
