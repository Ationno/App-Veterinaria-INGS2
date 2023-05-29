import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const TOKEN_KEY = "AuthToken";

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	protected apiUrl: string = "http://localhost:5000"

	constructor(private httpClient: HttpClient) { }

	public login(usuario: any): Observable<any> {
		return this.httpClient.post<any>(this.apiUrl + '/login', usuario,  httpOptions)
	}

	public getMainUsuario(): Observable<any> {
		if (sessionStorage.getItem(TOKEN_KEY)) {
			const url = `${this.apiUrl}/usuario/mainUsuario/${sessionStorage.getItem(TOKEN_KEY)}`
			return this.httpClient.get<any>(url)
		}
		return new Observable<any>();
	}
}
