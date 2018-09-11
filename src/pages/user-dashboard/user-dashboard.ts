import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import {Subscription} from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($userId: String) {
	assessment(userId: $userId) {
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

  constructor(public navCtrl: NavController,
                    public navParams: NavParams,
                    private apollo: Apollo) {}
                    //private auth: AuthService

  async ngOnInit() {
    var userId = this.fakeUser.id;
    console.log(this.fakeUser.id);
    this.querySubscription = this.apollo.watchQuery<any>({
      query: assessmentQuery,
      variables: {
        userId
      }
    })
    .valueChanges
    .subscribe(({data, loading}) => {
      this.loading = loading;
      this.assessments = data.assessments;
    });

  }



//need to access user's


}
