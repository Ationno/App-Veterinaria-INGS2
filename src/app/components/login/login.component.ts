import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	form: FormGroup;
	public email: string = "";
	public password: string = "";

	get Password(){
		return this.form.get("password");
	}
		
	get Mail(){
		return this.form.get("email");	
	}
	
	constructor(private formBuilder: FormBuilder){
		this.form = this.formBuilder.group({
			password: new FormControl('', {validators: [Validators.required, Validators.minLength(6),Validators.maxLength(8)], updateOn: "blur"}),
			email: new FormControl('', {validators: [Validators.required, Validators.email], updateOn: "blur"}),
		})
	}

	onEnviar(event: Event){
		event.preventDefault;
		if (this.form.valid){
			alert("Todo salio bien ¡Enviar formuario!")
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
