import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.css'],
})
export class NavComponent {
	isLogged: boolean = false;
	isAdmin: boolean = false;
	navigationSubscription;  
	constructor(public tokenService: TokenService, private router: Router) {
		this.navigationSubscription = this.router.events.subscribe((e: any) => {
			if (e instanceof NavigationEnd) {
				this.isLogged = this.tokenService.isLogged();
				this.isAdmin = this.tokenService.isAdmin();
			}
		  });
	}

	ngOnInit() {
        this.isLogged = this.tokenService.isLogged();
    }

}
