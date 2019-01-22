import { Component, EventEmitter, Output } from '@angular/core';
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
  @Output() toggleClicked = new EventEmitter<string>();

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
          console.log(user);
          this.submitted = true
          },

          // error handling taking the text of the error directly.
           ( {error} ) => {
           console.log(error);
          this.errors.push(error.error);
        });
		}
	}

  checkError(errorType) {
    return this.errors.includes(errorType);  
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
		if (!input.name)    this.errors.push('name');
		if (!input.email)   this.errors.push('email');
		if (!input.passwd)  this.errors.push('passwd');
		if (!input.passwd2) this.errors.push('passwd2');
	}

	checkPasswords(input) {
		if (input.passwd !== input.passwd2 && input.passwd && input.passwd2) {
			this.errors.push("no_match");
		}
		else { this.checkPasswordRules(input.passwd) }
	}

	checkPasswordRules(passwd) {
    if (passwd.length < 10 ) {
      this.errors.push('invalid_pass');
    }
	}

	checkEmail(email) {
		var regEx = /\S+@\S+\.\S+/;
	  var test = regEx.test(email);

		!test ? this.errors.push("Invalid Email Format") : null
	}

  removeErrors() {
    this.errors = [];
  }

  toggle() {
    this.toggleClicked.emit('login');
  }
}
