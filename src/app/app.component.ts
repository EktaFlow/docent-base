import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { Keyboard } from '@ionic-native/keyboard';

import { HomePage } from '../pages/home/home';
import { UserDashboardPage } from "../pages/user-dashboard/user-dashboard";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage : any;

	constructor(platform:     Platform,
              statusBar:    StatusBar,
              splashScreen: SplashScreen,
              auth:         AuthService) {
    platform.ready().then(() => {
		if (auth.isLoggedIn()) {
			this.rootPage = UserDashboardPage;
		}
		else {
			this.rootPage = HomePage;
		}
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // keyboard.hideKeyboardAccessoryBar(false);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
