import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

	private user = {};

	constructor(public navCtrl: NavController, public navParams: NavParams,
	            public auth: AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

	submitRegistration(event) {
		event.preventDefault();
		console.log(this.user);
		this.auth.registerUser(this.user)
				     .subscribe( user => console.log(user));
	}



}
