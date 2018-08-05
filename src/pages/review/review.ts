import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';

import { TopbarComponent } from '../../components/topbar/topbar';

import { QuestionsPage } from "../questions/questions";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	targetMRL
	targetDate
	location
	questions {
		questionId
		mrLevel
		questionText	
		threadName
		subThreadName
		currentAnswer
		notesNo
		skipped
		objectiveEvidence
	}
	files {
		name
		questionId
		url
	}
	}
}
`

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {
  
	assessmentId: any;
	allQuestions: any;
  targetMRL: any;
  targetDate: any;
  location: any;
  team: any;
  survey: any;
  surveyResults: any;
  reviewResults = [];
  response;
	files;

	constructor( private apollo: Apollo, 
							 public navCtrl: NavController, 
							 public navParams: NavParams, 
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
  }


	goToQuestion(questionId) {
		this.navCtrl.push(QuestionsPage, {
			data:				this.assessmentId,
			questionId: questionId
		})
	}

	// unique = (item, index, array) => array.indexOf(item) == index

	openFile(url) {
		window.open(url, "new_window");
	}

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => { 
					var assessment = (<any>data.data).assessment;
					this.allQuestions = assessment.questions;
					this.targetMRL = assessment.targetMRL;
					this.targetDate = assessment.targetDate;
					this.location = assessment.location;
					this.files = assessment.files;
			});
	}

}
