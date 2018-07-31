import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { ViewsComponent } from '../../components/views/views';

import { Apollo } from "apollo-angular";
import gql from "graphql-tag";

var assessmentQuery = gql`
query assessment($_id: String) {
	assessment(_id: $_id) {
	questions {
		mrLevel
		questionText
		subThreadName
		skipped
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

  constructor(private apollo: Apollo, public navCtrl: NavController, public navParams: NavParams, public popOver: PopoverController) {
		this.assessmentId = navParams.data.assessmentId;
		console.log(this.assessmentId);
  }

	/*
	unique(item, index, array) {
	    return array.indexOf(item) == index;
			}
*/

  // helper function to pull unique values from array.
	unique = (item, index, array) => array.indexOf(item) == index

	ngOnInit() {
		this.apollo.watchQuery({
			query: assessmentQuery,
			variables: {_id: this.assessmentId},
			fetchPolicy: "network-only"
			}).valueChanges
			.subscribe(data => { 
					var skippedQuestions: any = data.data.assessment.questions.filter(a => a.skipped)
					this.skipped = skippedQuestions;

					var subThreadNames = skippedQuestions.map(s => s.subThreadName);
					this.subThreads = subThreadNames.filter(this.unique);
			});
	}

	// AKA - you can't make me use a `PIPE`
	filterBySubThread(subThread) {
		return this.skipped.filter(s => s.subThreadName == subThread);
	}

  presentViewsPop(event){
    let popover = this.popOver.create(ViewsComponent);
    popover.present({
      ev: event
    });
  }

}
