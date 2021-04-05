import { Component, OnInit, Input } from '@angular/core';
import { NavController, NavParams, PopoverController } from '@ionic/angular';
import { QuestionsPage } from '../../pages/questions/questions.page';
import { AssessmentService } from "../../services/assessment.service";
import { Apollo } from "apollo-angular";
import { Router } from "@angular/router";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String!) {
	assessment(_id: $_id) {
		questions{
      subThreadName
      questionText
      questionId
			mrLevel
    }
		targetMRL
	}
}
`

@Component({
  selector: 'subthread-popup',
  templateUrl: './subthread-popup.component.html',
  styleUrls: ['./subthread-popup.component.scss'],
})
export class SubthreadPopupComponent implements OnInit {
  //vars
  public targetMRL: any;
  public questions: any;
  public currentQuestions: any;
  public assessmentId: any;
  public subTitle: any;
  public updateInfo: any;

  constructor(
    private apollo: 			 Apollo,
  	public navCtrl: 			 NavController,
  	public navParams: 		 NavParams,
  	private assessmentService: AssessmentService,
    public router: Router,
		private popOver: PopoverController
  ) {
    this.assessmentId = navParams.data.assessmentId;
   this.subTitle = navParams.data.subTitle;
   this.updateInfo = navParams.data.updateInfo;
  }

  ngOnInit() {
   this.assessmentId ? this.getAssessmentData() : null;
   var styling = `
   width: 300px;
   `
   var test = document.getElementsByClassName("popover-content")

   var	newVar = test[test.length - 1] as HTMLElement;
       newVar.style.cssText = styling;
  }

  getAssessmentData() {
   this.apollo.watchQuery<any>({
     query: assessmentQuery,
     variables: {
       _id: this.assessmentId
     }
   }).valueChanges
     .subscribe( ({data, loading}) => {
       this.targetMRL  = data.assessment.targetMRL;
       this.questions = data.assessment.questions
       .filter(question => question.subThreadName == this.subTitle);

     });
  }

  // change this to use 2 way binding. eg, rather than reloading the quesitons page,
  // stay on the questions page and change the current question variable
 async navToQuestion(questionId) {
   var update = await this.assessmentService.updateQuestion(this.updateInfo);
   this.router.navigate(["/questions", {assessmentId: this.assessmentId, questionId: questionId}]);
	 this.popOver.dismiss();
   // this.navCtrl.push(QuestionsPage, {assessmentId: this.assessmentId, questionId: questionId});
   // update.subscribe(data => this.navCtrl.push(QuestionsPage, {
   // 	assessmentId: 			this.assessmentId,
   // 	questionId: questionId
   // }));

 }

}
