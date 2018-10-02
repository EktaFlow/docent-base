import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { UserDashboardPage } from "../../pages/user-dashboard/user-dashboard";

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

	user: any = {};
	private errors: any = [];

	constructor( private auth: AuthService,
	             public navCtrl: NavController) {}

	submitLogin()  {
		this.auth.login(this.user)
		.subscribe( user =>   (<any>user).jwt ? this.navCtrl.push(UserDashboardPage) : this.incorrectCredentials(),
                error => this.incorrectCredentials());
	}

	incorrectCredentials() {
		this.errors.push("That username password combination is incorrect");
	}

	validateInput() {
		var { user } = this;

		if (!user.email) this.errors.push("No email provided");
		if (!user.passwd) this.errors.push("No password provided");

		return this.errors == false;
	}

}
