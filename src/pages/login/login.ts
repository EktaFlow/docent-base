import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	user: any = {};

	constructor( public navCtrl: NavController, 
	             public navParams: NavParams, 
	             private auth: AuthService ) {}

	submitLogin(event)  {
		event.preventDefault();
		this.auth.login(this.user)
				.subscribe(a => console.log(a));
	}

}
