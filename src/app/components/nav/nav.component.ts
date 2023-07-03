import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/Usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})
export class NavComponent {
	usuario!: Usuario;
	isLogged: boolean = false;
	isAdmin: boolean = false;
	navigationSubscription;

	constructor(public tokenService: TokenService, private authService: AuthService, private router: Router) {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			if (e instanceof NavigationEnd) {
				this.isLogged = this.tokenService.isLogged();
				this.isAdmin = this.tokenService.isAdmin();
			}
		});

		this.authService.getMainUsuario().subscribe(usuario => {
			this.usuario = usuario;
		});
	}

	ngOnInit() {
		this.isLogged = this.tokenService.isLogged();
	}

}
