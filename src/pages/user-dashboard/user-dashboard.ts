import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { TopbarComponent } from "../../components/topbar/topbar";
import { SettingsPage } from "../settings/settings";

import { HomePage } from "../home/home";
import {Subscription} from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessments($userId: String) {
	assessments(userId: $userId) {
	   scope
     targetMRL
     targetDate
     levelSwitching
     deskbookVersion
     location
     name
	}
}
`

@IonicPage()
@Component({
  selector: 'page-user-dashboard',
  templateUrl: 'user-dashboard.html',
})
export class UserDashboardPage {



  public fakeUser: any = {
    name: "Jane Doe",
    email: "janedoe@docent.co",
    organization: "Docent",
    id: "test_dash"
  };
  assessments: any;
  loading: boolean;
  private querySubscription: Subscription;
  homePage: any = HomePage;
  settingsPage: any = SettingsPage;

  constructor(public navCtrl: NavController,
                    public navParams: NavParams,
                    private apollo: Apollo) {}
                    //private auth: AuthService

  async ngOnInit() {
    var userId = this.fakeUser.id;
    console.log(userId);
		console.log(this.apollo);
    this.querySubscription = this.apollo.watchQuery<any>({
      query: assessmentQuery,
      variables: {
        userId: "dev"
      }
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      this.assessments = data.assessments;
      console.log(this.assessments);
    });



  }

	redirectToCreate(){	this.navCtrl.push(this.homePage);	}
  handleSettings(){ this.navCtrl.push(this.settingsPage);}



//need to access user's


}
