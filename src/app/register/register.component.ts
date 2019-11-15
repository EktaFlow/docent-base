import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from "../../app/auth.service";
import { HomePage } from "../../app/home/home.page";
import { NavController } from "@ionic/angular";
import { GoogleAnalytics } from '../helpers/GoogleAnalytics';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //vars
  private user = {};
	private errors: any = [];
	private submitted: boolean = false;
  @Output() toggleClicked = new EventEmitter<string>();

  constructor(
    private auth: AuthService,
    public navCtrl: NavController
  ) { }

  ionViewWillEnter() {
		GoogleAnalytics.trackView("register");
	}

	ngOnInit(){

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

            console.log(this.errors);

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
    var regEx = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{10,72}$/;
    var test = regEx.test(passwd);

    !test ? this.errors.push('invalid_passwd') : null
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
