import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

const TOKEN_KEY = "AuthToken";
const AUTHORITIES_KEY = "AuthAuthorities";


@Injectable({
	providedIn: 'root'
})

export class TokenService {

	roles: Array<string> = []; 
	tokenSubj = new Subject<string>();

	constructor(private router: Router) { }

	public setToken(token: string): void {
		window.sessionStorage.removeItem(TOKEN_KEY);
		window.sessionStorage.setItem(TOKEN_KEY, token);
		this.tokenSubj.next(window.sessionStorage.getItem(TOKEN_KEY)!)
	}

	public getTokenSubj(): Observable<any> {
		return this.tokenSubj.asObservable();
	} 

	public getToken(): string {
		return sessionStorage.getItem(TOKEN_KEY)!;
	} 

	public setAuthorities(authorities: string): void {
		window.sessionStorage.removeItem(AUTHORITIES_KEY);
		window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
	}

	public getAuthorities(): string {
		return sessionStorage.getItem(AUTHORITIES_KEY)!;
	}

	public logOut(): void {
		window.sessionStorage.clear();
		this.router.navigate([''], { skipLocationChange: false }).finally(() => {
			window.location.reload()
		});

	}

	public isLogged(): boolean {
		return sessionStorage.getItem(TOKEN_KEY) != null;
	}

	public isAdmin(): boolean {
		return sessionStorage.getItem(AUTHORITIES_KEY) == "admin";
	}
}
