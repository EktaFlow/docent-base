import { Component } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

	user: any = {};
	private errors: any = [];

  constructor( private auth: AuthService) {}

	submitLogin()  {
		this.auth.login(this.user)
				.subscribe(a => console.log(a));
	}

	validateInput() {
		var { user } = this;

		if (!user.email) this.errors.push("No email provided");
		if (!user.passwd) this.errors.push("No password provided");

		return this.errors == false;
	}

}
