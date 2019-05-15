import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { TopbarComponent } from '../../components/topbar/topbar';
import { QuestionsPage } from "../questions/questions";
import { ReportInfoCardComponent } from "../../components/report-info-card/report-info-card";

import * as XLSX from 'xlsx';

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
    answers {
      answer
		  notesNo
		  objectiveEvidence
    }
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
	pageName: any = "Review";
        response;
	files;

	constructor( private apollo: Apollo,
							 public navCtrl: NavController,
							 public navParams: NavParams,
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
        }

	ionViewWillEnter() {
            GoogleAnalytics.trackPage("review");
        }


	goToQuestion(questionId) {
		this.navCtrl.push(QuestionsPage, {
			data:				this.assessmentId,
			questionId: questionId
		})
	}

	// unique = (item, index, array) => array.indexOf(item) == index

	openFile(url) {
		console.log("desktop");
		window.open(url, "new_window");
	}
	openFileMobile(url){
		console.log("mobile");
		window.open(url, '_system', 'location=yes');
	}

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
                            var assessment = (<any>data.data).assessment;
                            var questions = assessment.questions;


                            var answeredQuestions = [];
                            questions.forEach(q => {
                              if ( q.answers.length > 0 && q.answers[q.answers.length - 1].answer ) {
                                 var drilledQuestion = {
                                      questionId: q.questionId,
                                   		questionText: q.questionText,
                                      currentAnswer: q.answers[q.answers.length - 1].answer,
                                      objectiveEvidence: q.answers[q.answers.length - 1].objectiveEvidence
                                 }

                                 answeredQuestions.push(drilledQuestion);
                              }
                          });

                  // all questions is an array of answered questions.
                  // preserving the names to leave markup the same.
                  this.allQuestions = answeredQuestions;
					this.targetMRL = assessment.targetMRL;
					this.targetDate = assessment.targetDate;
					this.location = assessment.location;
					this.files = assessment.files;
		});
	}

	saveXLS(){
		var headers = [
			"Question Text",
			"Current Answer",
			"Objective Evidence"
		];

		var values = this.allQuestions.map(q => {

			return [
				q.questionText,
				q.currentAnswer,
				q.objectiveEvidence
			];
		})

		var worksheet = [headers, ...values];

		var ws = XLSX.utils.aoa_to_sheet(worksheet);
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Review Page');

		/* save to file */
		XLSX.writeFile(wb, 'review.xlsx');
	}

}
