import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	private user = {};
	private errors: any = [];

	constructor(public navCtrl: NavController, 
						  public navParams: NavParams,
	            public auth: AuthService ) {}

	submitRegistration() {
		var isValid = this.validateInput();
		
		if ( isValid ) {
				this.errors = [];
				this.auth.registerUser(this.user)
								 .subscribe( user => null );
		}
	}

	validateInput() {
		var { user } = this;
		
		this.checkPresence(user); 
		this.checkPasswords(user);
		this.checkEmail((<any>user).email);

		return this.errors == false
	}

	checkPresence(input) {
		if (!input.name)    this.errors.push("No name provided");
		if (!input.email)   this.errors.push("No email provided");
		if (!input.passwd)  this.errors.push("No password provided");
		if (!input.passwd2) this.errors.push("No retyped password provided");
	}

	checkPasswords(input) {
		if (input.passwd !== input.passwd2) { 
			this.errors.push("Passwords do not match");
		} 
		else { this.checkPasswordRules(input.passwd) }
	}

	checkPasswordRules(passwd) {
		// what are the password rules?
	}

	checkEmail(email) {
		var regEx = /\S+@\S+\.\S+/;
	  var test = regEx.test(email);

		!test ? this.errors.push("Invalid Email Format") : null 
	}

}
