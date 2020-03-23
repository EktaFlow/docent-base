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
	autoFilter = false;
	pageName: any = "Review";
  response;
	files;
	filterList: any = {};
	unfilteredQuestions: any;

	constructor( private apollo: Apollo,
							 public navCtrl: NavController,
							 public navParams: NavParams,
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
		this.autoFilter = navParams.data.autoFilter;
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
                            var questions = assessment.questions;


                            var answeredQuestions = [];
														// console.log(questions);
                            questions.forEach(q => {
                              if ( q.answers.length > 0 && q.answers[q.answers.length - 1].answer ) {
                                 var drilledQuestion = {
                                      questionId: q.questionId,
                                   		questionText: q.questionText,
                                      currentAnswer: q.answers[q.answers.length - 1].answer,
                                      objectiveEvidence: q.answers[q.answers.length - 1].objectiveEvidence,
																			level: q.mrLevel
                                 }
                                 answeredQuestions.push(drilledQuestion);
                              }
                          	});

										if (this.autoFilter){
											this.filterList.filterMRL = assessment.targetMRL;
											this.allQuestions = answeredQuestions.filter(question => {
												if (question.level == assessment.targetMRL){
													return question;
												}
											});
									 } else {
										 this.allQuestions = answeredQuestions;
									 }

                  // all questions is an array of answered questions.
                  // preserving the names to leave markup the same.
									this.unfilteredQuestions = answeredQuestions;
									this.targetMRL = assessment.targetMRL;
									this.targetDate = assessment.targetDate;
									this.location = assessment.location;
									this.files = assessment.files;
		});
	}

	filterTheList(){
		console.log(this.filterList.filterMRL)
		if (this.filterList.filterMRL && this.filterList.filterMRL != 0) {
			var filteredQuestions = this.unfilteredQuestions.filter(question => {
				if (question.level == this.filterList.filterMRL) {
					console.log('here')
					return question
				}
			});
			console.log(filteredQuestions);
			this.allQuestions = filteredQuestions;
		} else {
			this.allQuestions = this.unfilteredQuestions;
		}
	}

	clearFilter() {
			this.filterList.filterMRL = 0;
			this.filterTheList();
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
