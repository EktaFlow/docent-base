import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HomePage } from "../../pages/home/home";
import { NavController } from "ionic-angular";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';



@Component({
  selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterComponent {

	private user = {};
	private errors: any = [];
	private submitted: boolean = false;

  constructor( private auth: AuthService, public navCtrl: NavController) {}

	ionViewWillEnter() {
		GoogleAnalytics.trackView("register");
	}

	submitRegistration() {
		var isValid = this.validateInput();

		if ( isValid ) {
				this.errors = [];
				this.auth.registerUser(this.user)
				.subscribe( user => {
					this.submitted = true },

           ( {error} ) => {
        this.errors.push(error.error);
});
		}
	}

	validateInput() {
		var { user } = this;
		this.errors = [];

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

  goToLogin = () => {this.navCtrl.push(HomePage);}

}
