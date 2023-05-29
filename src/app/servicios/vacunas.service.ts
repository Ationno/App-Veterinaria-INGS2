import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class VacunasService extends getDB {
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "vacuna";
	}

	public getByMascotaId(id: number): Observable<any> {
		const url = `${this.apiUrl}/getByMascotaId/${id}`
		return this.http.get<any>(url)
	}
}
