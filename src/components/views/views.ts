import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, PopoverController } from 'ionic-angular'

import { HomePage } from '../../pages/home/home';
import { ReviewPage } from '../../pages/review/review';
import { DashboardPage } from '../../pages/dashboard/dashboard';
import { NavigatePage } from '../../pages/navigate/navigate';
import { NotapplicablePage } from '../../pages/notapplicable/notapplicable';
import { ActionitemsPage } from '../../pages/actionitems/actionitems';
import { SummaryPage } from '../../pages/summary/summary';
import { QuestionsPage } from "../../pages/questions/questions";
import { saveAs } from "file-saver/FileSaver";
import { ImportComponent } from "../import/import";
import { RiskReportPage } from "../../pages/risk-report/risk-report";



import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import {AssessmentslistComponent} from "../assessmentslist/assessmentslist";

var assessmentQuery = gql`
query assessment($_id: String)
{
 assessment(_id: $_id)  {
  userId
  userEmail
  scope
  targetMRL
  teamMembers
  levelSwitching
  targetDate
  location
  deskbookVersion
  name
  threads
	questions{
		questionText
	  currentAnswer
		questionId
    threadName
    subThreadName
    mrLevel
		questionId
    helpText
    criteriaText
    answers {
      userId
      updatedAt
      answer
      likelihood
      consequence
      greatestImpact
      riskResponse
      mmpSummary
  		objectiveEvidence
  		assumptionsYes
  		notesYes
  		who
  		when
  		what
  		reason
  		assumptionsNo
  		notesNo
  		documentation
  		assumptionsNA
  		notesNA
      assumptionsSkipped
      notesSkipped
    }
  }
	files {
    id
    caption
    name
    questionId
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
        console.log('we firin up a save')
        console.log(event.target);
				var title = data.assessment.name;
				title ? null : title = "untitled"
				var assessment = JSON.stringify(data);
				saveAs(new Blob([assessment], { type: "text/plain" }), title + ".mra")
        this.close();
			})

		}

		handleImport() {
			this.launchImportPopover();
		}
		handleNa()	{
			this.navCtrl.push(NotapplicablePage, {assessmentId: this.assessmentId});
			this.close();
		}
		handleContinue(){
			this.navCtrl.push(QuestionsPage, { assessmentId: this.assessmentId});
			this.close();
		}

		handleActions(){
			this.navCtrl.push(ActionitemsPage, {assessmentId: this.assessmentId});
			this.close();
		}
		handleReview(){
			this.navCtrl.push(ReviewPage, {assessmentId: this.assessmentId});
			this.close();
		}
		handleNavigate(){
			this.navCtrl.push(NavigatePage, {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true});
			this.close();
		}
		handleDashboard(){
			this.navCtrl.push(DashboardPage, {assessmentId: this.assessmentId});
			this.close();
		}
		handleSummary(){
			this.navCtrl.push(SummaryPage, {assessmentId: this.assessmentId});
		}
		handleNewAssessment() {
			this.navCtrl.push(this.homePage);
			this.close();
		}
    handleRiskReport(){
      this.navCtrl.push(RiskReportPage, {assessmentId: this.assessmentId});
      this.close();
    }




    close() {
    this.viewCtrl.dismiss();
    }

		launchImportPopover() {
			console.log("hi");
			this.popOver.create(ImportComponent)
			            .present();
		}

	showAssessmentsList(myEvent) {
	var popoverClick = this.popOver.create(AssessmentslistComponent, {assessments: this.assessments});
	console.log(this.assessments);
		popoverClick.present({
			ev: myEvent
		});
	}

}
