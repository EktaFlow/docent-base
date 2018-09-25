import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { AssessmentService } from "../../services/assessment.service";
import { TopbarComponent } from "../../components/topbar/topbar";
import { SettingsPage } from "../settings/settings";

import { HomePage } from "../home/home";
import {Subscription} from "rxjs";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import { AuthUrl } from "../../services/constants";

var sharedQuery = gql`
query getShared($assessments: [String]) {
	getShared(assessments: $assessments) {
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
	sharedAssessments: any = [];
  loading: boolean;
  private querySubscription: Subscription;
  homePage: any = HomePage;
  settingsPage: any = SettingsPage;
	private sharedAssessmentIds = [];


  constructor(public navCtrl: NavController,
                    public navParams: NavParams,
										private apollo: Apollo,
										private auth: AuthService,
										private assessmentService: AssessmentService) {}

  async ngOnInit() {

		// make this better
		await this.getSharedAssessments();
		this.pullSharedAssessments();
		console.log("hu");

		var observe =  await this.assessmentService.getAssessments()
		observe.subscribe(({data}) => this.assessments = data.assessments);

  }

	async getSharedAssessments() {
		var user;
		if (this.auth.currentUser()) { 
		 user = this.auth.currentUser();
			await fetch(AuthUrl + "shared", {
			method: "POST",
			body: JSON.stringify({email: user.email}),
			headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
			},
		})
			.then(a => a.json())
			.then(a => this.sharedAssessmentIds = a )
			.catch(e => console.log(e));
		}
	}

	pullSharedAssessments() {
		console.log(this.sharedAssessmentIds);
		this.apollo.watchQuery<any>({
      query: sharedQuery,
      variables: {
        assessments: this.sharedAssessmentIds
      }
    })
    .valueChanges
    .subscribe(({data, loading}) => {
			this.sharedAssessments = data.getShared;
    });

		
	}

	redirectToCreate(){	this.navCtrl.push(this.homePage);	}
  handleSettings(){ this.navCtrl.push(this.settingsPage);}


}
