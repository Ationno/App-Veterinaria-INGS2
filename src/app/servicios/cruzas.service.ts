import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDB } from './get-db.service';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
  providedIn: 'root'
})
export class CruzasService extends getDB {

  constructor(
		http: HttpClient
	) {
		super(http)
		this.apiUrl += "cruza";
	}
}
