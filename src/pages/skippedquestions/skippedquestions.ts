import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from "../../components/topbar/topbar";
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


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
					this.skipped = (<any>data.data).assessment.questions.filter(a => a.currentAnswer == "skipped");

					var subThreadNames: any = this.skipped.map(s => s.subThreadName);
					this.subThreads = subThreadNames.filter(this.unique);
			});
	}

	// AKA - you can't make me use a `PIPE`
	filterBySubThread(subThread) {
		return this.skipped.filter(s => s.subThreadName == subThread);
	}

}
