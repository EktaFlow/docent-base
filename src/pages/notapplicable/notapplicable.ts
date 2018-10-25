import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { TopbarComponent } from '../../components/topbar/topbar';
import { GoogleAnalytics } from '../../application/helpers/GoogleAnalytics';


import { QuestionsPage } from '../questions/questions';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	questions {
		mrLevel
		questionText
		subThreadName
		currentAnswer
		questionId
	}
	}
}
`

@IonicPage()
@Component({
  selector: 'page-notapplicable',
  templateUrl: 'notapplicable.html',
})
export class NotapplicablePage {

	na: any;
	assessmentId: any;
	subThreads: any;

	constructor( private apollo: Apollo,
							 public navCtrl: NavController,
							 public navParams: NavParams,
							 public popOver: PopoverController) {

		this.assessmentId = navParams.data.assessmentId;
		console.log(this.assessmentId);
  }

	ionViewWillEnter() {
    GoogleAnalytics.trackPage("notapplicable");
  }

  // helper function to pull unique values from array.
	unique = (item, index, array) => array.indexOf(item) == index

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => {
			var naQuestions = (<any>data.data).assessment.questions.filter(a => a.currentAnswer == "N/A")
					this.na= naQuestions;
					console.log(naQuestions);

					var subThreadNames = naQuestions.map(s => s.subThreadName);
					this.subThreads = subThreadNames.filter(this.unique);
			});
	}

	filterBySubThread(subThread) {
		return this.na.filter(s => s.subThreadName == subThread);
	}


	navToQuestion(questionId) {
		console.log(questionId);
		console.log("firrrrrrrrrrrrrrrre");
		this.navCtrl.push(QuestionsPage, {
			data: 			this.assessmentId,
			questionId: questionId
		});
	}

}
