import { Component, Input } from '@angular/core';
import { ViewController, IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuestionsPage } from '../../pages/questions/questions';
import { AssessmentService } from "../../services/assessment.service";


import { Apollo } from "apollo-angular";
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
  templateUrl: 'subthread-popup.html'
})
export class SubthreadPopupComponent {

	public targetMRL: any;
	public questions: any;
	public currentQuestions: any;
	public assessmentId: any;
	private subTitle: any;
	private updateInfo: any;
	// @Input() public assessmentId: any;
	// @Input() private subTitle: any;

  constructor(private apollo: 			 Apollo,
							 			public navCtrl: 			 NavController,
							 			public navParams: 		 NavParams,
                    public viewCtrl:       ViewController,
						 				private assessmentService: AssessmentService) {
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
	 			console.log(data);
	 			this.targetMRL  = data.assessment.targetMRL;
				this.questions = data.assessment.questions
				.filter(question => question.subThreadName == this.subTitle);
				console.log(this.questions);
				console.log(this.subTitle);

	 		});
	 }

	 // change this to use 2 way binding. eg, rather than reloading the quesitons page,
	 // stay on the questions page and change the current question variable
  async navToQuestion(questionId) {
    console.log(this.navCtrl.getViews());
    console.log(this.navCtrl.getActive().index);
    var index = this.navCtrl.getActive().index;
    this.navCtrl.remove(0, index);
    this.viewCtrl.dismiss();
		var update = await this.assessmentService.updateQuestion(this.updateInfo);
		this.navCtrl.push(QuestionsPage, {assessmentId: this.assessmentId, questionId: questionId});
		// update.subscribe(data => this.navCtrl.push(QuestionsPage, {
		// 	assessmentId: 			this.assessmentId,
		// 	questionId: questionId
		// }));

	}

}
