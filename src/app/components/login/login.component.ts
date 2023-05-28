import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	form: FormGroup;
	public email: string = "";
	public password: string = "";
	isLogged = false;
	errMsj!: string;

	get Password(){
		return this.form.get("password");
	}
		
	get Mail(){
		return this.form.get("email");	
	}
	
	constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenService: TokenService, private router: Router){
		this.form = this.formBuilder.group({
			password: new FormControl('', {validators: [Validators.required, Validators.minLength(6),Validators.maxLength(8)], updateOn: "blur"}),
			email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"}),
		})
	}

	onLogin(event: Event){
		event.preventDefault;
		if (this.form.valid){
			this.authService.login(this.form.getRawValue()).subscribe(data => {
				if (data.status) {
					this.isLogged = true;
					this.tokenService.setToken(data.auth_token);
					this.tokenService.setAuthorities(data.authorities ? "admin" : "user")
					this.router.navigate([''], { skipLocationChange: false });
				} else {
					this.isLogged = false;
					console.log(data.message);
				}
			})
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
