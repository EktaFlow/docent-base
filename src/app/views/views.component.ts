import { Component, OnInit } from '@angular/core';
import { ViewController, NavController, NavParams, PopoverController } from '@ionic/angular'

import { HomePage } from './home/home';
import { ReviewPage } from './review/review';
import { DashboardPage } from './dashboard/dashboard';
import { NavigatePage } from './navigate/navigate';
import { NotapplicablePage } from './notapplicable/notapplicable';
import { ActionitemsPage } from './actionitems/actionitems';
import { SummaryPage } from './summary/summary';
import { QuestionsPage } from "./questions/questions";
import { saveAs } from "file-saver/FileSaver";
import { ImportComponent } from "./import/import";
import { RiskReportPage } from "./risk-report/risk-report";
import {RouterModule, ActivatedRoute} from "@angular/router";


import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

import {AssessmentslistComponent} from "./assessmentslist/assessmentslist";

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
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {
  //vars
  homePage = HomePage;
  reviewPage = ReviewPage;
  dashboardPage = DashboardPage;
  navigatePage = NavigatePage;
  actionitemsPage = ActionitemsPage;
	assessments: any;
	assessmentId: any;

  constructor(
    public navCtrl: NavController,
  	public popOver: PopoverController,
  	public navParams: NavParams,
  	public viewCtrl: ViewController,
  	private apollo: Apollo
    public router: RouterModule,
    private activatedRoute: ActivatedRoute
  ) {
    // this.assessmentId = navParams.data.assessmentId;
    this.assessmentId = this.activatedRoute.snapshot.paramMap.get('assessmentId');
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
   // handleNa()	{
   //   this.navCtrl.push(NotapplicablePage, {assessmentId: this.assessmentId});
   //   this.close();
   // }
   handleContinue(){
     this.router.navigate(["/questions", {assessmentId: this.assessmentId}]);
     // this.navCtrl.push(QuestionsPage, { assessmentId: this.assessmentId});
     this.close();
   }

   handleActions(){
     this.router.navigate(["/action-items", {assessmentId: this.assessmentId}]);

     // this.navCtrl.push(ActionitemsPage, {assessmentId: this.assessmentId});
     this.close();
   }
   handleReview(){
     this.router.navigate(["/review", {assessmentId: this.assessmentId}]);

     // this.navCtrl.push(ReviewPage, {assessmentId: this.assessmentId});
     this.close();
   }
   handleNavigate(){
     this.router.navigate(["/navigate", {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true}]);

     // this.navCtrl.push(NavigatePage, {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true});
     this.close();
   }
   handleDashboard(){
     this.router.navigate(["/dashboard", {assessmentId: this.assessmentId}]);

     // this.navCtrl.push(DashboardPage, {assessmentId: this.assessmentId});
     this.close();
   }
   handleSummary(){
     this.router.navigate(["/summary", {assessmentId: this.assessmentId}]);

     // this.navCtrl.push(SummaryPage, {assessmentId: this.assessmentId});
   }
   // handleNewAssessment() {
   //   this.navCtrl.push(this.homePage);
   //   this.close();
   // }
   handleRiskReport(){
     this.router.navigate(["/risk-report", {assessmentId: this.assessmentId}]);

     // this.navCtrl.push(RiskReportPage, {assessmentId: this.assessmentId});
     this.close();
   }




   close() {
   this.viewCtrl.dismiss();
   }

   launchImportPopover() {
     console.log("hi");
     this.popOver.create(ImportComponent)
                 .then(popover => popover.present());
   }

 showAssessmentsList(myEvent) {
 this.popOver.create(
   AssessmentslistComponent,
   {assessments: this.assessments}
 ).then(popover => popover.present({ev: myEvent}));

 }

}
