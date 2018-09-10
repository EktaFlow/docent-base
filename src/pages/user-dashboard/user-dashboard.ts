import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";


/**
 * Generated class for the UserDashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-dashboard',
  templateUrl: 'user-dashboard.html',
})
export class UserDashboardPage {

  constructor(public navCtrl: NavController,
                    public navParams: NavParams) {}
                    //private auth: AuthService

  public fakeUser = {};

  fakeUser.name = "Jane Doe";
  fakeUser.email = "janedoe@docent.co";
  fakeUser.organization = "Docent";


  // ngOnInit() {
  //
  // }



//need to access user's


}
