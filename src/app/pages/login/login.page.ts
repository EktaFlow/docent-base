<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import {LoginComponent} from '../../components/login/login.component'

@Component({
  selector: 'login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  componentShown: string = 'login';

    constructor(auth: AuthService) {
      if (auth.reset) {
        this.componentShown = 'doreset';
      }

    }

    ngOnInit(){}

    onToggle(componentToShow) {
      this.componentShown = componentToShow;
    }
=======
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
>>>>>>> 5ea6ac4e3aac7da6e0b8ba8ff1622f1cf5ec3ed9

}
