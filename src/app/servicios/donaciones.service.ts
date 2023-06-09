import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDB } from './get-db.service';

@Injectable({
	providedIn: 'root'
})
export class DonacionesService extends getDB {
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "donacion";
	}
}
