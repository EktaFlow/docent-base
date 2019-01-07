import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { AuthService } from "../../services/auth.service";
import { AssessmentService } from "../../services/assessment.service";
import { TopbarComponent } from "../../components/topbar/topbar";
import { SettingsPage } from "../settings/settings";
import { QuestionsPage } from "../questions/questions";
import { DashboardPage } from "../dashboard/dashboard";
import { ActionitemsPage } from "../actionitems/actionitems";
import { EditAssessmentPage } from '../edit-assessment/edit-assessment';
import { AddTeamMembersPopOverComponent } from "../../components/add-team-members-pop-over/add-team-members-pop-over";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


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
		id
		teamMembers
		userId
		userEmail
	}
}
`

@IonicPage()
@Component({
  selector: 'page-user-dashboard',
  templateUrl: 'user-dashboard.html',
})
export class UserDashboardPage {

  public user: any = {
    name: "",
    email: "",
    id: ""
  };

  assessments: any;
	sharedAssessments: any = [];
  loading: boolean;
  private querySubscription: Subscription;
	private sharedAssessmentIds = [];
	expand: any = false;
  currentAssessment: any = null;
	noSecondBar: boolean = false;
	assessmentId: any;
	pageName: any = "User Dashboard";

	showMine: boolean = false;
	showShared: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
							private apollo: Apollo,
							private auth: AuthService,
              private assessmentService: AssessmentService,
							public popOver: PopoverController) {
							this.assessmentId = navParams.data.assessmentId;
              }


							ionViewWillEnter() {
						    GoogleAnalytics.trackPage("user-dashboard");
						  }

  async ngOnInit() {


		// TODO make this better
		await this.getSharedAssessments();
		this.pullSharedAssessments();

		var user = this.auth.currentUser();
		this.user = user;

		var observe =  await this.assessmentService.getAssessments(user);
		observe.subscribe(({data}) => this.assessments = data.assessments);
		// console.log(this.currentAssessment);
		// console.log(window.screen.width);
		if (window.screen.width > 440) {
			this.showMine = true;
			this.showShared = true;
		}
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
		  // TODO, make this a better fix else where...
			data.getShared.every( a => a ) ? this.sharedAssessments = data.getShared : null
    });

	}

  expandAssessment(assessmentId) {
    // this.expand = !this.expand;
    if (this.currentAssessment == assessmentId) {
      this.currentAssessment = null;
    } else {
      this.currentAssessment = assessmentId;
    }
  }

	// the navigation functions from within an assessment, should each set the new global assessment service Id
	// set Assessment and Navigate

	async continueAssessment(assessmentId) {
		await this.assessmentService.setCurrentAssessmentId(assessmentId);

		this.navCtrl.push(QuestionsPage);
	}

	async openDashboard(assessmentId) {
		await this.assessmentService.setCurrentAssessmentId(assessmentId);

	  this.navCtrl.push(DashboardPage);
	}

	async openActionItems(assessmentId) {
		await this.assessmentService.setCurrentAssessmentId(assessmentId);

     this.navCtrl.push(ActionitemsPage);
	}

	redirectToCreate(){	this.navCtrl.push(HomePage);	}

  handleSettings(){ this.navCtrl.push(SettingsPage);}

  async handleEditAssessmentClick(assessmentId) {
    await this.assessmentService.setCurrentAssessmentId(assessmentId);

    // Go to page to edit assessment.
    this.navCtrl.push(EditAssessmentPage, {page: 'edit'});
  }

	toggleMine = () => {this.showMine = !this.showMine;}
	toggleShared = () => {this.showShared = !this.showShared;}

	async handleDeleting(assessmentId){
		var observe =  await this.assessmentService.deleteAssessment(assessmentId);
		observe.subscribe((data => this.removeAssessmentFromPage(assessmentId)) );
	}

	presentAddTeamMembersPopOver(assessmentId){
		this.popOver.create(AddTeamMembersPopOverComponent, {assessmentId: assessmentId}, {cssClass: 'team-popover'})
		.present();
	}

	removeAssessmentFromPage(assessmentId){
		var newArr = JSON.parse(JSON.stringify(this.assessments));
		var assessmentIndex = newArr.findIndex(a => a.id == assessmentId);
		newArr.splice(assessmentIndex, 1);
		this.assessments = newArr;
	}
}
