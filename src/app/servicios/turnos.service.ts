import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDB } from './get-db.service';

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
}
