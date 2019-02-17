import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';
import { GoogleAnalytics } from "../application/helpers/GoogleAnalytics";


import { HomePage } from '../pages/home/home';
import { UserDashboardPage } from "../pages/user-dashboard/user-dashboard";
import { LoginPage } from '../pages/login/login';
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
	rootPage : any;

	constructor(platform:     Platform,
              statusBar:    StatusBar,
              splashScreen: SplashScreen,
              auth:         AuthService,
            keyboard: Keyboard) {
    console.log('when do we run???');
    platform.ready().then(() => {
    if (window.location.href.includes('reset')) {
      auth.setReset(window.location.href);
			this.rootPage = LoginPage;
    }
		else if (auth.isLoggedIn()) {
			this.rootPage = UserDashboardPage;
		}
		else {
			this.rootPage = LoginPage;
		}
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      statusBar.styleBlackTranslucent();
      splashScreen.hide();
      keyboard.hideFormAccessoryBar(false);
      GoogleAnalytics.initialize();

    });
  }
}
