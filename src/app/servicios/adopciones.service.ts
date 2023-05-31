import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

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

	public enviarMail(any: any): Observable<any> {
		return this.http.post<any>(this.apiUrl + "/enviarMail", any, httpOptions);
	}
}
