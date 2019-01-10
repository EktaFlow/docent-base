import { Component, EventEmitter, Output } from '@angular/core';
import { NavController } from "ionic-angular";
import { AuthService } from "../../services/auth.service";
import { UserDashboardPage } from "../../pages/user-dashboard/user-dashboard";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginComponent {

	user: any = {};
	private errors: any = [];
  @Output() toggleClicked = new EventEmitter<string>();

	constructor( private auth: AuthService,
	             public navCtrl: NavController) {}

               ionViewWillEnter() {
                 GoogleAnalytics.trackView("login");
               }

	submitLogin()  {
		this.auth.login(this.user)
		.subscribe( user =>   (<any>user).jwt ? this.navCtrl.push(UserDashboardPage) : this.incorrectCredentials(),
                error => this.incorrectCredentials());
	}

	incorrectCredentials() {
		this.errors = ["That username password combination is incorrect"];
	}

  removeErrors() {
    this.errors = [];
  }

  showRegister() {
    this.toggleClicked.emit('register');
  }

  showPasswordReset() {
    this.toggleClicked.emit('reset');
  }

}
