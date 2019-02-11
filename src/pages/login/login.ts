import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@IonicPage({
  //segment: '/login/reset/:nonsense/:token/:email/:nonsense2'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {

  componentShown: string = 'login';

  constructor(public navCtrl: NavController, public navParams: NavParams, auth: AuthService) {
    if (auth.reset) {
      this.componentShown = 'doreset'; 
    }
    
  }

  onToggle(componentToShow) {
    this.componentShown = componentToShow;
  }

}
