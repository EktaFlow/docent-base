import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, PopoverController } from 'ionic-angular'

import { HomePage } from '../../pages/home/home';
import { ReviewPage } from '../../pages/review/review';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { NavigatePage } from '../../pages/navigate/navigate';
import { NotapplicablePage } from '../../pages/notapplicable/notapplicable';
import { SkippedquestionsPage } from '../../pages/skippedquestions/skippedquestions';
import { ActionitemsPage } from '../../pages/actionitems/actionitems';
import { QuestionsPage } from "../../pages/questions/questions";
import { saveAs } from "file-saver/FileSaver";


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import {AssessmentslistComponent} from "../assessmentslist/assessmentslist";

var assessmentQuery = gql`
query assessment($_id: String) 
{
 assessment(_id: $_id)  {
	questions{
	  currentAnswer
    skipped
		questionId
    threadName
    subThreadName
    mrLevel
		questionId
		questionText
		objectiveEvidence
		assumptionsYes
		notesYes
		who
		when
		technical
		cost
		schedule
		what
	reason
		assumptionsNo
		notesNo
		documentation
		assumptionsNA
		notesNA
  }
	targetMRL
	currentMRL
	levelSwitching
	name
	files {
		url
	}
}
}
`

@Component({
  selector: 'views',
  templateUrl: 'views.html'
})
export class ViewsComponent {

  homePage = HomePage;
  reviewPage = ReviewPage;
  dashboardPage = DashboardPage;
  navigatePage = NavigatePage;
  actionitemsPage = ActionitemsPage;
	assessments: any;
	assessmentId: any;
  
	constructor(  public navCtrl: NavController, 
								public popOver: PopoverController, 
								public navParams: NavParams, 
								public viewCtrl: ViewController, 
								private apollo: Apollo ) {
		this.assessmentId = navParams.data.assessmentId;
  }


		handleSave() {
	this.apollo.watchQuery<any>({
			query: assessmentQuery,
			fetchPolicy: "network-only",
			variables: {_id: this.assessmentId}
		})
			.valueChanges
			.subscribe( ({data, loading}) => {
				var title = data.assessment.name;
				title ? null : title = "untitled"	
				var assessment = JSON.stringify(data);	
				saveAs(new Blob([assessment], { type: "text/plain" }), title + ".mra")
			})
		}

		handleSkipped() {
			this.navCtrl.push(SkippedquestionsPage, {assessmentId: this.assessmentId})
		}
		handleNa() {
			this.navCtrl.push(NotapplicablePage, {assessmentId: this.assessmentId});
		}
		handleContinue = () => this.navCtrl.push(QuestionsPage, { data: this.assessmentId});
		handleActions = () => this.navCtrl.push(ActionitemsPage, {assessmentId: this.assessmentId});
		handleReview = () => this.navCtrl.push(ReviewPage, {assessmentId: this.assessmentId});
		handleNavigate = () => this.navCtrl.push(NavigatePage, {assessmentId: this.assessmentId});
		handleDashboard = () => this.navCtrl.push(DashboardPage, {assessmentId: this.assessmentId});

    close() {
    this.viewCtrl.dismiss();
    }

	showAssessmentsList(myEvent) {
	var popoverClick = this.popOver.create(AssessmentslistComponent, {assessments: this.assessments});	
	console.log(this.assessments);
		popoverClick.present({
			ev: myEvent
		});
	}

}

