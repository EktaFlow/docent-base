import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { UserDashPage } from "../user-dashboard/user-dashboard";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	user: any = {};
	private errors: any = [];

	constructor( public navCtrl: NavController,
	             public navParams: NavParams,
	             private auth: AuthService ) {}

	submitLogin(event)  {
	//event.preventDefault();
		this.auth.login(this.user)
				.subscribe(a => console.log(a));

    this.navCtrl.push(UserDashPage);
	}

	validateInput() {
		var { user } = this;

		if (!user.email) this.errors.push("No email provided");
		if (!user.passwd) this.errors.push("No password provided");

		return this.errors == false;
	}

}
