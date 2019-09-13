import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

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
