import { Component, EventEmitter, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular";
import { AuthService } from "./auth.service";
import { UserDashboardPage } from "./user-dashboard/user-dashboard";
import { GoogleAnalytics } from './helpers/GoogleAnalytics';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //vars
  user: any = {};
	private errors: any = [];
  @Output() toggleClicked = new EventEmitter<string>();

  constructor(
    private auth: AuthService,
    public navCtrl: NavController
  ) { }

  ionViewWillEnter() {
    GoogleAnalytics.trackView("login");
  }

  submitLogin()  {
    console.log(this.user);
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
