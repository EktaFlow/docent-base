import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from "./services/auth.service";
import {isElectron} from "../services/constants";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router
  ) {
    this.isElectron = isElectron;
    this.initializeApp();
    if (!isElectron){
      if (window.location.href.includes('reset')) {
          auth.setReset(window.location.href);
    			this.router.navigate(["/login"]);
        }
    		else if (auth.isLoggedIn()) {
    			this.router.navigate(["/"]);
    		}
    		else {
    			this.router.navigate(["/login"]);
    		}
    } else {
      	this.router.navigate(["/"]);
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
