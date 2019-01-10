import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  componentShown: string = 'login';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log(this.componentShown);
    console.log('ionViewDidLoad LoginPage');
  }

  onToggle(componentToShow) {
    this.componentShown = componentToShow;
  }

}
