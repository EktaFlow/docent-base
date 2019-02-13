import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';
import { ReportInfoCardComponent } from "../../components/report-info-card/report-info-card";


import * as XLSX from 'xlsx';


import { QuestionsPage } from "../questions/questions";

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	questions {
		mrLevel
		questionText
		subThreadName
		questionId
		currentAnswer
		answers {
			answer
		}
	}
	}
}
`

@IonicPage()
@Component({
  selector: 'page-skippedquestions',
  templateUrl: 'skippedquestions.html',
})
export class SkippedquestionsPage {

	skipped: any;
	assessmentId: any;
	subThreads: any;
	pageName: any = "Skipped Questions";

	constructor( private apollo: Apollo,
							 public navCtrl: NavController,
							 public navParams: NavParams,
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
  }

	ionViewWillEnter() {
    GoogleAnalytics.trackPage("skippedquestions");
  }

  // helper function to pull unique values from array.
	unique = (item, index, array) => array.indexOf(item) == index


	goToQuestion(questionId) {
		this.navCtrl.push(QuestionsPage, {
			data:				this.assessmentId,
			questionId: questionId
		})
	}

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
				var assessment = (<any>data.data).assessment;
				//need to remove nulls out of all answers
				console.log(assessment);
				// for (var i = 0; i < assessment.questions.length; i++){
				// 	// console.log(assessment.questions[i]);
				// 	assessment.questions[i].answers.filter(a => a == null);
				// }
				// console.log(assessment);
					// this.skipped = assessment.questions.filter(a => a.answers.length == 0);
					this.skipped = assessment.questions.filter(a => a.currentAnswer == "skipped");

					var subThreadNames: any = this.skipped.map(s => s.subThreadName);
					this.subThreads = subThreadNames.filter(this.unique);
			});
	}

	// AKA - you can't make me use a `PIPE`
	filterBySubThread(subThread) {
		return this.skipped.filter(s => s.subThreadName == subThread);
	}

	saveXLS(){
		var header = [
			"Subthread Name",
			"MRL",
			"Question Text"
		]

		var values = this.skipped.map(q => {
			console.log(q);
				return [
					q.subThreadName,
					q.mrLevel,
					q.questionText
				]
		})

		var worksheet = [headers, ...values];

		var ws = XLSX.utils.aoa_to_sheet(worksheet);
		var wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Skipped Questions');

		/* save to file */
		XLSX.writeFile(wb, 'skipped_questions.xlsx');
	}

}
