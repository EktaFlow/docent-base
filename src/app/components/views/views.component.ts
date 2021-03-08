import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular'

import { HomePage } from '../../pages/home/home.page';
import { ImportComponent } from "../../components/import/import.component";

import {Router, ActivatedRoute} from "@angular/router";
import { saveAs } from "file-saver/FileSaver";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";


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
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss'],
})
export class ViewsComponent implements OnInit {
  //vars
  homePage = HomePage;
	assessments: any;
	assessmentId: any;

  constructor(
    public navCtrl: NavController,
  	public popOver: PopoverController,
  	public navParams: NavParams,
  	private apollo: Apollo,
    public router: Router,
    private activatedRoute: ActivatedRoute,

  ) {
    // this.assessmentId = navParams.data.assessmentId;
    this.assessmentId = this.activatedRoute.snapshot.paramMap.get('assessmentId');
   }

   ngOnInit(){}

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
   handleContinue(){
     this.router.navigate(["/questions", {assessmentId: this.assessmentId}]);
     this.close();
   }

   handleActions(){
     this.router.navigate(["/action-items", {assessmentId: this.assessmentId}]);

     this.close();
   }
   handleReview(){
     this.router.navigate(["/review", {assessmentId: this.assessmentId}]);

     this.close();
   }
   handleNavigate(){
     this.router.navigate(["/navigate", {assessmentId: this.assessmentId, expandAllFromQs: true, autoFilter: true}]);

     this.close();
   }
   handleDashboard(){
     this.router.navigate(["/dashboard", {assessmentId: this.assessmentId}]);

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

     this.close();
   }




   close() {
   this.popOver.dismiss();
   }

   launchImportPopover() {
     console.log("hi");
     this.popOver.create({component: ImportComponent})
                 .then(popover => popover.present());
   }


}
