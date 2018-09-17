import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
// import { UserDashboardPage } from "../user-dashboard/user-dashboard";


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goBackToUser(){ this.navCtrl.pop()};



}
