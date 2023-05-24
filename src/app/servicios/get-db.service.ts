import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':'application/json'
	})
}

@Injectable({
	providedIn: 'root'
})

export abstract class getDB {
	protected apiUrl: string = "http://localhost:5000/"

	constructor(
		public http:HttpClient
	) { }

	public get(): Observable<any[]> {
		return this.http.get<any[]>(this.apiUrl);
	}

	public getById(id: number): Observable<any> {
		const url = `${this.apiUrl}/${id}`
		return this.http.get<any>(url)
	}

	public delete(ele: any): Observable<any> {
		const url = `${this.apiUrl}/${ele.id}`
		return this.http.delete<any>(url);
	}

	public edit(any: any): Observable<any> {
		const url = `${this.apiUrl}/${any.id}`
		return this.http.put<any>(url, any, httpOptions);
	}

	public add(any: any): Observable<any> {
		return this.http.post<any>(this.apiUrl, any, httpOptions);
	} 
}