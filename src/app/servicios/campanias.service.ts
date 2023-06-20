import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';
import { Observable } from 'rxjs';
import { Campania } from '../interfaces/Campania';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
	providedIn: 'root'
})
export class CampaniasService extends getDB {
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "campania";
	}

	public getByTitulo(titulo: string): Observable<any> {
		const url = `${this.apiUrl}/getByTitulo/${titulo}`
		return this.http.get<any>(url)
	}

	public selectCampania(campania: Campania): Observable<any> {
		const url = `${this.apiUrl}/seleccionarCampaña/${campania.id}`
		return this.http.get<any>(url);
	}

	public getCampaniaSeleccionada(): Observable<any> {
		const url = `${this.apiUrl}/getCampaniaSeleccionada`
		return this.http.get<any>(url);
	}
}
